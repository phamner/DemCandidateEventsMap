// window.fbAsyncInit = function() {
// FB.init({
//     appId            : 'your-app-id',
//     autoLogAppEvents : true,
//     xfbml            : true,
//     version          : 'v5.0'
// });
// };
// async defer src="https://connect.facebook.net/en_US/sdk.js"
/* make the API call */


var yangHolder = [];  //can be deleted later

function initMap(){
    // The location of DC
    let washingtonDC = {lat: 38.8977, lng: -77.036560};

    // The map, centered at Washington D.C.
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: washingtonDC});
    
    //Each function loops through one of the candidates (organized alphabetically) 
    //and populates map with custom marker
    //all are currently using the function skeleton from Andrew Yang.  Each function must be
    //re-writen, and the data about their travel must be input to data.js

    let loopThruAllEvents = function (){
        for(var candidate in allEvents){
            for(var i = 0; i < allEvents[candidate].length; i++){
                let candidatePhotoURL = '';
   
                //checks which candidate we ar looking at, and select their photo to use as the marker
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Elizabeth Warren'){
                    candidatePhotoURL = 'candidatePhotos/Warren100px.png'
                }
                else {
                    candidatePhotoURL = 'candidatePhotos/Yang100px.png'
                }

                if(allEvents[candidate][i].lat === null || allEvents[candidate][i].lon === null){
                    continue;
                }

                let x = new google.maps.Marker(
                    {position: 
                        {lat: allEvents[candidate][i].lat, lng: allEvents[candidate][i].lon},
                        map: map, 
                        icon: {
                            url: candidatePhotoURL,
                        }
                    }
                );
                yangHolder.push(x)
            }
        }
    }
    loopThruAllEvents();
}

// document.getElementsByClassName('visibilityCheckbox').onclick = function(){
//     console.log('this checkbox is working')
// }







//can likely delete all the code below.  COmes from an earlier iteration.

//     //Andrew Yang
    // let yangHolder = [];
//     for(var i = 0; i < allEvents.length; i++){
//         for(var prop in allEvents){
//             console.log(allEvents[prop])
//         }
    
//         let x = new google.maps.Marker(
//             {position: 
//                 {lat: andrewYang.events[i].lat, lng: andrewYang.events[i].lon},
//                 map: map, 
//                 icon: {
//                     url: "candidatePhotos/Yang100px.png",
//                 }
//             }
//         );
//         yangHolder.push(x)








  
