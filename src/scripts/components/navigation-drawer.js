class NavigationDrawer extends HTMLElement {
  connectedCallback() {
    this._render()
  }

  _render() {
    this.id = 'header'
    this.innerHTML =
            `<nav class="navbar" role='navigation'>
                <div class="title">
                    <h1>dokter rasa</h1>
                </div>
                <button tabindex="0" id="hamburger" aria-label="Navigation Menu" class="material-icons">menu</button>
                <ul id="drawer" class="links">
                    <li><a tabindex="0" href="#/home"><span class="material-icons" aria-hidden="true">home</span> Home</a></li>
                    <li><a tabindex="0" href="#/bookmark"><span class="material-icons" aria-hidden="true">book</span> Bookmark</a></li>
                    <li><a tabindex="0" href="https://github.com/shamahdotdev" rel="noreferrer" target="_blank"><span class="material-icons" aria-hidden="true">person</span> About Us</a></li>
                </ul>
            </nav>`
  }
}
customElements.define('navigation-drawer', NavigationDrawer)
