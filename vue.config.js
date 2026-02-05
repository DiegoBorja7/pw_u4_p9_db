const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api/v1/auth": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
      "^/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});
