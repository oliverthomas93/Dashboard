$(document).ready(function() {
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});

let menu = document.querySelector('#menu');
let nav = document.querySelector('nav');
let hidden = document.querySelector('#hidden-nav');
let link1 = document.querySelector('#link1');
let link2 = document.querySelector('#link2');
let link3 = document.querySelector('#link3');
let link4 = document.querySelector('#link4');

let topNav = () => {
    if (nav.style.background === "black") {
        nav.style.background = "linear-gradient(black, transparent)";
    } else {
        nav.style.background = "black";
}
    if (hidden.style.display === "block") {
        hidden.style.display = "none";
    } else {
        hidden.style.display = "block";
    }
}

menu.addEventListener('click', topNav);
link1.addEventListener('click', topNav);
link2.addEventListener('click', topNav);
link3.addEventListener('click', topNav);
link4.addEventListener('click', topNav);