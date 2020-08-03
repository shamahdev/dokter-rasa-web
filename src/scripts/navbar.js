const hamburger = document.querySelector("#hamburger");
const drawer = document.querySelector("#drawer");
const main = document.querySelector("main");
const body = document.querySelector("body");
const links = drawer.querySelectorAll("a");
const allFocusable = main.querySelectorAll("a, button");

const navbar = _ => {
    const menuOpen = _ => {
        if (drawer.classList.contains("open")) {
            hamburger.innerHTML = "close";
            hamburger.setAttribute("aria-expanded", true);
            links.forEach(e => {
                e.tabIndex = "0"
            });
        } else {
            hamburger.innerHTML = "menu";
            hamburger.setAttribute("aria-expanded", false);
            links.forEach(e => {
                e.tabIndex = "-1"
            });
        }
    }

    const toggleHamburger = (toggle = true) => {
        if(toggle === true) {
            drawer.classList.toggle("open");
            body.classList.toggle("opened");
        } else {
            drawer.classList.remove("open");
            body.classList.remove("opened");
        }
        menuOpen();
        event.stopPropagation();
    }
    hamburger.addEventListener("click", _ => {
        toggleHamburger();
    });

    main.addEventListener("click", _ => {
        toggleHamburger(false);
    });

    allFocusable.forEach(e => {
        e.addEventListener("focus", _ => {
            toggleHamburger(false);
        });
    });
}

export default navbar;