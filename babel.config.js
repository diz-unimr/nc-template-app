// SPDX-FileCopyrightText: Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
// SPDX-License-Identifier: AGPL-3.0-or-later
const babelConfig = require('@nextcloud/babel-config')

babelConfig.presets = [...babelConfig.presets, '@babel/typescript']
babelConfig.plugins = [
    ...babelConfig.plugins,
    '@babel/transform-typescript',
    '@babel/proposal-class-properties',
    '@babel/transform-async-to-generator',
    '@babel/plugin-transform-object-rest-spread',
]

module.exports = babelConfig
