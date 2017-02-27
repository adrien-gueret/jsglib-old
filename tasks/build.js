const timerLabel = 'Build duration';
initRimer();

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const askForWatch = process.argv.indexOf('watch') >= 0;

const uglyfyPlugin = new webpack.optimize.UglifyJsPlugin({
    beautify: true,
    mangle: false,
    output: { comments: true },
});

webpackConfig.plugins.push(uglyfyPlugin);

const compiler = webpack(webpackConfig);

if (askForWatch) {
    const watcher = compiler.watch({}, getWebpackCallback('JSGLib correctly built. Watching for changes...'));
    watcher.compiler.plugin('compile', initRimer);

} else {
    compiler.run(getWebpackCallback('JSGLib correctly built.'));
}

function initRimer() {
    console.time(timerLabel);
}

function getWebpackCallback(successMessage) {
    return (err) => {
        if(err) {
            return console.log(err);
        }

        console.log(successMessage);
        console.timeEnd(timerLabel);
    };
}