
var ViewportManager = (function () {

  // Cosntructor
  function ViMa() {
    this.update();
  };

  ViMa.prototype = {

    // Updates viewport data... scroll width / height
    update: function () {
      this.h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      this.bot = this.top + this.h;
    },

    // Checks if element passed is inside viewport
    isVisible: function (el) {
      this.update(); // Update scroll
      var
        result = false,
        h = el.offsetHeight,                // Height
        t = el.getBoundingClientRect().top, // Top
        b = t + h;                          // Bottom

      if (b > 0 && t < this.h) { // Is inside viewport?
        result = 1.0 - (t + h) / (this.h + h);
      }
      return result;
      // With left and right also... && ( r > 0 && l < this.w)
    }

  }; // Proto

  return ViMa;
})();


function shiftRelativeToParent( el, percent ) {
  var
    parent = el.parentElement;
    d = (parent.offsetHeight - el.offsetHeight);
    offset = d * percent;
  el.style.top = offset + 'px';
}

var viewport;

$(document).ready(function(){
  // La magia aquí

  // We create the listener
  viewport = new ViewportManager();

  // Attach action to several events in pure JS mode
  ['scroll', 'resize', 'orientationchange'].forEach( function(event) {
    window.addEventListener( event , function () {
      var
        is_visible = viewport.isVisible( $('.box')[0] );
      if ( is_visible ) {
        // console.log( is_visible );
        shiftRelativeToParent( $('.box').find('.image-content')[0], is_visible );
      }
    }, false);
  });

});

