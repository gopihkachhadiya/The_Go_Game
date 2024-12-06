const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Include JavaScript and TypeScript files
        exclude: /node_modules/, // Exclude all node_modules by default
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // Transpile modern JS to older versions
              '@babel/preset-react', // Handle JSX
              '@babel/preset-typescript', // Handle TypeScript syntax
            ],
          },
        },
      },
      {
        test: /\.(js|jsx)$/, // Specific rule for the problematic module
        include:
          /node_modules\/@codler\/react-native-keyboard-aware-scroll-view/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-transform-flow-strip-types', // Helps remove Flow/TypeScript type annotations
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Handle image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'], // Add .ts and .tsx extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
};
