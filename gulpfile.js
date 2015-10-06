var babelRegister = require('babel/register');
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('es', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('bdd', function () {
  return gulp.src('specs/*.spec.js')
    .pipe(mocha({ reporter: 'nyan'}));
});

gulp.task('junit', function () {
  return gulp.src('specs/*.spec.js')
    .pipe(mocha({ reporter: 'mocha-junit-reporter'}));
});

gulp.task('lint', function () {
  return gulp.src(['src/*.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('ci', ['lint', 'junit']);
gulp.task('test', ['lint', 'bdd']);
gulp.task('dev', ['lint', 'es']);
gulp.task('production', ['test', 'es']);
gulp.task('default', ['dev']);
