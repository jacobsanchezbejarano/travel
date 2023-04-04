import ExternalServices, {bestPlaces} from './ExternalServices.mjs';
import {utf8_to_b64,b64_to_utf8} from './utils.mjs';

export default function loadTemplates(){
    document.querySelector("header").innerHTML = loadHeader();
    document.querySelector("footer").innerHTML = loadFooter();
    const x = document.getElementById('hamburguerBtn');
    x.onclick = toggleMenu;
    
    
}

export function loadContentHome(){
    let mostVisitedVar = document.querySelector(".most-visited");
    let bestPlacesVar = document.querySelector(".best-places");
    let recommendedVar = document.querySelector(".recommended");
    
    document.querySelector(".banner-main").innerHTML = loadBanner();
    bestPlaces(bestPlacesVar,render_bestPlaces);
    bestPlaces(mostVisitedVar,render_mostVisited);
    bestPlaces(recommendedVar,render_recommended);
    
    let data_aside = [
        "Why To Visit Cancún",
        "The beautiful surroundings of Cancun make it the ideal place to combine nature with outdoor sports and activities. Don’t miss out on all the things to do in Cancun and all the Riviera Maya theme parks offering nature, history, culture and adventure! Xcaret Park brings you an authentic Mexican experience with a complete day of fun for the whole family or you can discover the magic of the underwater world at the natural aquarium of Xelha Park."
    ]
    document.querySelector(".why-visit").innerHTML = render_aside(data_aside);
}


function loadHeader(){
    return `<div class="first">
        <img class="logo" src="./images/logotravel.png" alt="Logo image of Travel">
    </div>
    <div class="second">
        <a href="https://www.facebook.com/"><img src="images/104498_facebook_icon.png" alt="icon-facebook"></a>
        <a href="https://instagram.com/"><img src="images/1161953_instagram_icon.png" alt="icon-instagram"></a>
    </div>
    <div>
        <button id="hamburguerBtn"><span>&#9776;</span><span>X</span></button>
    </div>
    <div class="menu">
        <nav>
            <ul id="primaryNav">
                <li><a href="index.html">Home</a></li>
                <li><a href="places.html">Places</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </div>
    <div class="date-header">
        <p id="datetime"></p>
    </div>`;
}

export function activateSelected(){
    const els = document.querySelectorAll("#primaryNav li a");

    els.forEach((item)=>{
        if(window.location.href.search(item.href) > -1){
            item.parentNode.classList.add("active");
        }
    });
}

function loadFooter() {
    return `<p>
                <span>&copy;<span id="©">2023</span></span>
                <span> .:|:. Jacob Sanchez Bejarano .:|:.</span>
                <span>Brigham Young University - Idaho .:|:.</span>
                <span>WDD 330</span>
            </p>`;
}

function toggleMenu() { 
    document.getElementById('primaryNav').classList.toggle('open');
    document.getElementById('hamburguerBtn').classList.toggle('open');
}

function loadBanner(){ 
    let image = "images/cancun.jpg";
    return `<button class="call-to-action">Reserve Awesome Tours!</button>
            <figure>
                <img src="${image}" alt="Main banner, Cancún Beach Picture">
                <figcaption></figcaption>
            </figure>`;
    
}

export function loadContentPlace(data){
    
    document.querySelector("main").innerHTML = create_placesCard(data);
}


export function create_placesCard(base64_data){
    let data = JSON.parse(b64_to_utf8( base64_data ));
    console.log(data);
    let photo = "";
    if(data.photo != undefined || data.photo == ""){
        photo = data.photo
    }
    let name = data.name;
    let description = data.description;

    let html = "";
    if( data.latitude){
        html+= `<p>Latitude: ${data.latitude}</p>`
    };
    if( data.longitude){
        html+= `<p>Longitude: ${data.longitude}</p>`
    };
    if( data.location_string){
        html+= `<p>Location: ${data.location_string}</p>`
    };
    if( data.address_obj){
        html+= `<p>${data.address_obj.country}, ${data.address_obj.city}</p>
                <p>${data.address_obj.street1}</p>`;
    };

    let html_2 = "";
    if( data.category){
        html_2+= `<p> ${data.category.name}</p>`
    };

    let html_3 = "";
    if( data.rating){
        let checked = Math.round(data.rating);

        let x = 0;
        while (x < checked){
            html_3+= `
            <span class="fa fa-star checked"></span>
            `;
            x++;
        }
        console.log(x);
        while (x < 5){
            html_3+= `
            <span class="fa fa-star"></span>
            `;
            x++;
        }
    };

    return `<article class="reviews_div">
                <div class="reviews">
                ${html_2}
                    <div class="stars">
                        ${html_3}
                    </div>
                </div>
            </article>
            
            <article class="best-places-item">
                <h2>${name}</h2>
                <figure>
                    <img src="${photo}" alt="Image of ${name}, ${data.location_string}">
                    <figcaption>${description}</figcaption>
                </figure>
                <p></p>
            </article>

            <article class="aditional-info">
                <h3>Aditional information</h3>
                <div class="more_info">${html}</div>
            </article>

            
            
            `;
}


export function create_placesDefault(base64_data){
    let data = JSON.parse(b64_to_utf8( base64_data ));

    let photo = "";
    if(data.photo != undefined || data.photo == ""){
        photo = data.photo
    }

    let location_id = data.location_id;
    let name = data.name;
    let description = data.description;
    let latitude = data.latitude;
    let longitude = data.longitude;
    let location_string = data.location_string;
    let address_obj = data.address_obj;
    let category = data.category;
    let rating = data.rating;

    const obj = {
        "photo": photo, 
        "location_id": location_id, 
        "name": name, 
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "location_string": location_string,
        "address_obj": address_obj,
        "category": category,
        "rating": rating, 
      };
    
      const string_of_obj = JSON.stringify(obj);

      const data_send = utf8_to_b64( string_of_obj );

      return `<article class="best-places-item">
                <a href="places.html?location_id=${data_send}"><h2>${name}</h2></a>
                <figure>
                    <a href="places.html?location_id=${data_send}"><img src="${photo}" alt="Image of ${name}, ${location_string}"></a>
                    <a href="places.html?location_id=${data_send}"><figcaption>${description}</figcaption></a>
                </figure>
                <p></p>
            </article>`;
}

function create_mostVisitedCard(data){

    let photo = "";
    if(data.photo != undefined){
        photo = data.photo.images.medium.url;
    }

    let location_id = data.location_id;
    let name = data.name;
    let description = data.description;
    let latitude = data.latitude;
    let longitude = data.longitude;
    let location_string = data.location_string;
    let address_obj = data.address_obj;
    let category = data.category;
    let rating = data.rating;

    const obj = {
        "photo": photo, 
        "location_id": location_id, 
        "name": name, 
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "location_string": location_string,
        "address_obj": address_obj,
        "category": category,
        "rating": rating, 
      };
    
      const string_of_obj = JSON.stringify(obj);

      const data_send = utf8_to_b64( string_of_obj );

    return `<article class="best-places-item">
                <a href="places.html?location_id=${data_send}"><h2>${name}</h2></a>
                <figure>
                    <a href="places.html?location_id=${data_send}"><img src="${photo}" alt="Image of ${name}, ${location_string}"></a>
                    <a href="places.html?location_id=${data_send}"><figcaption>${description}</figcaption></a>
                </figure>
                <p></p>
            </article>`;
}

function create_bestPlacesToTravelTo(data){
    let photo = "";
    if(data.photo != undefined){
        photo = data.photo.images.medium.url;
    }

    let location_id = data.location_id;
    let name = data.name;
    let description = data.description;
    let latitude = data.latitude;
    let longitude = data.longitude;
    let location_string = data.location_string;
    let address_obj = data.address_obj;
    let category = data.category;
    let rating = data.rating;

    const obj = {
        "photo": photo, 
        "location_id": location_id, 
        "name": name, 
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "location_string": location_string,
        "address_obj": address_obj,
        "category": category,
        "rating": rating, 
      };
    
      const string_of_obj = JSON.stringify(obj);

      const data_send = utf8_to_b64( string_of_obj );

    return `<article class="best-places-item">
                <a href="places.html?location_id=${data_send}"><h2>${name}</h2></a>
                <figure>
                    <a href="places.html?location_id=${data_send}"><img src="${photo}" alt="Image of ${name}, ${location_string}"></a>
                    <a href="places.html?location_id=${data_send}"><figcaption>${description}</figcaption></a>
                </figure>
                <p></p>
            </article>`;
}

function create_recommended(data){
    let photo = "";
    if(data.photo != undefined){
        photo = data.photo.images.medium.url;
    }

    let location_id = data.location_id;
    let name = data.name;
    let description = data.description;
    let latitude = data.latitude;
    let longitude = data.longitude;
    let location_string = data.location_string;
    let address_obj = data.address_obj;
    let category = data.category;
    let rating = data.rating;

    const obj = {
        "photo": photo, 
        "location_id": location_id, 
        "name": name, 
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "location_string": location_string,
        "address_obj": address_obj,
        "category": category,
        "rating": rating, 
      };
    
      const string_of_obj = JSON.stringify(obj);

      const data_send = utf8_to_b64( string_of_obj );

    return `<h2>Recommended</h2>
            <article class="best-places-item">
                <a href="places.html?location_id=${data_send}"><h2>${name}</h2></a>
                <figure>
                    <a href="places.html?location_id=${data_send}"><img src="${photo}" alt="Image of ${name}, ${location_string}"></a>
                    <a href="places.html?location_id=${data_send}"><figcaption>${description}</figcaption></a>
                </figure>
                <p></p>
            </article>`;
}

function render_mostVisited(data){

    console.log(data);
    let len = data.length;

    let array_of_keys = randomPlaces(3,len);
    
    let html = "";

    html += `<h1>Most Visited</h1>`;

    data.forEach((item)=>{
        if(array_of_keys.includes(data.indexOf(item))){
            html += create_mostVisitedCard(item);
        }
    });

    return html;
}

function render_bestPlaces(data){

    console.log(data);
    let len = data.length;

    let array_of_keys = randomPlaces(4,len);
    
    let html = "";

    html += `<h1>Best Places to Travel To</h1>`;


    data.forEach((item)=>{
        if(array_of_keys.includes(data.indexOf(item))){
            html += create_bestPlacesToTravelTo(item);
        }
    });

    return html;
}

function render_recommended(data){
    let len = data.length;

    let array_of_keys = randomPlaces(1,len);
    
    let html = "";

    data.forEach((item)=>{
        if(array_of_keys.includes(data.indexOf(item))){
            html += create_recommended(item);
        }
    });

    return html;
}

function render_aside(data_aside){
    let title = data_aside[0];
    let content = data_aside[1];

    return `<h1>${title}</h1>
            <p>${content}</p>`;
}

function randomPlaces(q,len){

    let array_ = [];

    for(let i=0; i<q; i++){
        let value = Math.floor(Math.random() * (len));
        if(!array_.includes(value)){
            array_.push(value);
        }
    }

    return array_;
}