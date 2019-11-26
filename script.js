function initMap(){

    // The location of DC
    let washingtonDC = {lat: 38.8977, lng: -77.036560};

    // Create map, centered at Washington D.C.
    let map = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 4, center: washingtonDC},
    );

    let markerHolder = []; 

    
    //Each function loops through one of the candidates (organized alphabetically) 
    //and populates map with custom marker
    //all are currently using the function skeleton from Andrew Yang.  Each function must be
    //re-writen, and the data about their travel must be input to data.js

    let addMarkersCreateArray = function (){
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
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Joe Biden'){
                    candidatePhotoURL = 'candidatePhotos/Biden100px.png'
                }
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Pete Buttigieg'){
                    candidatePhotoURL = 'candidatePhotos/Buttigieg100px.png'
                }
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Bernie Sanders'){
                    candidatePhotoURL = 'candidatePhotos/Sanders100px.png'
                }
                else {
                    console.log(allEvents[candidate][0]['organization']['candidate_name'])
                }

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
                // `Click here to Donate: ${allEvents[candidate][i].organization.act_blue_donate_url}`
                '</div>'+
                '</div>';
            
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                let marker = new google.maps.Marker({
                    position: {lat: allEvents[candidate][i].lat, lng: allEvents[candidate][i].lon},
                    // map: map, 
                    icon: {
                        url: candidatePhotoURL
                    },             
                });

                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });

                markerHolder.push(marker)


                // marker.setMap(map);

                
            }
        }
    }
    addMarkersCreateArray();

    function setMapOnAll(map) {
        for (var i = 0; i < markerHolder.length; i++) {
            markerHolder[i].setMap(map);
        }
    }

    //calls the function setMapOnAll(), iterating through array markerHolder to populate map w/ markers
    setMapOnAll(map);


    //toggle for Yang map markers (on and off)
    const yangCheckbox  = document.getElementById('seeYangEvents')
    yangCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Yang100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Yang100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })


    //toggle for Warren map markers (on and off)
    const warrenCheckbox = document.getElementById('seeWarrenEvents')
    warrenCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Warren100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Warren100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for Biden map markers (on and off)
    const bidenCheckbox = document.getElementById('seeBidenEvents')
    bidenCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Biden100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Biden100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for Buttigieg map markers (on and off)
    const buttigiegCheckbox = document.getElementById('seeButtigiegEvents')
    buttigiegCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Buttigieg100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Buttigieg100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })


      









    // Sets the map on all markers in the array.
    // function setMapOnAll(marker) {
    //     for (var i = 0; i < markerHolder.length; i++) {
    //         markerHolder[i].setMap(marker);
    //     }
    // }


    // Removes the markers from the map, but keeps them in the array.
    // function clearMarkers() {
    //     setMapOnAll(null);
    // }

    // // Shows any markers currently in the array.
    // function showMarkers() {
    //     setMapOnAll(map);
    // }
    

    



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
    // }
    let toggleYang = document.getElementById('seeYangEvents').onclick = function(){
        console.log('the Yang checkbox is working')
    }
    let toggleBiden = document.getElementById('seeBidenEvents').onclick = function(){
        console.log('the Biden checkbox is working')
    }
    let toggleButtigieg = document.getElementById('seeButtigiegEvents').onclick = function(){
        console.log('the Buttigieg checkbox is working')
    }
    let toggleSanders = document.getElementById('seeSandersEvents').onclick = function(){
        console.log('the Sanders checkbox is working')
    }


    






    //the below is not working yet
    // let toggleState = document.getElementsByName('states').onclick = function(){
    //     console.log('states')
    // }
}








  
