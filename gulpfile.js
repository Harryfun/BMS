var gulp       = require('gulp'),
    less       = require('gulp-less'),
    minifycss  = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    clean      = require('gulp-clean'),
    notify     = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    watch      = require('gulp-watch'),
    changed    = require('gulp-changed'),
    include    = require('gulp-html-tag-include'),
    rename     = require('gulp-rename'),
    jshint     = require('gulp-jshint'),
    replace    = require('gulp-replace'),
    zip        = require('gulp-zip'),
    gulpif     = require('gulp-if'),
    // rev        = require('gulp-rev'),
    // revCollector = require('gulp-rev-collector'),
    inject     = require('gulp-inject-string');


var SRC    = 'src';
var DEST   = 'dist';
var BACKUP = 'backup';

var cssPath = '../css',
    imgPath = '../img',
    jsPath  = '../js';

/*状态*/
var state = true;

/*获取当前时间日期*/
var date    = new Date();
var year    = date.getFullYear();
var month   = date.getMonth() + 1;
var day     = date.getDate();
var hour    = date.getHours();
var minutes = date.getMinutes();
var second  = date.getSeconds();
var time    = '[' + year + '-' + month + '-' + day + '-' + hour + minutes + second +']';

/*错误提示*/
function errorHandler(){
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象
    this.emit();//提交
}


/*html*/
gulp.task('html',function(){
    return gulp.src(SRC +'/html/*.html')
        .pipe(changed(DEST+'/html'))
        .pipe(gulpif(state,inject.before('</body>','<script src="http://localhost:35729/livereload.js"></script>')))
        .pipe(include()).on('error',errorHandler)
        .pipe(replace( '{cssPath}' , cssPath ))
        .pipe(replace( '{imgPath}' , imgPath ))
        .pipe(replace( '{jsPath}'  , jsPath ))
        .pipe(gulp.dest(DEST + '/html'))
        .pipe(livereload());
});

/*less*/
gulp.task('less',function(){
    return gulp.src([SRC+'/less/**/*.less', '!'+SRC+'/less/lib/**/*.less', '!'+SRC+'/less/mdl/**/*.less']) //ignore lib,mdl
        .pipe(changed(DEST+'/css'))
        .pipe(less()).on('error',errorHandler)
        .pipe(minifycss())
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'Android >= 4.0'], //适配到浏览器最新的几个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest(DEST+'/css'))
        .pipe(livereload());
});

//js
 gulp.task('js',function(){
    return gulp.src(SRC+'/js/**')
        .pipe(jshint())
        // .pipe(jshint.reporter())
        // .pipe(jshint.reporter('fail')).on('error', errorHandler)
        .pipe(changed(DEST + '/js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(livereload());
 });

//css
 gulp.task('css',function(){
    return gulp.src(SRC + '/css/**')
        .pipe(changed(DEST + '/css'))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(livereload());
 });



/*img*/
gulp.task('img',function(){
    return gulp.src(SRC + '/img/**')
        .pipe(changed(DEST + '/img'))
        .pipe(gulp.dest(DEST + '/img'))
        .pipe(livereload());
});

/*fonts*/
gulp.task('fonts',function(){
    return gulp.src(SRC + '/fonts/**')
        .pipe(changed(DEST + '/fonts'))
        .pipe(gulp.dest(DEST + '/fonts'))
        .pipe(livereload());
});


//sound
gulp.task('sound',function(){
    return gulp.src(SRC + '/sound/**')
        .pipe(changed(DEST + '/sound'))
        .pipe(gulp.dest(DEST + '/sound'))
        .pipe(livereload());
});

//other
// gulp.task('other',function(){});
/*img*/
gulp.task('other',function(){
    gulp.src(SRC + '/plugin/**')
        .pipe(changed(DEST + '/plugin'))
        .pipe(gulp.dest(DEST + '/plugin'))
        .pipe(livereload());
    gulp.src(SRC + '/flash/**')
        .pipe(changed(DEST + '/flash'))
        .pipe(gulp.dest(DEST + '/flash'))
        .pipe(livereload());
});



/*监听*/
gulp.task('watch',function(){
    livereload.listen();

    //监听html
    gulp.watch([SRC +'/html/*.html',SRC +'/html/mdl/*.html'],['html']);

    //监听less
    gulp.watch([SRC + '/less/**/*.less'],['less']);

    //监听css
    gulp.watch([SRC + '/css/**'],['css']);

    //js
    gulp.watch(SRC + '/js/**/*.js',['js']);

    //监听img
    gulp.watch(SRC + '/img/**',['img']);

    //监听fonts
    gulp.watch(SRC + '/fonts/**',['fonts']);

    //监听audio
    gulp.watch(SRC + '/sound/**',['sound']);

    gulp.watch(SRC + '/flash/**',['flash']);

    gulp.watch(SRC + '/plugin/**',['plugin']);
});

/*清除*/
gulp.task('clean',function(){
    return gulp.src(DEST,{read:false})
        .pipe(clean());
});

/*build*/
gulp.task('build',['clean'],function(){
    state = true;
    gulp.run(['html','less','css','js','img','fonts','other','sound','watch'],function(){
        console.log("\n\tCompile complete！Watching……\n");
    });
});

/*release*/
gulp.task('release',['clean'],function(){
    state = false;
    gulp.run(['html','less','css','js','img','fonts','other','sound'],function(){
        console.log("\n\tCompile complete！Watching……\n");
    });
});


/*项目备份*/
gulp.task('backup',function(){
    gulp.src(SRC+'/**/*')
        .pipe(zip(time + 'backup.zip'))
        .pipe(gulp.dest(BACKUP));
});