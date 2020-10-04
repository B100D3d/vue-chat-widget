module.exports = {
    filenameHashing: false,
    chainWebpack: config => {
        config.module
            .rule("sass")
            .oneOf("vue")
            .uses.delete("extract-css-loader")

        config.module
            .rule("sass")
            .oneOf("vue")
            .use("style-loader")
            .loader("style-loader")
            .options({ injectType: "styleTag" })
            .before("css-loader")

        config.optimization.delete("splitChunks")
    },
    productionSourceMap: false
}
