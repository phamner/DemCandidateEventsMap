window.onload = onPageLoad();


function onPageLoad() {
  document.getElementById("selectAll").checked = false;
//   document.getElementById("andrewYang").checked = true;

//   let candidateCheckBoxes = document.getElementsByClassName("candidate-check");
//   candidateCheckBoxes.forEach(element => element.checked = true);
}

let currentDateYearFirst = new Date().toJSON().slice(0,10).replace(/-/g,'/');
let currentYear = currentDateYearFirst.slice(0,4);
let currentMonthDay = currentDateYearFirst.slice(5);
let currentDate = currentMonthDay + '/' + currentYear

let fullListOfEvents = [];
let markerHolder = []; 
let checkedAndDateStatus = []


let candidateIsVisible = {
    'allCandidates' : true,
    'andrewYang': false,
    'elizabethWarren': false,
    'joeBiden': false,
    'peteButtigieg': false,
    'bernieSanders': false,
    'kamalaHarris': false,
    'amyKlobuchar': false,
    'coryBooker': false,
    'tomSteyer': false,
}

let dateRangeHolder = [];

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

    
    //Each function loops through one of the candidates 
    //and populates map with custom marker
    let addMarkersCreateArray = function (){
        for(var candidate in allEvents){


            for(var i = 0; i < allEvents[candidate].length; i++){
                let candidatePhotoURL = '';
                
                //checks which candidate we are looking at, and selects their photo to use as the marker
                if(allEvents[candidate][0]['organization']['candidate_name'] === 'Elizabeth Warren'){
                    // console.log('Elizabeth Warren');
                    candidatePhotoURL = 'candidatePhotos/Warren100px.png';
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Andrew Yang'){
                    // console.log('Andrew Yang');
                    candidatePhotoURL = 'candidatePhotos/Yang100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Joe Biden'){
                    // console.log('Joe Biden');
                    candidatePhotoURL = 'candidatePhotos/Biden100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Pete Buttigieg'){
                    // console.log('Pete Buttigieg');
                    candidatePhotoURL = 'candidatePhotos/Buttigieg100px.png'
                }
                else if(allEvents[candidate][i].organization.name.includes('Bernie')){
                    // console.log('Bernie Sanders');
                    candidatePhotoURL = 'candidatePhotos/Sanders100px.png'
                }
                else if(allEvents[candidate][0]['organization'].name.slice(0, 13) === 'Kamala Harris'){
                    // console.log('Kamla Haarris');
                    candidatePhotoURL = 'candidatePhotos/Harris100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Amy Klobuchar'){
                    // console.log('Amy Klobuchar');
                    candidatePhotoURL = 'candidatePhotos/Klobuchar100px.png'
                }
                else if(allEvents[candidate][0]['organization'].slug === 'corybooker'){
                    // console.log('cory booker');
                    candidatePhotoURL = 'candidatePhotos/Booker100px.png'
                }
                else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Tom Steyer'){
                    // console.log('Tom Steyer');
                    candidatePhotoURL = 'candidatePhotos/Steyer100px.png'
                }
                else {
                    // console.log('No Candidate Found')
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


                // [

                //     "elizabethwarren.com",
                //     "yang2020",
                //     "joebiden",
                //     "peteforamerica",
                //     "https://events.berniesanders.com/event/",
                //     "kamalaharris",
                //     "amyklobuchar",
                //     "corybooker",
                //     "https://events.tomsteyer.com/event/"

                // ]
 




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



                //Populates each infoWindow with the appropriate text and links.
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
                    infoWindow.open(map, marker);
                });

                markerHolder.push({
                    marker,
                    event: allEvents[candidate][i],
                    candidate: candidate,
                    // candidate: allEvents[candidate][i].organization.candidate_name,

                })
                fullListOfEvents.push(allEvents[candidate][i])

                
            }
        }
    }
    addMarkersCreateArray();


    let updateMap = function(map){
        for(var i = 0; i < markerHolder.length; i++){
            if(markerHolder[i].candidate === "warrenEvents" && candidateIsVisible['elizabethWarren'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "yangEvents" && candidateIsVisible['andrewYang'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "bidenEvents" && candidateIsVisible['joeBiden'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "buttigiegEvents" && candidateIsVisible['peteButtigieg'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "harrisEvents" && candidateIsVisible['kamalaHarris'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "klobucharEvents" && candidateIsVisible['amyKlobuchar'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "bookerEvents" && candidateIsVisible['coryBooker'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "sandersEvents" && candidateIsVisible['bernieSanders'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].candidate === "steyerEvents" && candidateIsVisible['tomSteyer'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else{
                // console.log('fail case: ', markerHolder[i])
                markerHolder[i].marker.setMap(null)
            }
            // markerHolder[i].setMap(map);
        }
    }
    // updateMap(map);    call this on click

    // allEvents[candidate][i].organization.name.includes('Bernie'))
    // markerHolder[157].event.organization.name


    //piopulates map with every single event.  We need to delete this eventually and make
   //iut check dateRangeHolder and candidateIsVisible.
    // function setMapOnAll(map) {
    //     for (var i = 0; i < markerHolder.length; i++) {
    //         markerHolder[i].setMap(map);
    //         checkedAndDateStatus[i] = {
    //             checked: false,
    //             date: fullListOfEvents[i].times[0].start.slice(0,10)
    //         };

    //     }
    // }

    //calls the function setMapOnAll(), iterating through array markerHolder to populate map w/ markers
    // setMapOnAll(map);



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
            let candidateId = event.target.id // somehow get the id of the element that was checked/unchecked
            // let icon = candidates[candidateId].icon
            if(candidateIsVisible[candidateId] === true){
                candidateIsVisible[candidateId] = false
                document.getElementById("selectAll").checked = false;
            }
            else if(candidateIsVisible[candidateId] === false){
                candidateIsVisible[candidateId] = true
                // document.getElementById("selectAll").checked = false;
            }
            updateMap(map)


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
                    let firstDay = fullListOfSelectedDays[0];
                    let lastDay = fullListOfSelectedDays[fullListOfSelectedDays.length - 1];
                    dateRangeHolder.push(firstDay);
                    dateRangeHolder.push(lastDay)




                    //loop through full data set and show only events that fall within the range of fullListOfSelectedDays.
                    for(var i = 0; i < fullListOfEvents.length; i++){
                        let eventDate = fullListOfEvents[i].times[0].start.slice(0,10);
                        if((eventDate < lastDay && eventDate > firstDay) && candidateIsVisible[candidateId] === true){
                            markerHolder[i].marker.setMap(map)
                            // console.log(eventDate + ' falls within the range of ' + firstDay + ' - ' + lastDay);
                        }
                        else{
                            markerHolder[i].marker.setMap(null)
                            // console.log(eventDate + 'DOES NOT fall within the range of ' + firstDay + ' - ' + lastDay);


                        }
                        // console.log(eventDate, firstDay, lastDay);
                    }

                });
            });
        })
    }



    // toggle for all candidates.
    const selectAll = document.getElementById('selectAll')
    selectAll.addEventListener('change', (event) => {

        candidateIsVisible['allCandidates'] = event.target.checked;

        function selectAllCheckboxes() {
            var items = document.getElementsByClassName('candidate-check');
            for (var i = 0; i < items.length; i++) {
                if (items[i].type == 'checkbox')
                    items[i].checked = true;
            }
        }
    
        function UnSelectAllCheckboxes() {
            var items = document.getElementsByClassName('candidate-check');
            for (var i = 0; i < items.length; i++) {
                if (items[i].type == 'checkbox')
                    items[i].checked = false;
            }
        }	

        if(candidateIsVisible['allCandidates'] === true){
            candidateIsVisible['andrewYang'] = true;
            candidateIsVisible['elizabethWarren'] = true;
            candidateIsVisible['joeBiden'] = true;
            candidateIsVisible['peteButtigieg'] = true;
            candidateIsVisible['bernieSanders'] = true;
            candidateIsVisible['kamalaHarris'] = true;
            candidateIsVisible['amyKlobuchar'] = true;
            candidateIsVisible['coryBooker'] = true;
            candidateIsVisible['tomSteyer'] = true;
            selectAllCheckboxes()
        }
        else if (candidateIsVisible['allCandidates'] === false){
            candidateIsVisible['andrewYang'] = false;
            candidateIsVisible['elizabethWarren'] = false;
            candidateIsVisible['joeBiden'] = false;
            candidateIsVisible['peteButtigieg'] = false;
            candidateIsVisible['bernieSanders'] = false;
            candidateIsVisible['kamalaHarris'] = false;
            candidateIsVisible['amyKlobuchar'] = false;
            candidateIsVisible['coryBooker'] = false;
            candidateIsVisible['tomSteyer'] = false;
            UnSelectAllCheckboxes()
        }
        updateMap(map)
    })








    //onclicl, loop through candidateIsVisible and dateRangeHolder
    //if candidate is visible, display it, else do not
    //loop through all events.  If the date doesn't fall within range, hide it.
}