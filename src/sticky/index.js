'use strict';

console.info('sticky prototype');
var headerClass = 'header_sticky';
var fixedClass = 'nz-fixed';
var shadowClass = 'nz-whiteframe-z2';

document.addEventListener('DOMContentLoaded', function() {
  var stickyContainers = document.getElementsByClassName(headerClass);

  [].forEach.call(stickyContainers, function(container) {
    var containerTopOffset = container.getBoundingClientRect().top + window.scrollY;
    
    document.addEventListener('scroll', function (event) {
      var originalOffset = parseInt(document.body.style.paddingTop || 0);
      var containerHeight = parseInt(container.getBoundingClientRect().height);
      var hasClass = container.classList.contains(fixedClass);

      if(window.scrollY > containerTopOffset && !hasClass) {
        var offset = originalOffset + containerHeight;

        container.classList.add(fixedClass);
        container.classList.add(shadowClass);
        document.body.style.paddingTop = `${offset}px`;
        container.style.top = `${originalOffset}px`;
      }

      if(window.scrollY < containerTopOffset && hasClass) {
        var offset = originalOffset - containerHeight;

        container.classList.remove(fixedClass);
        container.classList.remove(shadowClass);
        document.body.style.paddingTop = `${offset}px`;
      }
    });
  });

});
