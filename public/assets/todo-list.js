$(document).ready(function(){

  $('form').on('submit', function(){

      var name = $('form input');
      var todo = {name: name.val()};
      // var flying = $('form');
      // var statOne = {flying: flying.val()};


      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo, //statOne,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });


  $('li').on('click', function(){
      var name = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + name,
        success: function(data){
          location.reload();
        }
      });
  });

});