var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create(),
  reload = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var minifyInline = require('gulp-minify-inline');
var minifyInlineJSON = require('gulp-minify-inline-json');
var sitemap = require('gulp-sitemap');
var save = require('gulp-save');

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      quoteCharacter: "\""
    }))
    .pipe(minifyInline())
    .pipe(minifyInlineJSON())
    .pipe(gulp.dest('dist'))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('sitemap', function() {
  return gulp.src(['index.html', 'img/seo.png', 'docs/prospectus.pdf'], { base: './' })
    .pipe(sitemap({
      siteUrl: 'https://hackchicago.io'
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', function() {
  return gulp.src('css/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('js', function() {
  gulp.src('js/**/*.js')
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('img', function() {
  gulp.src('img/**/*')
    //.pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('fonts', function() {
  gulp.src('fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('docs', function() {
  gulp.src('docs/*')
    .pipe(gulp.dest('dist/docs'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('static', function() {
  gulp.src('static/**/*')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('css/**/*.css', ['css']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('*.html', ['html']);
  gulp.watch('img/**/*', ['img']);
  gulp.watch('docs/**/*', ['docs']);
  gulp.watch('fonts/**/*', ['fonts']);
});

gulp.task('default', ['browser-sync', 'html', 'js', 'css', 'img', 'fonts', 'docs', 'static', 'sitemap', 'watch']);
gulp.task('build', ['html', 'js', 'css', 'img', 'fonts', 'static', 'docs', 'sitemap']);
