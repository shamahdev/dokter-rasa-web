const body = document.querySelector("body");
const main = document.querySelector("main");
const hamburger = document.querySelector("#hamburger");
const drawer = document.querySelector("#drawer");
const links = drawer.querySelectorAll("a");
const allFocusable = body.querySelectorAll("a.skip-main, main button, main a");
const mq = window.matchMedia("(max-width: 719px)");

const navbar = _ => {
    const menuOpen = _ => {
        if (drawer.classList.contains("open")) {
            document.addEventListener("keydown", e => {
                if (e.keyCode === 27) {
                    toggleHamburger(false);
                }
            });
            drawer.setAttribute("aria-hidden", false);
            hamburger.setAttribute("aria-expanded", true);
            hamburger.innerHTML = "close";
            links.forEach(e => e.tabIndex = "0");
        } else {
            drawer.setAttribute("aria-hidden", true);
            hamburger.setAttribute("aria-expanded", false);
            hamburger.innerHTML = "menu";
            links.forEach(e => e.tabIndex = "-1");
        }
    }

    const toggleHamburger = (toggle = true) => {
        if (mq.matches) {
            if (toggle === true) {
                drawer.classList.toggle("open");
                body.classList.toggle("opened");
            } else {
                drawer.classList.remove("open");
                body.classList.remove("opened");
            }
            menuOpen();
            event.stopPropagation();
        }
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