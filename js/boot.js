;(function() {
  'use strict';

  require.config({
    baseUrl : './js',
    paths : {
      angular : ['bower_components/angular/angular'],
      core : ['javascript']
    }

  });

  require(['angular'], function(angular) {
    require(['core'], function() {

      window.MemoryGame(window.angular, document.getElementByName("html"));
      
    });
  });

})();
