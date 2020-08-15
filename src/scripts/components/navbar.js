const Navbar = {
    init({ hamburger, drawer, content }) {   
        hamburger.addEventListener('click', event => {
            this._toggleDrawer(event, drawer, hamburger);
        });
        content.addEventListener('click', event => {
            this._closeDrawer(event, drawer, hamburger);
        });
    },
   
    _toggleDrawer(event, drawer, hamburger) {
        event.stopPropagation();
        const maxDrawerSize = window.matchMedia("(max-width: 719px)");
        const body = document.querySelector("body");

        if (maxDrawerSize.matches) {
                drawer.classList.toggle("open");
                body.classList.toggle("opened");

                this._drawerEvent(event, drawer, hamburger);
        }
    },

    _closeDrawer(event, drawer, hamburger) {
        event.stopPropagation();
        const maxDrawerSize = window.matchMedia("(max-width: 719px)");
        const body = document.querySelector("body");

          if (maxDrawerSize.matches) {
                drawer.classList.remove("open");
                body.classList.remove("opened");

                this._drawerEvent(event, drawer, hamburger);
          }
      },
    _drawerEvent(event, drawer, hamburger) {
        event.stopPropagation();
        const navigations = drawer.querySelectorAll("a");

        if (drawer.classList.contains("open")) {
            document.addEventListener("keydown", event => {
                if (event.keyCode === 27) {
                    this._closeDrawer(event, drawer, hamburger);
                }
                if (event.keyCode === 9 && !event.shiftKey) {
                    if (navigations[navigations.length - 1].matches(':focus')){
                        this._closeDrawer(event, drawer, hamburger);
                    }
                }
            });
            drawer.setAttribute("aria-hidden", false);
            hamburger.setAttribute("aria-expanded", true);
            hamburger.innerHTML = "close";

            navigations.forEach(element => element.tabIndex = "0");
        } else {
            drawer.setAttribute("aria-hidden", true);
            hamburger.setAttribute("aria-expanded", false);
            hamburger.innerHTML = "menu";

            navigations.forEach(element => element.tabIndex = "-1");
        }
    }
  };
   
   
export default Navbar;