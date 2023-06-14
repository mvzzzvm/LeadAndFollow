import sassGlob from "gulp-sass-glob"
import { stream as critical } from "critical"
import dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"
const sass = gulpSass(dartSass)
gulp.task("criticalCss", function () {
   return app.gulp
      .src(app.path.src.scss)
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "SCSS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(sassGlob())
      .pipe(
         sass({
            outputStyle: "expanded",
         })
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(rename({ extname: ".critical.css" }))
      .pipe(app.gulp.dest(app.path.build.css))
})
import gfi from "gulp-file-include"
gulp.task("criticalHtml", function () {
   return (
      gulp
         .src(app.path.src.html)
         .pipe(gfi())
         .pipe(
            critical({
               base: "dist/",
               inline: false,
               css: `${app.path.build.css}style.critical.css`,
               width: 1920,
               height: 1000,
               target: {
                  css: "critical.css",
                  html: "index-critical.html",
                  uncritical: "uncritical.css",
               },
            })
         )
         // .on("error", (err) => {
         //    log.error(err.message)
         // })
         .pipe(rename({ extname: ".critical.html" }))
         .pipe(app.gulp.dest(app.path.build.html))
   )
})
gulp.task("critical", gulp.series("criticalCss", "criticalHtml"))
