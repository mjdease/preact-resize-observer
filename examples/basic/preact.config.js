import path from 'path';

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  // Only use modules directly in /node_modules, ensures parent devDependencies aren't used
  config.resolve.modules = [path.resolve(__dirname, 'node_modules')];
}
