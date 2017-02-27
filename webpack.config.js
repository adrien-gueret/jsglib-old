const config = {
    entry: ['./src/index.js'],

    output: {
        filename: './dist/jsglib.js',
        library: 'JSGLib',
        libraryTarget: 'umd',
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
                babelrc: false,
                plugins: ['transform-runtime'],
                presets: [['es2015', { modules: false }], 'stage-3'],
            },
        }],
    },

    resolve: {
        extensions: ['.js'],
    },

    // Plugins are appended in ./tasks/build.js
    plugins: [],
};

module.exports = config;