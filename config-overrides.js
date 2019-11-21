module.exports = config => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /wax-prosemirror-core/,
        options: {
          presets: [
            [require("@babel/preset-env"), { modules: false }],
            require("@babel/preset-react")
          ],
          plugins: [require("@babel/plugin-proposal-class-properties")]
        }
      }
    ]
  }
})