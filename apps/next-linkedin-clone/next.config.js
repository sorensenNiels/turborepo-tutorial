const withTM = require('next-transpile-modules')(['@nodesoft/ui']);

module.exports = withTM({
  images: {
    domains: ['rb.gy']
  },
  reactStrictMode: true
});
