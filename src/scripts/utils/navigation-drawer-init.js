const NavigationDrawer = {
  _body: document.querySelector('body'),
  _maxDrawerSize: window.matchMedia('(max-width: 719px)'),

  async init({hamburger, drawer, content}) {
    this._hamburger = hamburger;
    this._drawer = drawer;
    this._content = content;
    this._navigationLinks = this._drawer.querySelectorAll('a');

    this._hamburger.addEventListener('click', this._toggleDrawer.bind(this));
    this._content.addEventListener('click', this._closeDrawer.bind(this));
  },

  async _toggleDrawer(event) {
    event.stopPropagation();
    const body = this._body;
    const drawer = this._drawer;
    const maxDrawerSize = this._maxDrawerSize;

    if (maxDrawerSize.matches) {
      drawer.classList.toggle('open');
      body.classList.toggle('opened');
      this._createDrawerEvent(event);
    }
  },

  _closeDrawer(event) {
    event.stopPropagation();
    const body = this._body;
    const drawer = this._drawer;
    const maxDrawerSize = this._maxDrawerSize;

    if (maxDrawerSize.matches) {
      drawer.classList.remove('open');
      body.classList.remove('opened');
    }
    this._createDrawerEvent(event);
  },

  _createDrawerEvent(event) {
    event.stopPropagation();
    const maxDrawerSize = this._maxDrawerSize;
    const drawer = this._drawer;
    const hamburger = this._hamburger;
    const navigationLinks = this._navigationLinks;

    if (maxDrawerSize.matches) {
      if (drawer.classList.contains('open')) {
        this._accessibilityKey(navigationLinks);
        drawer.setAttribute('aria-hidden', false);
        hamburger.setAttribute('aria-expanded', true);
        hamburger.innerHTML = 'close';
        navigationLinks.forEach((element) => {
          element.addEventListener('click', this._closeDrawer.bind(this));
          element.tabIndex = '0';
        });
      } else {
        drawer.setAttribute('aria-hidden', true);
        hamburger.setAttribute('aria-expanded', false);
        hamburger.innerHTML = 'menu';
        navigationLinks.forEach((element) => {
          element.removeEventListener('click', this._closeDrawer.bind(this));
          element.tabIndex = '-1';
        });
      }
    } else {
      navigationLinks.forEach((element) => element.tabIndex = '0');
    }
  },

  _accessibilityKey(navigationLinks) {
    window.addEventListener('resize', this._closeDrawer.bind(this));
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        this._closeDrawer(event);
      } else if (event.keyCode === 9 && !event.shiftKey) {
        if (navigationLinks[navigationLinks.length - 1].matches(':focus')) {
          this._closeDrawer(event);
        }
      }
    });
  },
};

export default NavigationDrawer;
