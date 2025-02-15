/* eslint-disable sonarjs/no-duplicate-string */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const alias = require('../.config/alias.js')
const {presets} = require('../babel.config.js')

module.exports = {
  stories: ['../src/components/ui', '../src/modules'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-postcss',
  ],
  features: {
    previewCsfV3: true,
  },
  typescript: {
    // we have to add this to fix build errors: https://github.com/hipstersmoothie/react-docgen-typescript-plugin/issues/78#issuecomment-1409224863
    // when we migrate to Storybook 7, we can remove this and remove react-docgen-typescript-plugin from package.json
    reactDocgen: 'react-docgen-typescript-plugin',
  },
  webpackFinal: config => {
    config.resolve = {
      modules: ['node_modules'],
      extensions: [
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.web.js',
        '.js',
        '.web.jsx',
        '.jsx',
      ],
      alias: {
        'react-native$': require.resolve('react-native-web'),
        '@notifee/react-native': require.resolve('./mocks/notifee'),
        'react-native-image-crop-picker': require.resolve(
          './mocks/react-native-image-crop-picker',
        ),
        'react-native-fast-image': require.resolve(
          './mocks/react-native-fast-image',
        ),
        ...alias,
      },
    }
    config.module.rules = [
      {
        test: /(\.js|\.ts|\.tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets,
            sourceMaps: true,
            plugins: [
              'react-native-web',
              '@babel/plugin-proposal-export-namespace-from',
              'react-native-reanimated/plugin',
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              sourceMaps: true,
              plugins: [
                'react-native-web',
                '@babel/plugin-proposal-export-namespace-from',
                'react-native-reanimated/plugin',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        use: [
          {
            loader: 'react-native-web-image-loader',
            options: {
              name: '[name].[hash].[ext]',
              scalings: {'': 1, '@2x': 2, '@3x': 3},
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]

    const definePlugin = new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    })

    if (!config.plugins) {
      config.plugins = []
    }

    config.plugins.push(definePlugin)
    config.plugins.push(new MiniCssExtractPlugin())

    return config
  },
}
