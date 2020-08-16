import RestaurantBookmark from "@/data/restaurant-idb";
import Card from "@/components/card";
import Modal from "@/components/modal";

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

      const cardGroup = document.getElementById("card-group")
      let restaurantHTML = ``;
      restaurantList.forEach(restaurant => {
        restaurantHTML += Card.render(restaurant);
      });

      cardGroup.innerHTML = restaurantHTML;
      await Card.createEvent();
    },
  };
   
  export default Bookmark;