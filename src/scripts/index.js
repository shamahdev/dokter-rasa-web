import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.sass';

const hamburger = document.querySelector("#hamburger");
const drawer = document.querySelector("#drawer");
const main = document.querySelector("main");
const body = document.querySelector("body");

const menuOpen = _ => {
    if(drawer.classList.contains("open")){
        hamburger.innerHTML = "✕";
        hamburger.setAttribute("aria-expanded", true);
    }else{
        hamburger.innerHTML = "☰";
        hamburger.setAttribute("aria-expanded", false);
    }
}

hamburger.addEventListener("click", event => {

    drawer.classList.toggle("open");
    body.classList.toggle("opened");
    menuOpen();
    event.stopPropagation();
});


main.addEventListener("click", event => {
    drawer.classList.remove("open");
    body.classList.remove("opened");
    menuOpen();
    event.stopPropagation();
})


console.log('Hello Coders! :)');