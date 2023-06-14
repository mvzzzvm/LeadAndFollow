import fs, { appendFile } from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'
import gzip from 'gulp-gzip'

export const copyFonts = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.{otf,ttf,woff,woff2,eot}`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'FONTS',
               message: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}
export const copyOtf = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'FONTS',
               message: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      .pipe(app.plugins.if(app.isGzip, gzip()))
      .pipe(app.plugins.if(app.isGzip, app.gulp.dest(`${app.path.build.fonts}`)))
}
export const copyTtf = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'FONTS',
               message: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      .pipe(app.plugins.if(app.isGzip, gzip()))
      .pipe(app.plugins.if(app.isGzip, app.gulp.dest(`${app.path.build.fonts}`)))
}
export const otf2ttf = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'FONTS',
               message: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(
         fonter({
            formats: ['ttf'],
         })
      )
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
export const ttf2woff = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'FONTS',
               message: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(
         fonter({
            formats: ['woff'],
         })
      )
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      .pipe(app.plugins.if(app.isBuild, ttf2woff2()))
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(`${app.path.build.fonts}`)))
}
export const fontsStyle = () => {
   let fontsFile = `${app.path.srcFolder}/scss/common/fonts.scss`
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         if (!fs.existsSync(fontsFile)) {
            fs.writeFile(fontsFile, '', cb)
            let newFileOnly
            for (let i = 0; i < fontsFiles.length; i++) {
               let fontFileName = fontsFiles[i].split('.')[0]
               if (newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split('-')[0]
                     ? fontFileName.split('-')[0]
                     : fontFileName
                  let fontWeightAndStyle = fontFileName.split('-')[1]
                     ? fontFileName.split('-')[1]
                     : fontFileName
                  fontWeightAndStyle = fontWeightAndStyle.toLowerCase()
                  let fontWeight
                  if (fontWeightAndStyle.includes('thin')) fontWeight = 100
                  else if (fontWeightAndStyle.includes('extralight')) fontWeight = 200
                  else if (fontWeightAndStyle.includes('extralight')) fontWeight = 200
                  else if (fontWeightAndStyle.includes('light')) fontWeight = 300
                  else if (fontWeightAndStyle.includes('medium')) fontWeight = 500
                  else if (fontWeightAndStyle.includes('semibold')) fontWeight = 600
                  else if (fontWeightAndStyle.includes('bold')) fontWeight = 700
                  else if (
                     fontWeightAndStyle.includes('extrabold') ||
                     fontWeightAndStyle.includes('heavy')
                  )
                     fontWeight = 800
                  else if (fontWeightAndStyle.includes('black')) fontWeight = 900
                  else fontWeight = 400
                  let fontStyle = fontWeightAndStyle.includes('italic') ? 'italic' : 'normal'
                  fs.appendFile(
                     fontsFile,
                     `@font-face {
    font-family: ${fontName};
    font-display: swap;
    src: url("../fonts/${fontFileName}.woff2") format("woff2"),
    url("../fonts/${fontFileName}.woff") format("woff"),
    url("../fonts/${fontFileName}.ttf") format("truetype");
    font-weight: ${fontWeight};
    font-style: ${fontStyle};
}
`,
                     cb
                  )
                  newFileOnly = fontFileName
               }
            }
         } else {
            console.log('scss/common/fonts.scss already exists. Delete it to create new')
         }
      }
   })
   return app.gulp.src(`${app.path.srcFolder}`)
   function cb() {}
}
