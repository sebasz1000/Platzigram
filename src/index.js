var page = require('page');

var main = document.getElementById('main-container');

page('/', function(ctx, next){
  
  main.innerHTML = 'home <a href="/signup">SIGNUP</a>';
  
});

page('/signup', function(ctx,next){
  
  main.innerHTML = 'signup <a href="/">HOEE</a>';
  
});

page();