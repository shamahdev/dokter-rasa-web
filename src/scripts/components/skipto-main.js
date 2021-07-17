class SkipToMain extends HTMLElement {
  connectedCallback() {
    this._render()
  }

  _render() {
    this.setAttribute('tabindex', '0')
    this.setAttribute('role', 'button')
    this.innerHTML = `<span class="material-icons" aria-hidden="true">skip_next</span> Skip to main content`
    this._createEvent()
  }
  _createEvent() {
    this.addEventListener('click', this._focusToMain)
    this.addEventListener('keydown', this._focusToMain)
  }

  _focusToMain(event) {
    event.stopPropagation()
    this._contentButton = document.querySelector('button[data-bookmark]')
    setTimeout(() => {
      this._contentButton.focus()
    }, 50)
  }
}
customElements.define('skipto-main', SkipToMain)
