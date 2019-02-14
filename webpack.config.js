const path = require('path');

module.exports = {
  entry: {
    "frontend": path.resolve("./src/controllers/frontendController.es6"),
    "background" : path.resolve("./src/controllers/backgroundController.es6"),
    "popup" : path.resolve("./src/classes/popup.es6"),
    "options": path.resolve("./src/classes/options.es6")
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
};