module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    // 'expo',
    '@bluebase/code-standards/babel.config'
  ]
};