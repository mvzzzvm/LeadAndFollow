import * as nodePath from "path"
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = "./dist"
const srcFolder = "./src"

export const path = {
   build: {
      fonts: `${buildFolder}/fonts/`,
      js: `${buildFolder}/js/`,
      images: `${buildFolder}/img/`,
      css: `${buildFolder}/css/`,
      html: `${buildFolder}/`,
      files: `${buildFolder}/files/`,
      video: `${buildFolder}/video/`,
   },
   src: {
      js: `${srcFolder}/js/app.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,gif,png,webp,ico,webmanifest}`,
      svg: `${srcFolder}/img/**/*.svg`,
      svgicons: `${srcFolder}/svgicons/*.svg`,
      scss: `${srcFolder}/scss/*.scss`,
      html: `${srcFolder}/*.html`,
      files: `${srcFolder}/files/**/*.*`,
      video: `${srcFolder}/video/**/*.*`,
   },
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,gif,png,webp,svg,ico,webmanifest}`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
      files: `${srcFolder}/files/**/*.*`,
      video: `${srcFolder}/video/**/*.*`,
   },
   clean: buildFolder,
   srcFolder: srcFolder,
   buildFolder: buildFolder,
   rootFolder: rootFolder,
   ftp: ``,
}
