import browserSync from "browser-sync"
import connectGzipStatic from "connect-gzip-static"
let middleware = connectGzipStatic("./dist")

/**
 * Run Browsersync with server config
 * Add middleware with override:true to ensure all files are
 * picked up.
 */
browserSync.init(
   {
      server: "app",
      open: false,
      files: ["app/*.html", "app/css/*.css"],
   },
   function (err, bs) {
      bs.addMiddleware("*", middleware, {
         override: true,
      })
   }
)
