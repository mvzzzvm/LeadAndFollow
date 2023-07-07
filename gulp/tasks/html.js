import gfi from "gulp-file-include"
import webpfy from "webpfy"
import versionNumber from "gulp-version-number"
import htmlmin from "gulp-htmlmin"
import gzip from "gulp-gzip"
// import { stream as critical } from 'critical'

export const html = () => {
    return (
        app.gulp
            .src(app.path.src.html)
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "HTML",
                        message: "Error: <%= error.message %>",
                    })
                )
            )
            .pipe(gfi())
            // .pipe(app.plugins.if(app.isBuild, htmlmin({ collapseWhitespace: true })))
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(app.plugins.replace(/@img\//g, "img/"))
            .pipe(app.plugins.if(app.isWebpfy, webpfy()))
            .pipe(
                app.plugins.if(
                    app.isBuild,
                    versionNumber({
                        value: "%DT%",
                        append: {
                            key: "v",
                            cover: 0,
                            to: ["css", "js"],
                        },
                        // output: {
                        //    file: "gulp/version.json",
                        // },
                    })
                )
            )
            .pipe(app.gulp.dest(app.path.build.html))
            // .pipe(
            //    critical({
            //       inline: true,
            //       base: "dist/",
            //       src: "dist/index.html",
            //       width: 1920,
            //       height: 1000,
            //       ignore: {
            //          rule: [/\.life__.+/, /\.header__.+/, /\.wb__.+/, /\.locations__.+/],
            //       },
            //       maxImageFileSize: 200,
            //    })
            // )
            .pipe(app.gulp.dest(app.path.build.html))
            .pipe(app.plugins.if(app.isGzip, gzip()))
            .pipe(app.plugins.if(app.isGzip, app.gulp.dest(app.path.build.html)))
            .pipe(app.plugins.if(app.isBrowsersync, app.plugins.browsersync.stream()))
    )
}
