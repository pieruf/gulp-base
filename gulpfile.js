var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	//concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename');

/*
*	Handle scripts
*/
gulp.task('scripts', function() {
	gulp.src(['project/js/**/*.js', '!project/js/**/*.min.js'])
	//.pipe(concat('scripts.js'))
	.pipe(plumber())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('project/js'));
});

/*
*	Handle styles
*/
gulp.task('styles', function (){
	return sass('project/scss/style.scss', { style: 'compressed' })
	.pipe(plumber())
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('project/css/'));
});

/*
*	Watch Task
*/
gulp.task('watch', function() {
	gulp.watch('project/js/**/*.js', ['scripts']);
	gulp.watch('project/scss/**/*.scss', ['styles']);
});

/*
*	Default Task
*/
gulp.task('default', ['styles', 'scripts', 'watch']);