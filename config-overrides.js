module.exports = function override(config, env) {
  // do stuff with the webpack config...
  const rewireLess = require('react-app-rewire-less');
  const { injectBabelPlugin } = require('react-app-rewired');
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#1DA57A" },
     })(config, env);
  return config;

};