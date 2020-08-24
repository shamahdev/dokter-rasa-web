class BackToTop extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.classList.add('back-to-top');
    this.innerHTML = `<button class="btn dark material-icons" aria-label="Back to Top">arrow_upward</button>`;
    this._createEvent();
  }
  _createEvent() {
    window.onscroll = () => {
      const toTop = this;
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        toTop.classList.add('show-to-top');
      } else {
        toTop.classList.remove('show-to-top');
      }
    };
    this.addEventListener('click', this._backtoTop.bind(this));
    document.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.keyCode === 84) {
        if (!(document.activeElement.hasAttribute('required'))) {
          this._backtoTop(event);
        }
      }
    });
  }

  _backtoTop(event) {
    event.stopPropagation();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this._focusFirstElement = document.querySelector('skipto-main');
    this._focusFirstElement.focus();
  }
}
customElements.define('to-top', BackToTop);
