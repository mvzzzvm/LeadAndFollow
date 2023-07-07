import webpack from "webpack-stream"
// import sourcemaps from 'gulp-sourcemaps'
import del from "del"
import gzip from "gulp-gzip"

export const js = () => {
    del(`${app.path.build.js}/*`)
    return app.gulp
        .src(app.path.src.js, {
            sourcemaps: app.isDev,
        })
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            webpack({
                mode: app.isDev ? "development" : "production",
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: ["style-loader", "css-loader"],
                            // sideEffects: false,
                        },
                    ],
                },
                entry: {
                    app: {
                        import: "./src/js/app.js",
                    },
                    //   photoswipe: {
                    // import: "./src/js/modules/photoswipe.js",
                    //   },
                    // lazyload: "./src/js/lazyload.min.js",
                    swiper: {
                        import: "./src/js/modules/swiper.js",
                    },
                    // chart: {
                    // import: "./src/js/modules/chart.js",
                    // },
                    //  forms: {
                    //      import: "./src/js/modules/forms.js",
                    //  },
                    // popup: [
                    //    "./src/js/modules/popup.js",
                    //    "./src/js/modules/scrollToTop.js" /* "./src/js/modules/spoiler.js" */,
                    // ],
                },
                output: {
                    filename: "[name].min.js",
                    chunkFilename: "[name].min.js",
                },
                optimization: {
                    // runtimeChunk: "single",
                    // providedExports: true,
                    // usedExports: true,
                    splitChunks: {
                        // minChunks: 1,
                        // chunks: "all",
                        // maxAsyncRequests: 20,
                    },
                },
                devtool: app.isDev ? "source-map" : "source-map",
            })
        )
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.if(app.isGzip, gzip()))
        .pipe(app.plugins.if(app.isGzip, app.gulp.dest(app.path.build.js)))
        .pipe(app.plugins.if(app.isBrowsersync, app.plugins.browsersync.stream()))
}
