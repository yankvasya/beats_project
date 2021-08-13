const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

const env = process.env.NODE_ENV;


const { SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');

task('clean', () => {
  console.log(env);
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(clean());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task('styles', () => {
  return src([...STYLES_LIBS, 'src/css/**/*.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
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
  return src([...JS_LIBS, 'src/scripts/*.js'])
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

task('icons', () => {
  return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: "(fill|stroke|width|height|data.*)"
            }
          }
        ]
      })
    )
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`));
})

task('watch', () => {
  watch(`${SRC_PATH}/styles/**/*.scss`, series('styles'));
  watch(`${SRC_PATH}/*.html`, series('copy:html'));
  watch(`${SRC_PATH}/scripts/*.js`, series('scripts'));
  watch(`${SRC_PATH}/images/icons/*.svg`, series('icons'));
})

task('default',
  series('clean',
    parallel('copy:html', 'styles', 'scripts', 'icons'),
    parallel('watch', 'server')
  )
);

task('build',
  series('clean', parallel('copy:html', 'styles', 'scripts', 'icons'))
);