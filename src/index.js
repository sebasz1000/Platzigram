var page = require('page');
var yo = require('yo-yo');
var empty = require('empty-element');

var main = document.getElementById('main-container');

page('/', function(ctx, next){
  
 main.innerHTML = '<a href="/signup">Ir a Sign Up!</a>';
  
});

page('/signup', function(ctx,next){

  var main = document.getElementById('main-container');
  var element = yo`<div class="container">
   
    <div class="row" >

      <div class="col s10 push-s1">
        <div class="row">
          <div class="col m5 hide-on-small-only">
            <img class="iphoneimg" src="iphone.png">
          </div>
          <div class="col s12 m7">
            <div class="row">
              <div class="signup-box">
                <h1 class="platzigram">Platzigram</h1>
                <form class="signup-form" >
                  <h2>Regístrate para ver fotos de tus amigos estudiando en Platzi</h2>
                  <div class="section">
                    <a class="btn btn-fb waves-effect waves-light hide-on-small-only">Ingresa sesión con Facebook</a>
                    <a class="btn btn-fb waves-effect waves-light hide-on-med-and-up">Iniciar sesión</a>
                  </div>
                 
                  <div class="section">
                    <input type="email" placeholder="Correo electronico" name="email" >
                    <input type="text" placeholder="Nombre completo" name="name" >
                    <input type="text" placeholder="Nombre de usuario" name="username" >
                    <input type="password" placeholder="Contraseña" name="password" >
                    <button type="submit"  class="btn  btn-signup waves-effect waves-light" value="Listo">Registrate</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="login-box">
                ¿Tienes una cuenta?<a href="/signin">Entrar</a>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>`;
  empty(main).appendChild(element); 
    
});

page();