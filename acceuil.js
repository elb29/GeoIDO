function imageGalerie()
{
    var active = $('#galerie img.active');
    console.log(active);

    console.log(active.next());
	
    var next = (active.next().length > 0) ? active.next() : $('#galerie img:first');

    
   
	
	   active.fadeOut(function(){
		
	   active.removeClass('active');
       next.fadeIn().addClass('active');  
       console.log(next);
	   
	   });	
}

setInterval('imageGalerie()',2500);