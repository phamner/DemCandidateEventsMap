function initMap(){

    // The location of DC
    let washingtonDC = {lat: 38.8977, lng: -77.036560};
    // The geographic center of the contiguous United States
    let centerOfUSA = {lat: 39.8282, lng: -98.5795};

    // Create map, centered at Washington D.C.
    let map = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 4, center: centerOfUSA},
    );

    let markerHolder = []; 
    geocoder = new google.maps.Geocoder();


    
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
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Andrew Yang'){
                    candidatePhotoURL = 'candidatePhotos/Yang100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Joe Biden'){
                    candidatePhotoURL = 'candidatePhotos/Biden100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Pete Buttigieg'){
                    candidatePhotoURL = 'candidatePhotos/Buttigieg100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Bernie Sanders'){
                    candidatePhotoURL = 'candidatePhotos/Sanders100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Kamala Harris'){
                    candidatePhotoURL = 'candidatePhotos/Harris100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Amy Klobuchar'){
                    candidatePhotoURL = 'candidatePhotos/Klobuchar100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Cory Booker'){
                    candidatePhotoURL = 'candidatePhotos/Booker100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Tom Steyer'){
                    candidatePhotoURL = 'candidatePhotos/Steyer100px.png'
                }
                else {
                    console.log('No Candidate Found')
                }


                if(allEvents[candidate][i].lat === null || allEvents[candidate][i].lon === null){
                    continue;
                }

                //This creates the unique event URL for the candidate in question to be added to each contentString.  
                let eventURLString = '';
                let candidateNameNoSpaces = (allEvents[candidate][i].organization.candidate_name).toLowerCase().replace(/\s/g,'');

                if(allEvents[candidate][i].organization.candidate_name === 'Elizabeth Warren' || allEvents[candidate][i].organization.candidate_name === 'Joe Biden' || allEvents[candidate][i].organization.candidate_name === 'Amy Klobuchar'){
                    eventURLString = 'https://www.mobilize.us/' + candidateNameNoSpaces + '/event/' + allEvents[candidate][i].id + '/';  
                } 
                else if (allEvents[candidate][i].organization.candidate_name === 'Tom Steyer'){
                    eventURLString = 'https://events.' + candidateNameNoSpaces + '.com/event/' + allEvents[candidate][i].id + '/';
                }
                else if (allEvents[candidate][i].organization.candidate_name === 'Pete Buttigieg'){
                    eventURLString = 'https://www.mobilize.us/peteforamerica/event/' +  allEvents[candidate][i].id + '/';
                }
                else if (allEvents[candidate][i].organization.candidate_name === 'Andrew Yang'){
                    eventURLString = 'https://www.mobilize.us/yang2020/event/' +  allEvents[candidate][i].id + '/';
                }

                //This is the text used in each infoWindow.
                let contentString = 
                '<div id="content">'+
                '<div id="eventDescription">'+
                '</div>'+
                `<h1 id="firstHeading" class="firstHeading">${allEvents[candidate][0]['organization']['candidate_name']}</h1>`+
                '<div id="bodyContent">'+
                `<p><b></b>${allEvents[candidate][i].name}<br><br>`+
                `From ${allEvents[candidate][i].times[0].start} until ${allEvents[candidate][i].times[0].end}<br><br>`+
                `${allEvents[candidate][i].location_name}, ${allEvents[candidate][i].address_line1}, ${allEvents[candidate][i].city}, ${allEvents[candidate][i].state} ${allEvents[candidate][i].zipcode}<br><br>`+
                `${allEvents[candidate][i].description}<br><br>`+
                `<a target="_blank" href=${eventURLString}>Click Here to Learn More</a>`+

                '</div>'+
                '</div>';
                
                //creates the infoWindow.
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                //Adds a marker for each event to map
                let latLonPosition = {lat: allEvents[candidate][i].lat, lng: allEvents[candidate][i].lon};
                let marker = new google.maps.Marker({
                    position: latLonPosition,
                    icon: {
                        url: candidatePhotoURL
                    },             
                });

                //Allows 
                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });

                markerHolder.push(marker)










                // console.log('This function runs _ times')

                // function codeAddress() {
                //     var address = JSON.stringify(allEvents[candidate][i]['city'] + ', ' + allEvents[candidate][i]['state']);
                //     geocoder.geocode( { 'address': address}, function(results, status) {
                //       if (status == 'OK') {
                //         console.log('Dropped a marker on map')
                //         map.setCenter(results[0].geometry.location);
                //         var marker = new google.maps.Marker({
                //             map: map,
                //             position: results[0].geometry.location
                //         });
                //       } else {
                //         console.log('Geocode was not successful for the following reason: ' + status);
                //       }
                //     });
                //   }
                //   setTimeout(codeAddress(), 5000 )
                // codeAddress()






                // let addressPosition = '';
                // let codeAddress = function(){
                //     let geocoder = new google.maps.Geocoder();
                //     let address = '107 E Main St, Bradford, NH, 03221';
                //     // (allEvents[candidate][i]['city'] + ', ' + allEvents[candidate][i]['state']);
                //     let geocode = geocoder.geocode({'address': address});
                //     return geocode;
                // }

                // // let addNoGeo = geocoder.geocode({'address': '107 E Main St, Bradford, NH, 03221'});
                // let addNoGeo = '107 E Main St, Bradford, NH, 03221';


                // // console.log(allEvents[candidate][i]['city'] + ', ' + allEvents[candidate][i]['state']);
                // console.log(codeAddress())















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


    //toggle for all candidates
    const selectAll = document.getElementById('selectAll')
    selectAll.addEventListener('change', (event) => {
        if (event.target.checked) {
            // console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                 markerHolder[i].setMap(map)
            }

        } else {
            // console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                markerHolder[i].setMap(null)
            
            }
        }
    })

    //toggle for Yang map markers (on and off)
    const yangCheckbox  = document.getElementById('seeYangEvents')
    yangCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            // console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Yang100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            // console.log('not checked');
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
            // console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Warren100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            // console.log('not checked');
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
            // console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Biden100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            // console.log('not checked');
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
            // console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Buttigieg100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            // console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Buttigieg100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for Sanders map markers (on and off)
    const sandersCheckbox = document.getElementById('seeSandersEvents')
    sandersCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            // console.log('checked');
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Sanders100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            // console.log('not checked');
            // clearMarkers()
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Sanders100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for Harris map markers (on and off)
    const harrisCheckbox = document.getElementById('seeHarrisEvents')
    harrisCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Harris100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Harris100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for klobuchar map markers (on and off)
    const klobucharCheckbox = document.getElementById('seeKlobucharEvents')
    klobucharCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Klobuchar100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Klobuchar100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for Booker map markers (on and off)
    const bookerCheckbox = document.getElementById('seeBookerEvents')
    bookerCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Booker100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Booker100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })

    //toggle for Steyer map markers (on and off)
    const steyerCheckbox = document.getElementById('seeSteyerEvents')
    steyerCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Steyer100px.png'){
                    markerHolder[i].setMap(map)
                }
            }

        } else {
            for(var i = 0; i < markerHolder.length; i++){
                if(markerHolder[i].icon.url === 'candidatePhotos/Steyer100px.png'){
                    markerHolder[i].setMap(null)
                }
            }
        }
    })




}








  
