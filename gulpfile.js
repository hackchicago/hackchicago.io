var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      quoteCharacter: "\""
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('img', function() {
    gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
    gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('docs', function() {
    gulp.src('docs/*')
        .pipe(gulp.dest('dist/docs'))
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('default', ['html', 'js', 'css', 'img', 'fonts', 'docs', 'browser-sync']);
gulp.task('build', ['html', 'js', 'css', 'img', 'fonts', 'docs']);
