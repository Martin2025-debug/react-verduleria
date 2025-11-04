// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // Solo los tests; las fuentes se importan con ES modules
      { pattern: 'tests/**/*.spec.js', watched: false },
    ],
    preprocessors: {
      'tests/**/*.spec.js': ['esbuild'],
    },
    esbuild: {
      format: 'esm',
      target: 'es2020',
      sourcemap: 'inline',
      // si en el futuro importas .jsx en tests, descomenta:
      // loaders: { '.jsx': 'jsx', '.js': 'js' },
    },
    browsers: ['ChromeHeadless'],
    singleRun: false,      // true en CI
    reporters: ['progress'],
    logLevel: config.LOG_INFO,
  })
}
