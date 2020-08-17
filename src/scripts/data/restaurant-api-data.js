/* eslint-disable new-cap */
import API_ENDPOINT from '@/global/endpoint';
import CONFIG from '@/global/config';

class RestaurantApiData {
  static async getCatalog() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'X-Auth-Token': CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }
}

export default RestaurantApiData;
