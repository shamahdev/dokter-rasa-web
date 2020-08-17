import RestaurantBookmark from '@/data/restaurant-idb';
import Card from '@/components/card';

const Bookmark = {
  async render() {
    return `
        <article id="main">
            <h2 class="center">Bookmark</h2>
            <div id="card-group">
              <loading-spinner/>
            </div>
        </article>
      `;
  },

  async afterRender() {
    const restaurantList = await RestaurantBookmark.getAllBookmark();
    console.log(restaurantList);

    const cardGroup = document.getElementById('card-group');
    let restaurantHTML = ``;
    restaurantList.forEach((restaurant) => {
      restaurantHTML += Card.render(restaurant);
    });

    cardGroup.innerHTML = restaurantHTML;
    // Add 'is-on-bookmark' dataset = true
    await Card.createEvent(true);
  },
};

export default Bookmark;
