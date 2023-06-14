// export const video = () => {
//   return (
//     app.gulp
//       .src(app.path.src.video)
//       .pipe(
//         app.plugins.plumber(
//           app.plugins.notify.onError({
//             title: "VIDEO",
//             message: "Error: <%= error.message %>",
//           })
//         )
//       )
//       .pipe(app.plugins.newer(app.path.build.video))
//       .pipe(app.plugins.browsersync.stream())
//   );
// };
// export const video = () => {
//   return app.gulp
//     .src(app.path.src.video)
//     .pipe(app.gulp.dest(app.path.build.video));
// };
export const video = () => {
   return app.gulp
      .src(app.path.src.video)
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'VIDEO',
               message: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(app.gulp.dest(app.path.build.video))
      .pipe(app.plugins.newer(app.path.build.video))
      .pipe(app.plugins.if(app.isBrowsersync, app.plugins.browsersync.stream()))
}
