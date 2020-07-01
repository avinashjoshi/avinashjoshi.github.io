(function (document) {

  "use strict";

  var toggles = document.querySelectorAll(".c-hamburger");

  var toggleHam = document.querySelector('.c-hamburger');
  var checkbox = document.querySelector('#sidebar-checkbox');
  toggleHam.addEventListener('click', function (e) {
    checkbox.checked = !checkbox.checked;
  }, false);


  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }
  ;

  function toggleHandler(toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }

})(document);
