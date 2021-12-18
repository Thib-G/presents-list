module.exports = {
  devServer: {
    proxy: {
      '^/myapp/api': {
        target: 'http://127.0.0.1:8000',
        ws: true,
        changeOrigin: true,
      },
      '^/api-auth': {
        target: 'http://127.0.0.1:8000',
        ws: true,
        changeOrigin: true,
      },
      '^/admin': {
        target: 'http://127.0.0.1:8000',
        ws: true,
        changeOrigin: true,
      },
      '^/static': {
        target: 'http://127.0.0.1:8000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
