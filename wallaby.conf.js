module.exports = function () {
  return {
    files: [
      'src/**/*.ts',
      'test/*.ts',
      'layouts/*.json',
      { pattern: '*.conf.js', instrument: true, load: true, ignore: true }
    ],

    tests: [
      'spec/**/*.ts'
    ],

    testFramework: 'jasmine',

    env: {
      type: 'node'
    }
  };
};
