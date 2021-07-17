class ToastMessage extends HTMLElement {
  set message(message) {
    this._id = message.id
    this._message = message.text
    this._type = message.type
    this._render()
  }

  _render() {
    this.id = this._id
    this.setAttribute('role', 'modal')
    this.classList.add('toast', this._type)
    this.innerHTML =
    `<p>${this._message}</p>
    <button tabindex="0" aria-label="Close toast" class="btn close-toast ${this._type} side icon">
        <i class="material-icons">close</i>
    </button>`
  }
}
customElements.define('toast-message', ToastMessage)
