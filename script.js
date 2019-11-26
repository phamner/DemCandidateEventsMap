function initMap(){
    var markerHolder = []; 


    // The location of DC
    let washingtonDC = {lat: 38.8977, lng: -77.036560};

    // The map, centered at Washington D.C.
    let map = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 4, center: washingtonDC},
    );



    
    //Each function loops through one of the candidates (organized alphabetically) 
    //and populates map with custom marker
    //all are currently using the function skeleton from Andrew Yang.  Each function must be
    //re-writen, and the data about their travel must be input to data.js

    let loopThruAllEvents = function (){
        for(var candidate in allEvents){
            for(var i = 0; i < allEvents[candidate].length; i++){
                let candidatePhotoURL = '';
                
                //checks which candidate we are looking at, and selects their photo to use as the marker
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Elizabeth Warren'){
                    candidatePhotoURL = 'candidatePhotos/Warren100px.png'
                }
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Andrew Yang'){
                    candidatePhotoURL = 'candidatePhotos/Yang100px.png'
                }
                // else {
                //     candidatePhotoURL = 'candidatePhotos/Yang100px.png'
                // }

                if(allEvents[candidate][i].lat === null || allEvents[candidate][i].lon === null){
                    continue;
                }

                let contentString = 
                '<div id="content">'+
                '<div id="eventDescription">'+
                '</div>'+
                `<h1 id="firstHeading" class="firstHeading">${allEvents[candidate][0]['organization']['candidate_name']}</h1>`+
                '<div id="bodyContent">'+
                `<p><b></b>${allEvents[candidate][i].name}<br><br>`+
                `${allEvents[candidate][i].location_name}, ${allEvents[candidate][i].address_line1}, ${allEvents[candidate][i].city}, ${allEvents[candidate][i].state} ${allEvents[candidate][i].zipcode}<br><br>`+
                `${allEvents[candidate][i].description}<br><br>`+
                `Sign up: ${allEvents[candidate][i].organization.hot_leads_embed_url}<br><br>`+
                `Click here to Donate: ${allEvents[candidate][i].organization.act_blue_donate_url}`
                '</div>'+
                '</div>';
            
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                let marker = new google.maps.Marker({
                    position: {lat: allEvents[candidate][i].lat, lng: allEvents[candidate][i].lon},
                    map: map, 
                    icon: {
                        url: candidatePhotoURL
                    },
                    // label: {
                    //     text: 'hello world',
                    //     color: '#222222',
                    //     fontSize: '12px'
                    //   }                   
                });

                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });




                markerHolder.push(marker)
                
            }
        }
    }
    

    //calls function above to populate map with markers
    loopThruAllEvents();

    


    let toggleWarren = document.getElementById('seeWarrenEvents').onclick = function(){
        console.log('the Warren checkbox is working')

        // for(var i = 0; i < markerHolder.length; i++){
        //     // console.log(markerHolder[i].icon.url)
        //     if(markerHolder[i].icon.url === "candidatePhotos/Warren100px.png"){
        //         markerHolder[i].visible = false;
                // location.reload();  This doesn't work as intended.
                // markerHolder[i].hide();
                // console.log(markerHolder[i].visible)
        //     }
        // }
        // console.log('the Warren checkbox is working');
        // console.log(markerHolder.length)
        // markerHolder.toggle();
        // x.hide()
    }
    let toggleYang = document.getElementById('seeYangEvents').onclick = function(){
        console.log('the Yang checkbox is working')
    }

    //the below is not working yet
    // let toggleState = document.getElementsByName('states').onclick = function(){
    //     console.log('states')
    // }
}




  






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








  
