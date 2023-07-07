import dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"

import cleanCss from "gulp-clean-css"
import webpcss from "gulp-webpcss"
import autoPrefixer from "gulp-autoprefixer"
import groupCssMediaQueries from "gulp-group-css-media-queries"
import sassGlob from "gulp-sass-glob"
import sourceMaps from "gulp-sourcemaps"
// import purgeCSS from 'gulp-purgecss'
// import uncss from 'gulp-uncss'
import filter from "gulp-filter"
import del from "del"
import gzip from "gulp-gzip"

const sass = gulpSass(dartSass)

export const scss = () => {
    del(`${app.path.build.css}*`)
    return (
        app.gulp
            .src(
                app.path.src.scss /*, {
            sourcemaps: app.isDev,
         }*/
            )
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "SCSS",
                        message: "Error: <%= error.message %>",
                    })
                )
            )
            .pipe(sourceMaps.init())
            .pipe(sassGlob())
            .pipe(
                sass({
                    outputStyle: "expanded",
                })
            )
            .pipe(app.plugins.replace(/@img\//g, "../img/"))
            // this causes timeline to stop working
            // .pipe(
            //    purgeCSS({
            //       content: ["src/**/*.html"],
            //       // rejected: true,
            //    })
            // )
            // .pipe(
            //    uncss({
            //       html: [`${app.path.build.html}index.html`],
            //    })
            // )
            .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
            .pipe(
                app.plugins.if(
                    app.isWebpfy,
                    webpcss({
                        webpClass: ".webp",
                        noWebpClass: "",
                    })
                )
            )
            // .pipe(
            //     app.plugins.if(
            //         app.isBuild,
            //         autoPrefixer({
            //             grid: true,
            //             overrideBrowerslist: ["last 3 versions"],
            //             cascade: true,
            //         })
            //     )
            // )
            .pipe(sourceMaps.write("."))
            .pipe(app.gulp.dest(app.path.build.css))
            // .pipe(app.plugins.if(app.isBrowsersync, app.plugins.browsersync.stream()))
            // .pipe(filter("**/*.css"))
            .pipe(rename({ extname: ".min.css" }))
            .pipe(app.plugins.if(app.isBuild, cleanCss()))
            .pipe(sourceMaps.write("."))
            .pipe(app.gulp.dest(app.path.build.css))
            .pipe(app.plugins.if(app.isBrowsersync, app.plugins.browsersync.stream()))
            .pipe(app.plugins.if(app.isGzip, gzip()))
            .pipe(app.plugins.if(app.isGzip, app.gulp.dest(app.path.build.css)))
    )
}
