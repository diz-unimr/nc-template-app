// SPDX-FileCopyrightText: Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
// SPDX-License-Identifier: AGPL-3.0-or-later
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.devtool = 'source-map'

// // TODO necessary?
webpackConfig.module.rules = [...Object.values(webpackConfig.module.rules), {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
        appendTsSuffixTo: [/\.vue$/],
        // transpileOnly: true,
    },
    exclude: /node_modules/,
}]


console.log(webpackConfig.module.rules)

module.exports = webpackConfig

