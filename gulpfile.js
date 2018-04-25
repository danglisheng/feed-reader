/* eslint-env node */
var gulp = require('gulp');
var browserSync=require('browser-sync').create();
var eslint=require('gulp-eslint');

gulp.task('default',['lint'],defaultTask);
function defaultTask(done) {
	gulp.watch('*.html').on('change',browserSync.reload);
	gulp.watch('js/**/*.js',['lint']);

	browserSync.init({
		server:'./'
	});
	browserSync.stream();
	done();
}
gulp.task('lint',()=>{
	return gulp.src('js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
