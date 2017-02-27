const fs = require('fs');
const glob = require('glob');
const markdox = require('markdox');

const ROOT_DOC_PATH = 'documentation';

glob('./src/**/*.js', {
    ignore: [
        './src/**/tests/*.js',
        './src/platformer/*.js',
        './src/rpg/*.js',
        './src/traits/physics.js',
    ],
}, globCallback);

function globCallback(err, files) {
    if (err) {
        console.log('Error: ', err);
        return;
    }

    generateDocumentation(files);
}

function generateDocumentation(files) {
    files.forEach((file) => {
        const fileFolder = getFileFolder(file);
        const fileDepth = fileFolder.split('/').length - 1;
        let fileName = getFileName(file);

        let isIndex = false;

        if (fileName === 'index') {
            fileName = 'README';
            isIndex = true;
        }

        createDirRecusively(`${ROOT_DOC_PATH}${fileFolder}`);

        markdox.process(file, {
            output: `${ROOT_DOC_PATH}${fileFolder}/${fileName}.md`,
            template: './tasks/templates/doc.md.ejs',
            formatter(docfile) {
                const returnedDocfile = markdox.defaultFormatter(docfile);
                returnedDocfile.classes = [];
                returnedDocfile.publicMethods = [];
                returnedDocfile.privateMethods = [];
                returnedDocfile.fileDepth = fileDepth;
                returnedDocfile.isIndex = isIndex;

                docfile.javadoc.forEach((comment) => {
                    // markdox does not handle some tags, like @example, @static, @public etc.
                    comment.examplesTags = getExampleTags(comment);
                    comment.isStatic = isStatic(comment);
                    comment.access = getAccess(comment);
                    comment.isTypeDef = !comment.isClass && isTypeDef(comment);
                    comment.isEnum = !comment.isTypeDef && isEnum(comment);
                    comment.isNamespace = !comment.isEnum && isNamespace(comment);
                    comment.isTrait = !comment.isNamespace && isTrait(comment);
                    comment.usedTraits = [];

                    // TODO: optimize this
                    if (comment.isClass) {
                        comment.extends = comment.raw.ctx.extends || null;
                        comment.usedTraits = getUsedTraits(comment);
                        returnedDocfile.classes.push(comment);
                    } else if(comment.isTypeDef) {
                        comment.isClass = true;
                        comment.name = getTypeDefName(comment);
                        comment.extends = getTypeDefExtends(comment);
                        returnedDocfile.classes.push(comment);
                    } else if(comment.isEnum) {
                        comment.isClass = true;
                        comment.name = getEnumName(comment);
                        returnedDocfile.classes.push(comment);
                    } else if(comment.isNamespace) {
                        comment.isClass = true;
                        comment.name = getNamespaceName(comment);
                        returnedDocfile.classes.push(comment);
                    } else if(comment.isTrait) {
                        comment.isClass = true;
                        comment.name = getTraitName(comment);
                        returnedDocfile.classes.push(comment);
                    } else if (comment.access === 'private') {
                        returnedDocfile.privateMethods.push(comment);
                    } else {
                        returnedDocfile.publicMethods.push(comment);
                    }
                });

                returnedDocfile.publicMethods.sort(sortMethods);
                returnedDocfile.privateMethods.sort(sortMethods);

                return returnedDocfile;
            },
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}

function getFileName(filePath) {
    return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
}

function getFileFolder(filePath) {
    const start = filePath.indexOf('/', 2);
    const end = filePath.lastIndexOf('/');

    return start < end ? filePath.substring(start, end) : '';
}

function createDirRecusively(path) {
    const segments = path.split('/');
    let pathToWrite = '';

    while(segments.length) {
        pathToWrite += segments.shift() +'/';

        if (!fs.existsSync(pathToWrite)) {
            fs.mkdirSync(pathToWrite);
        }
    }
}

function getExampleTags(comment) {
    return comment.raw.tags.filter(tag => tag.type === 'example').map(tag => tag.string);
}

function getAccess(comment) {
    let access = getAccessFromVisibilityTag(comment);

    if (access) {
        return access;
    }

    return getAccessFromAccessTag(comment) || 'public';
}

function getAccessFromVisibilityTag(comment) {
    const visibilityTag = comment.raw.tags.filter((tag) => tag.visibility);

    if (!visibilityTag.length) {
        return null;
    }

    return visibilityTag[0].visibility;
}

function getAccessFromAccessTag(comment) {
    const visibilityTag = comment.raw.tags.filter(tag => tag.type === 'access');

    if (!visibilityTag.length) {
        return null;
    }

    return visibilityTag[0].string;
}

function isStatic(comment) {
    return comment.raw.tags.some(tag => tag.type === 'static');
}

function sortMethods(methodDefinition1, methodDefinition2) {
    return methodDefinition1.name.localeCompare(methodDefinition2.name);
}

function isTypeDef(comment) {
    return comment.raw.tags.some(tag => tag.type === 'typedef');
}

function getTypeDefName(comment) {
    return comment.raw.tags.filter(tag => tag.type === 'typedef')[0].string.split(' ')[1];
}

function getTypeDefExtends(comment) {
    const extendsType = comment.raw.tags.filter(tag => tag.type === 'typedef')[0].types[0];

    return extendsType && extendsType.toLowerCase() !== 'object' ? extendsType : null;
}

function isEnum(comment) {
    return comment.raw.tags.some(tag => tag.type === 'enum');
}

function getEnumName(comment) {
    return comment.raw.tags.filter(tag => tag.type === 'enum')[0].string;
}

function isNamespace(comment) {
    return comment.raw.tags.some(tag => tag.type === 'namespace');
}

function getNamespaceName(comment) {
    return comment.raw.tags.filter(tag => tag.type === 'namespace')[0].string;
}

function isTrait(comment) {
    return comment.raw.tags.some(tag => tag.type === 'trait');
}

function getTraitName(comment) {
    return comment.raw.tags.filter(tag => tag.type === 'trait')[0].string;
}

function getUsedTraits(comment) {
    return comment.raw.tags.filter(tag => tag.type === 'use').map(tag => tag.string);
}