var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); //permite convertir lo que arroja el bundle a algo para gulp
var watchify = require('watchify');

gulp.task('styles', function(){
   return gulp
  .src('scss/index.scss')  //apunta a archivo para aplicarle la tarea
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('app.css'))
  .pipe(gulp.dest('assets'));
});

gulp.task('assets', function(){  //esta funcion apunta a la carpeta  assets, toma todos sus                                          //elementos y los pasa a la carpeta public(que genera                                                //automáticamente) 
  return gulp
  .src('assets/*')
  .pipe(gulp.dest('public'));
  
});

function compile(watch){
  
  var bundle = watchify(browserify('src/index.js')); // watchify devuelve un objeto que es escuchado
                                                      // este objeto es lo que browserify devuelve y apunta
  function rebundle(){
    bundle
    .transform(babel)           //transforma lo compilado a la versión más reciente de ECMASCRIPT(6)
    .bundle()                   //realiza la compilación 
    .pipe(source('index.js'))   //lo compilado se convierte en algo entendible para gulp
    .pipe(rename('app.js'))     //se re nombra el resultado
    .pipe(gulp.dest('public')); //se destina a public
  }
  
  if(watch){ // compila el bundle y queda escuchando, para que cada que cambie compile
   bundle.on('update', function(){  //el método on() ejecuta la tarea que recibe como parametro
                                    //la tarea "update" al llamarse una vez queda "encendida" escuchandp
     console.log('---> Bundling .....');
     rebundle();
   }) 
  }
  
  rebundle();  // se llama al metodo al menos una vez para compilar una vez
}


gulp.task('build',function(){  //al ejecutar esta tarea en terminal( npm run build ) compila UNA VEZ
  return compile();
});

gulp.task('watch', function(){  //al ejecutar esta tarea en terminal( npm run watch ) compila Y SE QUEDA  
                                //ESCUCHANDO
  return compile(true);
});

gulp.task('default', ['styles','assets', 'build']);


