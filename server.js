var express = require('express');
var app = express();  //este es nuestro servidor web

app.set('view engine', 'pug'); // setea el motor de vistas de pug para que node corra desde                                        //index.pug
app.use(express.static('public')); //indica al servidor que utilice todos los recursos que están en                                    // la carpeta "public"


app.get('/', function(req, res){   //aquí renderiza el archivo /views/index.pug  locahost
                                  //en una ruta raíz del servidor
  res.render('index');
});

app.get('/signup', function(req, res){   //aquí define la ruta signup para que index.js pueda                                                 acceder a ella devolviendo el index.pug (html contenedor)
  res.render('index');
});

app.get('/signin', function(req, res){   
                                  
  res.render('index');
});

app.listen(3000, function(err){
  
  if(err) return console.log('Hubo un error'), process.exit(1);
  
  console.log("Platzigram escuchando desde puerto 3000");
  
});

