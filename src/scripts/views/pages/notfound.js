const NotFound = {
  async render() {
    return `
        <article id="main">
            <h2 class="center">Halaman tidak ditemukan</h2>
            <div id="card-group">
                <div class="msg-group">
                    <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">error</span>Error 404 Not Found</p>
                    <a tabindex="0" href="#/home" class="btn primary rounded center mh-auto">Kembali ke Home</a>
                </div>
            </div>
        </article>
      `
  },
  async afterRender() {
    console.warn('Halaman yang anda cari tidak ditemukan.')
  },
}

export default NotFound
