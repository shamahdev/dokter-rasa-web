class BackToTop extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.classList.add('back-to-top');
    this.innerHTML = `<button class="btn dark icon material-icons" aria-label="Back to Top">arrow_upward</button>`;
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
    this.addEventListener('click', (event) => {
      event.stopPropagation();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
}
customElements.define('to-top', BackToTop);
