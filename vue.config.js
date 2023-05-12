const { defineConfig } = require("@vue/cli-service");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = defineConfig({
  transpileDependencies: ["vuetify", "vuex-persist"],
  lintOnSave: false,
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },
});

