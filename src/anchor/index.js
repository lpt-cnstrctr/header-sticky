function initAnchors(){
	var anchorLinks = document.querySelectorAll('.anchor');
	console.log(anchorLinks)
	for(var i = 0; i < anchorLinks.length;i++){
		var anchorLink = anchorLinks[i];
		anchorLink.addEventListener('click',function(event){
		    event.preventDefault();	
			target = document.querySelector('#anchor_'+this.getAttribute('href'));
			var anchorTop = this.getBoundingClientRect().bottom;
			// console.log(target,'#anchor_'+this.getAttribute('href'));
		    if( target ) {
		    	var top = target.getBoundingClientRect().top;
		    	var direction = top / Math.abs(top);
		    	top = direction*(Math.abs(target.getBoundingClientRect().top));
		    	var step = top / 200;
		    	var start = 0;
		        function f(){
		    		console.log(start,top,step,direction)
					if((direction == 1 && start < top) || (direction == -1 && start > top)){
						document.body.scrollTop += step;
						start += step;
						setTimeout(f,0.5);
					}
		        }
		        f();
		    }
		})
	}
}

document.addEventListener('DOMContentLoaded',initAnchors);