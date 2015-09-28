var gulp = require('gulp');
var gulpTypeScript = require('gulp-typescript');
var del = require('del');
var gulpFilter = require('gulp-filter');
var browserSync = require('browser-sync').create();

var config = {
    buildOutput: 'out',
    sourceTree: ['ComponentDashboard/**/*' /**, 'index.html'**/]
};

var TaskName = {
    Default: 'default',
    Build: 'build',
    Clean: 'clean',
    Serve: 'serve'
};

gulp.task(TaskName.Default, [TaskName.Build]);
gulp.task(TaskName.Build, [TaskName.Clean], () => {
    return buildFactory(config, gulp)();
});
gulp.task(TaskName.Clean, () => {
    return cleanFactory(config)();
});
gulp.task(TaskName.Serve, [TaskName.Build], () => {
    return serveFactory(config, gulp);
});
gulp.task('build-reload', [TaskName.Build], browserSync.reload);

////// define in other file(s) and require()
function serveFactory(config, gulp) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(config.sourceTree, ['build-reload']).on('change', browserSync.reload);
}

function buildFactory(config, gulp) {
    return () => {
        var tsFilter = gulpFilter(['**/*.ts'], {restore: true});

        return gulp.src(config.sourceTree, {base: './'})
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

function cleanFactory(config) {
    return () => {
        return del('out');
    };
}
