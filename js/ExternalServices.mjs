export default function service(){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f09d1c5d13msh1ba1bff2a1f3415p118213jsnd886eb115ba0',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

  fetch('https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=eiffel%20tower&lang=en_US&units=km', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

  const options2 = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    },
    body: '{"geoId":293928,"startDate":"2022-03-10","endDate":"2022-03-15","pax":[{"ageBand":"ADULT","count":2}],"sort":"TRAVELER_FAVORITE_V2","sortOrder":"asc","filters":[{"id":"category","value":["40"]},{"id":"rating","value":["40"]},{"id":"navbar","value":["ATTRACTIONOVERVIEW:-true"]}]}'
  };

  fetch('https://travel-advisor.p.rapidapi.com/attraction-filters/v2/list?currency=USD&units=km&lang=en_US', options2)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  

}


export function bestPlaces(bestPlacesContainer,render){
  
  const options3 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f09d1c5d13msh1ba1bff2a1f3415p118213jsnd886eb115ba0',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
  const url = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary?tr_longitude=109.262909&tr_latitude=12.346705&bl_longitude=109.095887&bl_latitude=12.113245&currency=USD&lunit=km&lang=en_US';
  fetch(url, options3)
    .then(response => response.json())
    .then(response => bestPlacesContainer.innerHTML = render(response.data))
    .catch(err => console.error(err));

}



 /* 
// const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
//const baseURL = "https://wdd330-backend.onrender.com/";
const baseURL = "https://wdd330-backend.vercel.app/";

async function convertToJson(res) {
  const jsonResponse = await res.json(); //added team7
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse }; //modified team7
    // throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    //Vite needs public folder to not be referenced: https://vitejs.dev/guide/assets.html#the-public-directory
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    // const response = await fetch(baseURL + `products/search/${category}`);
    // const data = await convertToJson(response);
    // return data.Result;
    return await fetch(baseURL + `products/search/${category}`)
      .then((res) => convertToJson(res))
      .then((data) => data.Result);
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  async loginRequest(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(baseURL + "login", options).then(
      convertToJson
    );
    return response.accessToken;
  }
  // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
  async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }
}
*/