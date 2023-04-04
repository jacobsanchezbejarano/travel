import loadTemplates, {loadContentHome, activateSelected, loadContentPlace, create_placesDefault} from "./loadHtml.mjs";
import {getParam, getLocalStorage,setLocalStorage} from "./utils.mjs";

loadTemplates();

if(window.location.href.search('index.html') > -1){
    loadContentHome();
}

if(window.location.href.search('places.html') > -1){
    let id_place = getParam('location_id');
    if(id_place != null){

        let localStorageData = getLocalStorage('visited');
        if(localStorageData != "" && localStorageData != null){
            if(localStorageData.search(id_place) == -1){
                let newValue = localStorageData + "," + id_place;
                setLocalStorage('visited', newValue);
            }
        }else{
            setLocalStorage('visited', id_place);
        }

        loadContentPlace(id_place);

    }else{
        //Show attractions of visited links first (4 places), 
        //then show infinite scroll of places (29) (not to include the 
        //places already shown)
        let localStorageData = getLocalStorage('visited');
        if(localStorageData != "" && localStorageData != null){
            let visited = getLocalStorage('visited').split(',');
            let html = "";
            html += "<h1 class='visited-title'>Visited</h1>";

            visited.forEach((item)=>{
                html += create_placesDefault(item);
            });
            
            document.querySelector("main").innerHTML = html;
        }
    }

    let visited = getLocalStorage('visited').split(',');
    console.log(visited);

    
}

activateSelected();


