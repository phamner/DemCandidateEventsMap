window.onload = onPageLoad();

function onPageLoad() {
  document.getElementById("selectAll").checked = true;
}

let currentDateYearFirst = new Date().toJSON().slice(0,10).replace(/-/g,'/');
let currentYear = currentDateYearFirst.slice(0,4);
let currentMonthDay = currentDateYearFirst.slice(5);
let currentDate = currentMonthDay + '/' + currentYear

function initMap(){
    let markerHolder = []; 

    // The location of DC
    let washingtonDC = {lat: 38.8977, lng: -77.036560};
    // The geographic center of the contiguous United States
    let centerOfUSA = {lat: 39.8282, lng: -98.5795};

    // Create map, centered at Washington D.C.
    let map = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 4, center: centerOfUSA},
    );

    // geocoder = new google.maps.Geocoder();


    
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
                    console.log('Elizabeth Warren');
                    candidatePhotoURL = 'candidatePhotos/Warren100px.png';
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Andrew Yang'){
                    console.log('Andrew Yang');
                    candidatePhotoURL = 'candidatePhotos/Yang100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Joe Biden'){
                    console.log('Joe Biden');
                    candidatePhotoURL = 'candidatePhotos/Biden100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Pete Buttigieg'){
                    console.log('Pete Buttigieg');
                    candidatePhotoURL = 'candidatePhotos/Buttigieg100px.png'
                }
                else if(allEvents[candidate][i].organization.name.includes('Bernie')){
                    console.log('Bernie Sanders');
                    candidatePhotoURL = 'candidatePhotos/Sanders100px.png'
                }
                else if(allEvents[candidate][0]['organization'].name.slice(0, 13) === 'Kamala Harris'){
                    console.log('Kamla Haarris');
                    candidatePhotoURL = 'candidatePhotos/Harris100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Amy Klobuchar'){
                    console.log('Amy Klobuchar');
                    candidatePhotoURL = 'candidatePhotos/Klobuchar100px.png'
                }
                else if(allEvents[candidate][0]['organization'].slug === 'corybooker'){
                    console.log('cory booker');
                    candidatePhotoURL = 'candidatePhotos/Booker100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Tom Steyer'){
                    console.log('Tom Steyer');
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
            
                if(allEvents[candidate][i].organization.name.includes('Bernie')){
                    eventURLString = 'https://events.berniesanders.com/event/' + allEvents[candidate][i].id + '/'
                }

                else if(allEvents[candidate][i].organization.candidate_name === 'Elizabeth Warren' || allEvents[candidate][i].organization.candidate_name === 'Joe Biden' || allEvents[candidate][i].organization.candidate_name === 'Amy Klobuchar'){
                    // console.log('this is for ' + allEvents[candidate][i].organization.candidate_name)
                    eventURLString = 'https://www.mobilize.us/' + candidateNameNoSpaces + '/event/' + allEvents[candidate][i].id + '/';  
                } 
                else if(allEvents[candidate][i].organization.name.includes('Kamala Harris') || allEvents[candidate][i].organization.slug.slice(0,6) === 'kamala'){
                    // console.log('this is for Kamala')
                    eventURLString = 'https://www.mobilize.us/kamalaharris/event/' + allEvents[candidate][i].id + '/'
                }
                else if(allEvents[candidate][i].organization.candidate_name === 'Cory Booker' || allEvents[candidate][i].organization.slug === 'corybooker' || allEvents[candidate][i].organization.name.slice(0,4) === 'Cory'){
                    // console.log('this is for cory booker')
                    eventURLString = 'https://www.mobilize.us/corybooker/event/' + allEvents[candidate][i].id + '/';
                }
                else if (allEvents[candidate][i].organization.candidate_name === 'Tom Steyer'){
                    // console.log('this is for tom steyer')
                    eventURLString = 'https://events.' + candidateNameNoSpaces + '.com/event/' + allEvents[candidate][i].id + '/';
                }
                else if (allEvents[candidate][i].organization.candidate_name === 'Pete Buttigieg'){
                    // console.log('this is for mayor pete')
                    eventURLString = 'https://www.mobilize.us/peteforamerica/event/' +  allEvents[candidate][i].id + '/';
                }
                else if (allEvents[candidate][i].organization.candidate_name === 'Andrew Yang'){
                    // console.log('this is for andrew yang')
                    eventURLString = 'https://www.mobilize.us/yang2020/event/' +  allEvents[candidate][i].id + '/';
                }




                //assigns the correct title for each infoWindow popup (one per marker)
                let titleForPopup = '';
                if(allEvents[candidate][0].organization.candidate_name){
                    titleForPopup = allEvents[candidate][0].organization.candidate_name;
                }
                else if (allEvents[candidate][i]['organization'].name.slice(0, 13) === 'Kamala Harris'){
                    titleForPopup = 'Kamala Harris'
                }
                else if(allEvents[candidate][i].organization.name.includes('Bernie')){
                    titleForPopup = 'Bernie Sanders'
                }
                else {
                    titleForPopup = 'Cory Booker'
                }



                //This is the text used in each infoWindow.
                let contentString = 
                '<div id="content">'+
                '<div id="eventDescription">'+
                '</div>'+
                `<h1 id="firstHeading" class="firstHeading">${titleForPopup}</h1>`+
                '<div id="bodyContent">'+
                `<p><b></b>${allEvents[candidate][i].name}<br><br>`+
                `Date: ${allEvents[candidate][i].times[0].start.slice(5, 10)}-${allEvents[candidate][i].times[0].start.slice(0, 4)}<br>`+
                `Location: ${allEvents[candidate][i].location_one_line}<br><br>`+
                // ${allEvents[candidate][i].address_line1}, ${allEvents[candidate][i].city}, ${allEvents[candidate][i].state} ${allEvents[candidate][i].zipcode}<br><br>`+
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
                if(allEvents[candidate][i].lat === null || allEvents[candidate][i].lon === null){
                    console.log('ERROR: ' + allEvents[candidate][i] + ' has no lat or lon')
                }
                let marker = new google.maps.Marker({
                    position: latLonPosition,
                    icon: {
                        url: candidatePhotoURL
                    },
                });

                //Allows user to open infoWindow popups with more info when they click a candidate's marker
                marker.addListener('click', function() {
                    console.log(infoWindow)
                    infoWindow.open(map, marker);
                });

                markerHolder.push(marker)

                
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


    // toggle for all candidates (this is better sytactically then the toggles below.)
    const selectAll = document.getElementById('selectAll')
    selectAll.addEventListener('change', (event) => {
        for(var i = 0; i < markerHolder.length; i++){
            if (event.target.checked) {
                // console.log('checked');
                markerHolder[i].setMap(map)
            } else {
                markerHolder[i].setMap(null)
            }
        }
    })

    const candidates = {
        seeYangEvents : {
            icon: 'candidatePhotos/Yang100px.png'
        },
        seeWarrenEvents : {
            icon: 'candidatePhotos/Warren100px.png'
        },
        seeBidenEvents : {
            icon: 'candidatePhotos/Biden100px.png'
        },
        seeButtigiegEvents : {
            icon: 'candidatePhotos/Buttigieg100px.png'
        },
        seeSandersEvents : {
            icon: 'candidatePhotos/Sanders100px.png'
        },
        seeHarrisEvents : {
            icon: 'candidatePhotos/Harris100px.png'
        },
        seeKlobucharEvents : {
            icon: 'candidatePhotos/Klobuchar100px.png'
        },        
        seeBookerEvents : {
            icon: 'candidatePhotos/Booker100px.png'
        },
        seeSteyerEvents : {
            icon: 'candidatePhotos/Steyer100px.png'
        }
    }

    for(var i = 0; i < document.querySelectorAll('.candidate-check').length; i++){
        document.querySelectorAll('.candidate-check')[i].addEventListener('change', function(event){
            let canidateId = event.target.id // somehow get the id of the element that was checked/unchecked
            let icon = candidates[canidateId].icon

            for(var j = 0; j < markerHolder.length; j++){
                if(markerHolder[j].icon.url === icon){
                    if (event.target.checked) {
                        markerHolder[j].setMap(map)
                    } 
                    else {
                        markerHolder[j].setMap(null)

                    }
                }
            }
        })
    }






    // //Hides marker based on the calendar dates
    $(function() {
        $('input[name="daterange"]').daterangepicker({
            opens: 'left'
        }, function(start, end, label) {
            let dateRange = start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD');
            var getDaysArray = function(start, end) {
                for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
                    arr.push(new Date(dt));
                }
                return arr;
            };
            var daylist = getDaysArray(new Date(start),new Date(end));
            let fullListOfSelectedDays = daylist.map((v)=>v.toISOString().slice(0,10));

            //loop through full data set and show only events that fall within the range of fullListOfSelectedDays.

            for(var i = 0; i < markerHolder.length; i++){
                markerHolder[i].setMap(null)
            }



            for(var candidate in allEvents){
                for(var i = 0; i < allEvents[candidate].length; i++){
                    for(var j = 0; j < fullListOfSelectedDays.length; j++){
                        if(allEvents[candidate][i].times[0].start.slice(0,10) === fullListOfSelectedDays[j]){
                            markerHolder[i].setMap(map)
                            // console.log(allEvents[candidate][i].times[0].start.slice(0,10) + ' should be equal to ' + fullListOfSelectedDays[j])
                            console.log('SHOULD BE VISIBLE ' + allEvents[candidate][i].name, allEvents[candidate][i].times[0].start.slice(0,10))

                            // console.log(allEvents[candidate][i] + ':  This event should be visible')
                        }else{
                            markerHolder[i].setMap(null)
                            // console.log(allEvents[candidate][i].times[0].start.slice(0,10) + ' should NOT be equal to ' + fullListOfSelectedDays[j])
                            // console.log('SHOULD NOT BE VISIBLE ' + allEvents[candidate][i].name, allEvents[candidate][i].times[0].start.slice(0,10))


                            // console.log(allEvents[candidate][i] + ':  This event should be hidden')
                        }
                    }
                }
            }
        });
    });

}