module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime', // Ensures compatibility with modern JavaScript features
    '@babel/plugin-transform-flow-strip-types', // Strips TypeScript/Flow type annotations
  ],
};
