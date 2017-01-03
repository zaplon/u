$(document).ready(function(){
  $('body').scrollspy({ target: '#navbar' });

  $('body').keydown(function(e){
    if (e.keyCode == 40){
        e.preventDefault();
        
    }
  }    
});
