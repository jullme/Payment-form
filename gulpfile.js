const path = require('path');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

//const jshint      = require('gulp-jshint');
const csslint     = require('gulp-csslint');
const connect     = require('gulp-connect');
const livereload  = require('gulp-livereload');

const usemin      = require('gulp-usemin');
const rev         = require('gulp-rev');
const uglify      = require('gulp-uglify');
const minifyCss   = require('gulp-minify-css');
const imagemin    = require('gulp-imagemin');
const watch = require('gulp-watch');

/*---------- Declare paths ----------*/

const paths = {
    src : {
        sass:           './main/stylesheets/sass/**/*.scss',
        css:            './main/stylesheets/css/**/*.css',
        scripts:        './main/javascripts/**/*.js',
        images:         './main/images/*.{png,gif,jpg}',
        fonts:          './main/fonts/*.{eot,svg,ttf,woff,woff2,otf}',
        html:           './main/*.html',
        templates:      './main/**/*.pug'
    },
    dist : {
        css:            './build/assets/stylesheets',
        scripts:        './build/assets/javascripts',
        images:         './build/assets/images',
        fonts:          './build/assets/fonts',
        temp:           './build/assets/temp',
        html:           './build'
    }
};

// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {
    return gulp.src(paths.src.templates)
        .pipe(pug())
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('pug:watch', function() {
    return gulp.src(paths.src.templates)
        .pipe(pug())
        .pipe(gulp.dest(paths.dist.html))
        .pipe(connect.reload());
});

// SASS stylesheets

gulp.task('sass', function () {
    return gulp.src(paths.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.src.sass, ['sass'])
        .pipe(connect.reload());
});

// CSS Lint
gulp.task('csslint', function(){
    return gulp.src(paths.src.css)
        .pipe(csslint())
        .pipe(csslint.reporter());
});
//Copy css plugin
gulp.task('cssplugin', function(){
    return gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.dist.css));
});
gulp.task('cssplugin:watch', function(){
    return gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.dist.css))
        .pipe(connect.reload());
});

// JS Lint
/*gulp.task('jshint', function(){
    return gulp.src(paths.src.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});*/
//Copy js plugin
gulp.task('jsplugin', function(){
    return gulp.src(paths.src.scripts)
        .pipe(gulp.dest(paths.dist.scripts));
});
gulp.task('jsplugin:watch', function(){
    return gulp.src(paths.src.scripts)
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(connect.reload());
});

// Usemin : Concat & Minify Scripts un add revision to avoid cache
gulp.task('usemin', function(){
    return gulp.src(paths.src.html)
        .pipe(usemin({
            css: [minifyCss(), rev()],
            modernizr: [uglify()],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest(paths.dist.html));

});
gulp.task('usemin:watch', function(){
    return gulp.src(paths.src.html)
        .pipe(usemin({
            css: [minifyCss(), rev()],
            modernizr: [uglify()],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest(paths.dist.html))
        .pipe(connect.reload());
});

// Minify Images
gulp.task('imagemin', function(){
    return gulp.src(paths.src.images)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('imagemin:watch', function(){
    return gulp.src(paths.src.images)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.dist.images))
        .pipe(connect.reload());
});

//Copy fonts
gulp.task('fonts', function(){
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts));
});
gulp.task('fonts:watch', function(){
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts))
        .pipe(connect.reload());
});

// Clean Build Folder
gulp.task('clean', function() {
    return gulp.src([paths.dist.html], {read: false})
        .pipe(clean());
});


// Create Server
gulp.task('connect', function() {
    connect.server({
        root: paths.dist.html,
        port: 1337,
        livereload: true
    });
});

// Watch Files For Changes & Livereload
gulp.task('watch', function() {
    var server = livereload();
    gulp.watch(paths.src.sass, ['sass', 'imagemin', 'usemin', 'fonts']);
    gulp.watch(paths.src.templates, ['pug', 'imagemin', 'usemin', 'fonts']);
    gulp.watch(paths.src.css, ['cssplugin', 'imagemin', 'usemin', 'fonts']);
    gulp.watch(paths.src.scripts, ['jsplugin', 'imagemin', 'usemin', 'fonts']);
    gulp.watch([paths.src.images, paths.src.fonts, paths.src.html]).on('change', function(file) {
        if ('undefined' !== typeof file.path) {
            server.changed(file.path);
        }
    });
});

// Development tasks
gulp.task('dev', ['connect', 'watch']);
// Production tasks
gulp.task('prod', ['clean', 'imagemin', 'usemin', 'sass', 'cssplugin', 'jsplugin', 'pug']);

// Default Task
gulp.task('default',['dev']);
// Build Task
gulp.task('build',['prod']);
