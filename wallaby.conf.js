module.exports = function () {
  return {
    files: [
      '*.js',
      { pattern: '*.conf.js', instrument: true, load: true, ignore: true }
    ],

    tests: [
      'tests/*.js'
    ],

    testFramework: 'jasmine',

    env: {
      type: 'node'
    }
  };
};
