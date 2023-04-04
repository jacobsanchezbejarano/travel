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

