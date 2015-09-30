var gulp = require('gulp');
var gulpTypeScript = require('gulp-typescript');
var del = require('del');
var gulpFilter = require('gulp-filter');
var browserSync = require('browser-sync').create();

var config = {
    buildOutputLocation: 'out',
    nodeModulesLocation: 'node_modules',
    sourceTree: ['ComponentDashboard/**/*' /**, 'index.html'**/],
    browserSyncConfig: {
        server: {
            baseDir: './'
        }
    },
    // probably move this to tsconfig.json
    typescriptConfig: {
        module: 'system',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        target: 'ES5'
    }
};

var TaskName = {
    Default: 'default',
    Build: 'build',
    Clean: 'clean',
    Serve: 'serve',
    PrivateBuildReload: '~build-reload'
};

var GulpEvent = {
    Change: 'change'
};

gulp.task(TaskName.Default, [TaskName.Serve]);
gulp.task(TaskName.Build, [TaskName.Clean], () => {
    return buildFactory(config, gulp)();
});
gulp.task(TaskName.Clean, () => {
    return cleanFactory(config)();
});
gulp.task(TaskName.Serve, [TaskName.Build], () => {
    return serveFactory(config, gulp);
});
gulp.task(TaskName.PrivateBuildReload, [TaskName.Build], () => {
    browserSync.reload();
});







//////
////// define in other file(s) and require()
//////
function serveFactory(config, gulp) {
    // watching (almost) everything at root is a pretty arbitrary decision. Making it completely configurable is kind of
    // weird also. Maybe a default configuration that is overridable?
    var watchPaths = [
        '**/*',
        `!${config.nodeModulesLocation}/**/*`,
        `!${config.buildOutputLocation}/**/*`
    ];

    browserSync.init(config.browserSyncConfig);
    gulp.watch(watchPaths, [TaskName.PrivateBuildReload])
        .on(GulpEvent.Change, browserSync.reload);
}

function buildFactory(config, gulp) {
    return () => {
        var tsFilter = gulpFilter(['**/*.ts'], {restore: true});

        return gulp.src(config.sourceTree, {base: './'})
            .pipe(tsFilter)
            .pipe(gulpTypeScript(config.typescriptConfig))
            .pipe(tsFilter.restore)
            .pipe(gulp.dest(config.buildOutputLocation));
    };
}

function cleanFactory(config) {
    return () => {
        return del(config.buildOutputLocation);
    };
}
