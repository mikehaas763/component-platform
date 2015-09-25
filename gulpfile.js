var gulp = require('gulp');
var gulpTypeScript = require('gulp-typescript');
var del = require('del');

gulp.task('default', ['clean'], () => {
    return gulp.src(['ComponentDashboard/**/*' + '.ts'], { base: './' })
        .pipe(gulpTypeScript({
            module: 'system'
        }))
        .pipe(gulp.dest('out'));
});

gulp.task('clean', () => {
    return del('out');
});