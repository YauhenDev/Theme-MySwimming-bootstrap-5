const gulp 		= require('gulp'),
	  rename 	= require('gulp-rename'),
	  sass 		= require('gulp-sass'),
	  autoprefixer 	= require('gulp-autoprefixer'),
	  sourcemaps 	= require('gulp-sourcemaps'),
	  browserSync 	= require('browser-sync').create();

function style() {
	return gulp.src('./assets/sass/main.sass')
	.pipe( sourcemaps.init() )
	.pipe( sass({
		errorLogToConsole:true,
		outputStyle: 'compressed'
	}) )
	.on('error', console.error.bind(console))
	.pipe( autoprefixer ({
		cascade: false
	}) )
	.pipe( rename({
		suffix:'.min'
	}) )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest('./assets/css/') )
	.pipe( browserSync.stream() );
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "./index.html"
		}
	});
	gulp.watch('./assets/sass/*', style)
	gulp.watch('./*.html').on('change',browserSync.reload);
	gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;