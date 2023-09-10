/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */


module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
  },
};