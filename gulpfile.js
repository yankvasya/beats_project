const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
// const px2rem = require('gulp-smile-px2rem');
// const svgo = require('gulp-svgo');
// const svgSprite = require('gulp-svg-sprite');

const env = process.env.NODE_ENV;


const { SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task('styles', () => {
  return src([...STYLES_LIBS, 'src/css/style.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(
      gulpif(env === 'dev',
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false
        })
      )
    )
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}/`
    },
    open: false
  });
});

task('scripts', () => {
  return src([...JS_LIBS, 'src/*.js'])
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task('copy:icons', () => {
  return src(`${SRC_PATH}/icons/**/*.svg`).pipe(dest(`${DIST_PATH}/icons`));
})

task('copy:video', () => {
  return src(`${SRC_PATH}/video/*`).pipe(dest(`${DIST_PATH}/video`));
})

task('copy:img', () => {
  return src(`${SRC_PATH}/img/**/*`).pipe(dest(`${DIST_PATH}/img`));
})

task('copy:logo', () => {
  return src(`${SRC_PATH}/logo/*`).pipe(dest(`${DIST_PATH}/logo`));
})
task('copy:fonts', () => {
  return src(`${SRC_PATH}/fonts/*`).pipe(dest(`${DIST_PATH}/fonts`));
})

task('watch', () => {
  watch(`${SRC_PATH}/css/**/*.scss`, series('styles'));
  watch(`${SRC_PATH}/*.html`, series('copy:html'));
  watch(`${SRC_PATH}/*.js`, series('scripts'));
  // watch(`${SRC_PATH}/images/icons/*.svg`, series('icons'));
})

task('default',
  series('clean',
    parallel('copy:html', 'styles','copy:fonts', 'scripts', 'copy:icons', 'copy:video', 'copy:img', 'copy:logo'),
    parallel('watch', 'server')
  )
);

task('build',
  series('clean',
    parallel('copy:html', 'styles', 'scripts','copy:fonts', 'copy:icons', 'copy:img', 'copy:video', 'copy:logo')
  )
);