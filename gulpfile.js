import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
};
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { video } from "./gulp/tasks/video.js";
import { otf2ttf, ttf2woff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { server } from "./gulp/tasks/server.js";

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  // gulp.watch(path.watch.html, gulp.series(html, ftp));
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.video, video);
}
export { svgSprite };

const fonts = gulp.series(otf2ttf, ttf2woff, fontsStyle);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images, video)
);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks, ftp);

export { dev, build, fontsStyle, deployZip, deployFtp };
gulp.task("default", dev);
