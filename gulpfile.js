var gulp = require('gulp');
var gulpTypeScript = require('gulp-typescript');
var del = require('del');
var gulpFilter = require('gulp-filter');

var config = {
    buildOutput: 'out',
    sourceTree: ['ComponentDashboard/**/*', 'index.html']
};

gulp.task('default', ['clean'], buildFactory(config));

function buildFactory(config) {
    return () => {
        var tsFilter = gulpFilter(['**/*.ts'], { restore: true });

        return gulp.src(config.sourceTree, { base: './' })
            .pipe(tsFilter)
            .pipe(gulpTypeScript({
                module: 'system',
                emitDecoratorMetadata: true,
                "experimentalDecorators": true,
                target: 'ES5'
            }))
            .pipe(tsFilter.restore)
            .pipe(gulp.dest(config.buildOutput));
    };
}

gulp.task('clean', () => {
    return del('out');
});