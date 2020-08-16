import API_ENDPOINT from '@/global/endpoint';
import CONFIG from '@/global/config';
 
class RestaurantDataSource {
  static async list() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }
 
  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async review(data) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'X-Auth-Token': CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json();
  }
}
 
export default RestaurantDataSource;