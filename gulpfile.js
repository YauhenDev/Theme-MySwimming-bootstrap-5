const 	project_folder 	= "dist",
		source_folder	= "src";

let path = {
	build: {
		html: 	project_folder+"/",
		css: 	project_folder+"/assets/css/",
		cssBootstrap: 	project_folder+"/assets/css/",
		js: 	project_folder+"/assets/js/",
		img: 	project_folder+"/assets/img/",
		fonts: 	project_folder+"/assets/fonts/"
	},
	src: {
		html: 	[
			source_folder+"/*.html",
			"!" + source_folder + "/_*.html",
			"!" + source_folder + "/Components/**/*.html"
		],
		css: 	source_folder+"/assets/sass/app.sass",
		cssBootstrap: 	source_folder+"/assets/sass/bootstrap.sass",
		js: 	source_folder+"/assets/js/**/*.js",
		img: 	source_folder+"/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
		//fonts: 	source_folder+"/assets/fonts/**/*.ttf"	// Для конвертации
		fonts: 	source_folder+"/assets/fonts/**/*.{ttf,woff,woff2,eot}"
	},
	watch: {
		html: 	source_folder+"/**/*.html",
		css: 	source_folder+"/assets/sass/**/*.sass",
		js: 	source_folder+"/assets/js/**/*.js",
		img: 	source_folder+"/assets/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
	
}

let { src, dest } 	= require('gulp'),
	gulp 			= require('gulp'),
	browsersync 	= require('browser-sync').create(),
	fileinclude		= require('gulp-file-include'),
	del				= require('del'),
	autoprefixer 	= require('gulp-autoprefixer'),
	sourcemaps 		= require('gulp-sourcemaps'),
	rename 			= require('gulp-rename'),
	clean_css 		= require('gulp-clean-css'),
	group_media 	= require('gulp-group-css-media-queries'),
	sass			= require('gulp-sass'),
	uglify			= require('gulp-uglify-es').default,
	ttf2woff		= require('gulp-ttf2woff'),				// Для конвертации
	ttf2woff2		= require('gulp-ttf2woff2'),			// Для конвертации
	fonter			= require('gulp-fonter'),				// Для конвертации в EOT
	webp			= require('gulp-webp'),					// конвертирует картинки в webp
	//imagemin		= require('gulp-imagemin'),				// Сжимает картинки
	//webpcss			= require('gulp-webpcss'),			// Добавляет в css
	webphtml		= require('gulp-webp-html');			// Добавляет webp если тэг img

function browserSync(param) {

	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/",
		},
		port:3000,
		//notify: false
	})

}

function html() {
	return src( path.src.html )
	.pipe( fileinclude() )
	// Добавляет автоматом webp в <picture> !!!!! Писать img в одну строчку
	.pipe( webphtml() )
	.pipe( dest( path.build.html) )
	.pipe( browsersync.stream() )
}

function css() {
	return src( path.src.css )
	.pipe( sourcemaps.init() )			// иницилизируем map для css
	.pipe( 
		sass({
			errorLogToConsole:true,
			outputStyle: 'expanded'
		})
	 )									// выгружаем css из sass
	.on(
		'error', 
		console.error.bind(console)
	)	 								// показываем ошибки в SASS
	.pipe (
	 	group_media()
	)									// объеденяет все media в конец файла
	.pipe( 
		autoprefixer ({
			cascade: true
		}) 
	)									// добавляем префиксы для MS webkit и т.п.
	//.pipe( webpcss() )				// добавляем webp в css
	.pipe( dest( path.build.css) )		// выгружаем до сжатия
	.pipe( clean_css() )				// минифицируем css
	.pipe( 								
		rename({
			suffix:'.min'
		})
	 )									// переименуем минифицированный css
	 .pipe( sourcemaps.write('.') )		// создадим map для минифицированного css
	.pipe( dest( path.build.css) )		// выгружаем второй min
	.pipe( browsersync.stream() )		// следим за изменениями
}

function cssBootstrap() {
	return src( path.src.cssBootstrap )
	.pipe( 
		sass({
			errorLogToConsole:true,
			outputStyle: 'expanded'
		})
	 )
	.pipe( dest( path.build.cssBootstrap) )
}



function js() {
	return src( path.src.js )
	.pipe( fileinclude() )
	// 
	.pipe( dest( path.build.js) )
	// сжимаем
	.pipe( uglify() )
	.pipe( 
		rename({
			suffix:'.min'
		})
	 )
	 .pipe( dest( path.build.js) )
	.pipe( browsersync.stream() )
}

function images() {
	return src( path.src.img )
	.pipe(
		webp({
			quality: 70
		})
	)
	.pipe( dest( path.build.img ) )
	.pipe(src( path.src.img ) )
	// сжимаем качество
	// .pipe(
	// 	imagemin({
	// 		progressive: true,
	// 		svgoPlugins: [{ removeViewBox: false }],
	// 		interlaced: true,
	// 		optimizationLevel: 3 // 0 to 7
	// 	})
	//  )
	.pipe( dest( path.build.img ) )
	.pipe( browsersync.stream() )
}

function fonts() {
	return src( path.src.fonts )
		.pipe( dest( path.build.fonts) )
	// Для конвертации
	// src( path.src.fonts )
	// 	.pipe( ttf2woff2() )				// преобразуем в woff2
	// 	.pipe( dest( path.build.fonts) );	// копируем woff2
	// return src( path.src.fonts )
	// 	.pipe( dest( path.build.fonts) )	// копируем ttf
	// 	.pipe( ttf2woff() )					// преобразуем в woff
	// 	.pipe( dest( path.build.fonts) )	// копируем woff
}

// приобразование OTF в TTF !!!! Запускать в ручную
gulp.task( 'otf2ttf', function () {
	return src([source_folder + '/fonts/*.otf']) // 
		.pipe(fonter({
			format: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'));	// сохраняем в папку с исходниками
})

function watchFiles( params ) {
	gulp.watch( [ path.watch.html ], html );
	gulp.watch( [ path.watch.css ], css );
	gulp.watch( [ path.watch.img ], images );
	gulp.watch( [ path.watch.js ], js );
}

function clean( params ) {
	return del( path.clean );
}

let build = gulp.series( clean, gulp.parallel ( fonts, js, css, cssBootstrap, html, images ) );
let watch = gulp.parallel( build, watchFiles, browserSync );

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.cssBootstrap = cssBootstrap;
exports.html = html;
exports.build = build;
exports.watch = watch;
gulp.task('default', gulp.series( watch ));