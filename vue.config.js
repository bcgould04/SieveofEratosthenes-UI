module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 4020,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
