const { merge } = require('webpack-merge');
const config = require('./_webpack/_config');

const ENV_CONFIGS = [
    'development',
    'production'
];

const getEnvironmentConfig = mode => ({mode: ENV_CONFIGS[mode] ?? ENV_CONFIGS[0]});

module.exports = ({ NODE_ENV }, { mode }) =>
merge({}, config, getEnvironmentConfig(mode ?? NODE_ENV));