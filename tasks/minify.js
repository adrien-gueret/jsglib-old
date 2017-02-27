const timerLabel = 'Minification duration';
console.time(timerLabel);

const fs = require('fs');
const uglify = require('uglify-js');

const result = uglify.minify('./dist/jsglib.js', {
    compress: { warnings: false },
    output: { comments: false },
});

fs.writeFile('./dist/jsglib.min.js', result.code, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('JSGLib correctly minified.');
    console.timeEnd(timerLabel);
});