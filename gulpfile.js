var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); //permite convertir lo que arroja el bundle a algo para gulp
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var prefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imgsrc = ['assets/*.jpg', 'assets/*.png'];

gulp.task('jscheck', () => {  //check js files for sintaxis errors
    return gulp
    .src('src/index.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));    
});

gulp.task('imgmin', () => { //mignify all images from assets
    return gulp
    .src(imgsrc)
    .pipe(changed('public'))
    .pipe(imagemin())
    .pipe(gulp.dest('public'));
    
});

gulp.task('assets', () => {  //esta funcion apunta a la carpeta  assets, toma todos sus                                          //elementos y los pasa a la carpeta public(que genera                                             //automáticamente) 
  return gulp
  .src('assets/*')
  .pipe(changed('public', { extension: '.*' }))
  .pipe(gulp.dest('public'));
     
});

gulp.task('styles', () => {
   return gulp
  .src('scss/index.scss')  //apunta a archivo para aplicarle la tarea
  .pipe(sass().on('error', sass.logError))
  .pipe(prefixer())
  .pipe(rename('app.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('assets'));
});


function compile(){
   
    browserify('src/index.js')
    .transform(babel)           //transforma lo compilado a la versión más reciente de ECMASCRIPT(6)
    .bundle()                   //realiza la compilación 
    .pipe(source('index.js'))   //lo compilado se convierte en algo entendible para gulp
    .pipe(rename('app.js'))     //se re nombra el resultado
    .pipe(gulp.dest('public')); //se destina a public
    console.log('BUILD GRACEFULLY!');
        
} 


gulp.task('build', () => {  //compila una vez
  return compile();
});

gulp.task('watch', () => {  
    
  console.log('watching files .........');   
    
  gulp.watch('scss/index.scss', ['styles']).on('change', () => {  //does scss files changed?
     gulp.start(['assets'])
      console.log('---- scss files changed ----');     
  });
    
  gulp.watch('src/index.js', ['build']).on('change', () => { //does js files changed?
      console.log('---- js files changed ----');
  });

});

gulp.task('default', ['styles','assets', 'build']);


