module.exports = function () {
  return {
    files: [
      '*.js',
      'test/*.js',
      { pattern: '*.conf.js', instrument: true, load: true, ignore: true }
    ],

    tests: [
      'spec/*.js'
    ],

    testFramework: 'jasmine',

    env: {
      type: 'node'
    }
  };
};
