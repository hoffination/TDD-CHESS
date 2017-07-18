module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'spec/**/*.spec.ts'
        ],
        preprocessors: {
            'spec/**/*.spec.ts': ['webpack', 'sourcemap'],
        },
        webpack: require('./webpack.config.js'),
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-sourcemap-loader'
        ],
        mime : {
            "text/x-typescript":["ts","tsx"]
        },
    })
}