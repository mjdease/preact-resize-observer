import path from 'path';

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function(config, env) {
  // `npm run build-demo` outputs to a github hosted directory
  if (env.production) {
    config.output.publicPath = '/preact-resize-observer/demo/';
  }
  // Only use modules directly in /node_modules, ensures parent devDependencies aren't used
  config.resolve.modules = [path.resolve(__dirname, 'node_modules')];
}
