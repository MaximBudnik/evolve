const stylus = {
  fileRegexp: /\.(styl|css)$/,
  loaderName: 'stylus-loader'
}

const less = {
  fileRegexp: /\.(less|css)$/,
  loaderName: 'less-loader'
}

// Set preprocessor here
const selectedPreprocessor = less;

module.exports = {
  selectedPreprocessor
}