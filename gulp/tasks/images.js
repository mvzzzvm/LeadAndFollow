import webp from "gulp-webp"
import imagemin from "gulp-imagemin"

export const images = () => {
   return app.gulp
      .src(app.path.src.images)
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "IMAGES",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(app.plugins.newer(app.path.build.images))
      .pipe(app.plugins.if(app.isWebpfy, webp()))
      .pipe(app.plugins.if(app.isWebpfy, app.gulp.dest(app.path.build.images)))
      .pipe(app.gulp.src(app.path.src.images))
      .pipe(app.plugins.newer(app.path.build.images))
      .pipe(
         app.plugins.if(
            app.isImagemin,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewbox: false }],
               interlaced: true,
               optimizationLevel: 7,
            })
         )
      )
      .pipe(app.plugins.if(app.isImagemin, app.gulp.dest(app.path.build.images)))
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.plugins.if(app.isBrowsersync, app.plugins.browsersync.stream()))
}
