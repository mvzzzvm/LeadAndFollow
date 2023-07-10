import gulp from "gulp"
import { path } from "./gulp/config/path.js"
import { plugins } from "./gulp/config/plugins.js"

global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins,
   isBuild: process.argv.includes("--build"),
   isDev: !process.argv.includes("--build"),
   isBrowsersync: process.argv.includes("--browsersync"),
   isWebpfy: process.argv.includes("--webpfy"),
   isImagemin: process.argv.includes("--imagemin"),
   isGzip: process.argv.includes("--gzip"),
   isBuildFonts: process.argv.includes("--buildFonts"),
}
import { copy } from "./gulp/tasks/copy.js"
import { resetEverything, resetPathChildren } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { scss } from "./gulp/tasks/scss.js"
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import { video } from "./gulp/tasks/video.js"
import { copyOtf, otf2ttf, ttf2woff, fontsStyle, copyTtf, copyFonts } from "./gulp/tasks/fonts.js"
import { svgSprite } from "./gulp/tasks/svgSprite.js"
import { zip } from "./gulp/tasks/zip.js"
import { ftp } from "./gulp/tasks/ftp.js"
import { server } from "./gulp/tasks/server.js"

function watcher() {
   gulp.watch(path.watch.files, copy)
   gulp.watch(path.watch.html, html)
   // gulp.watch(path.watch.html, gulp.series(html, ftp));
   gulp.watch(path.watch.scss, scss)
   gulp.watch(path.watch.js, js)
   gulp.watch(path.watch.images, images)
   gulp.watch(path.watch.video, video)
}
export { svgSprite }

// some plugins may require to have css ready before processing html
// this applies to the plugins that exract essential css to html
const processHtmlAfterScss = false

const devFonts = copyFonts
const buildFonts = gulp.series(copyOtf, otf2ttf, copyTtf, ttf2woff, fontsStyle)
const fonts = app.isBuildFonts ? buildFonts : devFonts
const scssAndHtmlInParallel = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, video))
const scssAfterHtml = gulp.series(fonts, scss, html, gulp.parallel(copy, js, images, video))
const mainTasks = processHtmlAfterScss ? scssAfterHtml : scssAndHtmlInParallel
const dev = gulp.series(resetEverything, mainTasks, gulp.parallel(watcher, server))
const compile = gulp.series(resetEverything, scssAndHtmlInParallel)
const update = gulp.series(scssAndHtmlInParallel)
const build = gulp.series(resetEverything, scssAndHtmlInParallel)
const deployZip = gulp.series(resetEverything, scssAndHtmlInParallel, zip)
const deployFtp = gulp.series(resetEverything, scssAndHtmlInParallel, ftp)

gulp.task("reset", resetEverything)

export { dev, build, copyOtf, otf2ttf, fontsStyle, deployZip, deployFtp, fonts }
gulp.task("default", dev)
gulp.task("compile", compile)
gulp.task("update", update)
gulp.task("images", images)
gulp.task("buildFonts", buildFonts)

gulp.task("scss", async function () {
   // console.log(`${app.path.build.css}*`)
   scss()
})

import { testWebpfy } from "./gulp/tasks/testWebpfy.js"
gulp.task("test", gulp.series(testWebpfy))
gulp.task("js", js)
