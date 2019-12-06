window.onload = onPageLoad();


function onPageLoad() {
  document.getElementById("selectAll").checked = false;
}

let currentDateYearFirst = new Date().toJSON().slice(0,10).replace(/-/g,'/');
let currentYear = currentDateYearFirst.slice(0,4);
let currentMonthDay = currentDateYearFirst.slice(5);
let currentDate = currentMonthDay + '/' + currentYear

let fullListOfEvents = [];
let markerHolder = []; 

// let eventDate = [];

// let checkedAndDateStatus = []
let dateRangeHolder = [];  //[new Date(), new Date()]


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

function initMap(){
    window.mapReady = true;
    if (window.dataLoaded === true) {
        runApp()
    }
}

window.dataReady = function (){
    window.dataLoaded = true;
    if (window.mapReady === true) {
        runApp()
    }
}


function runApp(){
    // console.log(window.fetchedData); // all the canidates data in an array same order as you fetched it in
    const allData = window.fetchedData;

    // console.log(allData[0].data[0])
    // console.log(allData[6].data[0])
    // sponser.candidate_name


    // The location of DC
    let washingtonDC = {lat: 38.8977, lng: -77.036560};
    // The geographic center of the contiguous United States
    let centerOfUSA = {lat: 39.8282, lng: -98.5795};

    // Create map, centered at Washington D.C.
    let map = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 4, center: centerOfUSA},
    );

    let candidatePhotoURL = '';
    let eventURLString = '';
    let titleForPopup = '';

    // const markerHolders = lookthroughEvents(addData)
    // let filters = {canidateFilters, dateRange}

    // setUpDateSelector(filters, updateMap)
    // setupCanidateFilter(filters, updateMap)




    //ONLY ADD CODE TO THIS VERSION.
    let lookThroughEachEvent = function(){
        for(var i = 0; i < allData.length; i++){
            for(var j = 0; j < allData[i].data.length; j++){
                // Assigns the correct icon picture and event URL to each event.
                if(allData[i].data[j].sponsor.candidate_name === 'Elizabeth Warren'){
                    candidatePhotoURL = 'candidatePhotos/Warren100px.png';
                    eventURLString = 'https://www.mobilize.us/elizabethwarren/event/' + allData[i].data[j].id + '/';
                } 
                else if(allData[i].data[j].sponsor.candidate_name === 'Andrew Yang'){
                    candidatePhotoURL = 'candidatePhotos/Yang100px.png';
                    eventURLString = 'https://www.mobilize.us/yang2020/event/' +  allData[i].data[j].id + '/';
                }
                else if(allData[i].data[j].sponsor.candidate_name === 'Joe Biden'){
                    candidatePhotoURL = 'candidatePhotos/Biden100px.png';
                    eventURLString = 'https://www.mobilize.us/joebiden/event/' + allData[i].data[j].id + '/';
                }
                else if(allData[i].data[j].sponsor.candidate_name === 'Pete Buttigieg'){
                    candidatePhotoURL = 'candidatePhotos/Buttigieg100px.png';
                    eventURLString = 'https://www.mobilize.us/peteforamerica/event/' +  allData[i].data[j].id + '/';
                }
                else if(allData[i].data[j].sponsor.candidate_name === 'Amy Klobuchar'){
                    candidatePhotoURL = 'candidatePhotos/Klobuchar100px.png';
                    eventURLString = 'https://www.mobilize.us/amyklobuchar/event/' + allData[i].data[j].id + '/';
                }
                else if(allData[i].data[j].sponsor.candidate_name === 'Tom Steyer'){
                    candidatePhotoURL = 'candidatePhotos/Steyer100px.png';
                    eventURLString = 'https://events.tomsteyer.com/event/' + allData[i].data[j].id + '/';
                }
                else if(allData[i].data[j].sponsor.event_feed_url.includes('sanders')){
                    candidatePhotoURL = 'candidatePhotos/Sanders100px.png'
                    eventURLString = 'https://events.berniesanders.com/event/' + allData[i].data[j].id + '/';
                }
                else if(allData[i].data[j].sponsor.slug === 'corybooker'){
                    candidatePhotoURL = 'candidatePhotos/Booker100px.png';
                    eventURLString = 'https://www.mobilize.us/corybooker/event/' + allData[i].data[j].id + '/';
                }
                //need to add Harris (?)
                else{
                    console.log('No Candidate Found ' + JSON.stringify(allData[i].data[j]))
                }

                    //  FIX THE CODE BELOW TO WORK WITH API DATA


                //assigns the correct title for each infoWindow popup (one per marker)
                if(allData[i].data[j].sponsor.candidate_name){
                    titleForPopup = allData[i].data[j].sponsor.candidate_name;
                }
                else if(allData[i].data[j].sponsor.event_feed_url.includes('sanders')){
                    titleForPopup = 'Bernie Sanders'
                }
                else if(allData[i].data[j].sponsor.slug === 'corybooker') {
                    titleForPopup = 'Cory Booker'
                }


                // console.log(allData[i].data[j].location.address_lines[0] === null)
                // let location = '';

                // if(allData[i].data[j].location.address_lines[0] !== null){
                //     location = allData[i].data[j].location.address_lines[0]
                // } else {
                //     location = 'SORRY FOLKS, WALLY WORLDS CLOSED'
                // }


                // console.log(allData[i].data[j].location['venue'])
                // console.log(allData[i].data[j].location)



                //Populates each infoWindow with the appropriate text and links.
                let contentString = 
                '<div id="content">'+
                '<div id="eventDescription">'+
                '</div>'+
                `<h1 id="firstHeading" class="firstHeading">${titleForPopup}</h1>`+
                '<div id="bodyContent">'+
                `<p><b></b>Event: ${allData[i].data[j].title}<br>`+
                `Date: ${new Date(allData[i].data[j].timeslots[0].start_date * 1000)}<br>`+
                // `Location: ${location}<br><br>`+
                // ${allEvents[candidate][i].address_line1}, ${allEvents[candidate][i].city}, ${allEvents[candidate][i].state} ${allEvents[candidate][i].zipcode}<br><br>`+
                `${allData[i].data[j].description}<br><br>`+
                `<a target="_blank" href=${eventURLString}>Click Here to Learn More</a>`+
                '</div>'+
                '</div>';
                
                //creates the infoWindow.
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                // console.log(allData[i].data[j])

                if(allData[i].data[j].location === null){
                    console.log('datapoint is null');
                    continue;
                }
                if(allData[i].data[j] === undefined){
                    console.log('datapoint is undefined');
                    continue;
                }
                //If the event data exists, and neither the lat nor lon === null, we set the marker, listener, etc.
                if(allData[i].data[j].location.location !== undefined && allData[i].data[j].location.location.latitude !== null && allData[i].data[j].location.location.longitude !== null){
                    let latitude = allData[i].data[j].location.location.latitude;
                    let longitude = allData[i].data[j].location.location.longitude;
                    let eventPosition = {lat: latitude, lng: longitude};
                    // console.log(eventPosition)

                    let marker = new google.maps.Marker({
                        position: eventPosition,
                        icon: {
                            url: candidatePhotoURL
                        },
                    });

                    marker.addListener('click', function() {
                        infoWindow.open(map, marker);
                    });

                    markerHolder.push({
                        marker,
                        event: allData[i].data[j],
                        candidate: allData[i],

                    })  
                    // eventDate.push(allData[i].data[j].timeslots[0].start_date);
                    fullListOfEvents.push(allData[i].data[j])
                }
            }
        }
    }
    lookThroughEachEvent();


    // console.log(markerHolder[0].event.sponsor.candidate_name) //candidate name
    // console.log(new Date(markerHolder[0].event.timeslots[0].start_date * 1000))


    let setMarkers = function(map){
        for(var i = 0; i < markerHolder.length; i++){


            let eventDate = new Date(markerHolder[0].event.timeslots[0].start_date * 1000);
            let firstDateFromCalendar = dateRangeHolder[0];
            let secondDateFromCalendar = dateRangeHolder[1];

            if (eventDate <= firstDateFromCalendar || eventDate >= secondDateFromCalendar) {
                markerHolder[i].marker.setMap(null)
                continue;
            }
            if(markerHolder[i].event.sponsor.candidate_name === "Elizabeth Warren" && candidateIsVisible['elizabethWarren'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].event.sponsor.candidate_name === "Andrew Yang" && candidateIsVisible['andrewYang'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].event.sponsor.candidate_name === "Joe Biden" && candidateIsVisible['joeBiden'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].event.sponsor.candidate_name === "Pete Buttigieg" && candidateIsVisible['peteButtigieg'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].event.sponsor.candidate_name === "Amy Klobuchar" && candidateIsVisible['amyKlobuchar'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].event.sponsor.slug === "corybooker" && candidateIsVisible['coryBooker'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if((markerHolder[i].event.sponsor.name.includes('Bernie') || markerHolder[i].event.sponsor.name.includes('Sanders')) && candidateIsVisible['bernieSanders'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else if(markerHolder[i].event.sponsor.candidate_name === "Tom Steyer" && candidateIsVisible['tomSteyer'] === true){
                markerHolder[i].marker.setMap(map)
            }
            else {
                markerHolder[i].marker.setMap(null)
            }
        }
    }
    















































    




    // let updateMap = function(map){
    //     for(var i = 0; i < markerHolder.length; i++){
    //         // let eventDate = fullListOfEvents[i].times[0].start.slice(0,10);
    //         //must make eventDate an actual date that can be compared to firstDateFromCalendar & secondDateFromCalendar
    //         // let eventDate = new Date(allData[i].data[j].timeslots[0].start_date)

    //         let eventDate = (eventDate[i]);
    //         let firstDateFromCalendar = dateRangeHolder[0];
    //         let secondDateFromCalendar = dateRangeHolder[1];


    //         // if (eventDate <= firstDateFromCalendar || eventDate >= secondDateFromCalendar) {
    //         //     markerHolder[i].marker.setMap(null)
    //         //     continue;
    //         // }

    //         // if(markerHolder[i].candidate === "warrenEvents" && candidateIsVisible['elizabethWarren'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "yangEvents" && candidateIsVisible['andrewYang'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "bidenEvents" && candidateIsVisible['joeBiden'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "buttigiegEvents" && candidateIsVisible['peteButtigieg'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "harrisEvents" && candidateIsVisible['kamalaHarris'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "klobucharEvents" && candidateIsVisible['amyKlobuchar'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "bookerEvents" && candidateIsVisible['coryBooker'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "sandersEvents" && candidateIsVisible['bernieSanders'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else if(markerHolder[i].candidate === "steyerEvents" && candidateIsVisible['tomSteyer'] === true){
    //         //     markerHolder[i].marker.setMap(map)
    //         // }
    //         // else{
    //         //     // console.log('fail case: ', markerHolder[i])
    //         //     markerHolder[i].marker.setMap(null)
    //         // }
    //     }
    // }


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
            setMarkers(map)

                // //Hides marker based on the calendar dates
            
        })
    }


    //Allows the selection of two dates from calendar
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
            function clearDateRangeHolder(){
                dateRangeHolder = []
            };
            clearDateRangeHolder();
            dateRangeHolder.push(daylist[0]);
            dateRangeHolder.push(daylist[daylist.length - 1]);
            // console.log(dateRangeHolder)
            setMarkers(map)
            
        });
    });

    const selectAll = document.getElementById('selectAll')
    // toggle for all candidates.
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
        setMarkers(map)
    })















































    // console.log(new Date(allData[0].data[0].timeslots[0].start_date));
    // console.log(allData[0].data[0])
    // console.log(allData[1].data[0])
    // allData[i].data[j].timeslots[0].start_date

    









    //Each function loops through one of the candidates 
    //and populates map with custom marker
    // let addMarkersCreateArray = function (){
    //     for(var candidate in allEvents){


    //         for(var i = 0; i < allEvents[candidate].length; i++){
    //             let candidatePhotoURL = '';
    //             let eventURLString = '';
    //             let candidateNameNoSpaces = (allEvents[candidate][i].organization.candidate_name).toLowerCase().replace(/\s/g,'');

                
    //             //checks which candidate we are looking at, and selects their photo to use as the marker
    //             if(allEvents[candidate][0]['organization']['candidate_name'] === 'Elizabeth Warren'){
    //                 // console.log('Elizabeth Warren');
    //                 candidatePhotoURL = 'candidatePhotos/Warren100px.png';
    //             }
    //             else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Andrew Yang'){
    //                 // console.log('Andrew Yang');
    //                 candidatePhotoURL = 'candidatePhotos/Yang100px.png'
    //             }
    //             else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Joe Biden'){
    //                 // console.log('Joe Biden');
    //                 candidatePhotoURL = 'candidatePhotos/Biden100px.png'
    //             }
    //             else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Pete Buttigieg'){
    //                 // console.log('Pete Buttigieg');
    //                 candidatePhotoURL = 'candidatePhotos/Buttigieg100px.png'
    //             }
    //             else if(allEvents[candidate][i].organization.name.includes('Bernie')){
    //                 // console.log('Bernie Sanders');
    //                 candidatePhotoURL = 'candidatePhotos/Sanders100px.png';
    //                 // eventURLString = 'https://events.berniesanders.com/event/' + allEvents[candidate][i].id + '/';
    //             }
    //             else if(allEvents[candidate][0]['organization'].name.slice(0, 13) === 'Kamala Harris'){
    //                 // console.log('Kamla Haarris');
    //                 candidatePhotoURL = 'candidatePhotos/Harris100px.png'
    //             }
    //             else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Amy Klobuchar'){
    //                 // console.log('Amy Klobuchar');
    //                 candidatePhotoURL = 'candidatePhotos/Klobuchar100px.png'
    //             }
    //             else if(allEvents[candidate][0]['organization'].slug === 'corybooker'){
    //                 // console.log('cory booker');
    //                 candidatePhotoURL = 'candidatePhotos/Booker100px.png';
                    
    //             }
    //             else if(allEvents[candidate][0]['organization']['candidate_name'] === 'Tom Steyer'){
    //                 // console.log('Tom Steyer');
    //                 candidatePhotoURL = 'candidatePhotos/Steyer100px.png'
    //             }
    //             else {
    //                 // console.log('No Candidate Found')
    //             }
    //             if(allEvents[candidate][i].lat === null || allEvents[candidate][i].lon === null){
    //                 continue;
    //             }




    //             //This creates the unique event URL for the candidate in question to be added to each contentString.  
    //             // let eventURLString = '';
    //             // let candidateNameNoSpaces = (allEvents[candidate][i].organization.candidate_name).toLowerCase().replace(/\s/g,'');
            
    //             if(allEvents[candidate][i].organization.name.includes('Bernie')){
    //                 eventURLString = 'https://events.berniesanders.com/event/' + allEvents[candidate][i].id + '/'
    //             }

    //             else if(allEvents[candidate][i].organization.candidate_name === 'Elizabeth Warren' || allEvents[candidate][i].organization.candidate_name === 'Joe Biden' || allEvents[candidate][i].organization.candidate_name === 'Amy Klobuchar'){
    //                 // console.log('this is for ' + allEvents[candidate][i].organization.candidate_name)
    //                 eventURLString = 'https://www.mobilize.us/' + candidateNameNoSpaces + '/event/' + allEvents[candidate][i].id + '/';  
    //             } 
    //             else if(allEvents[candidate][i].organization.name.includes('Kamala Harris') || allEvents[candidate][i].organization.slug.slice(0,6) === 'kamala'){
    //                 // console.log('this is for Kamala')
    //                 eventURLString = 'https://www.mobilize.us/kamalaharris/event/' + allEvents[candidate][i].id + '/'
    //             }
    //             else if(allEvents[candidate][i].organization.candidate_name === 'Cory Booker' || allEvents[candidate][i].organization.slug === 'corybooker' || allEvents[candidate][i].organization.name.slice(0,4) === 'Cory'){
    //                 // console.log('this is for cory booker')
    //                 eventURLString = 'https://www.mobilize.us/corybooker/event/' + allEvents[candidate][i].id + '/';
    //             }
    //             else if (allEvents[candidate][i].organization.candidate_name === 'Tom Steyer'){
    //                 // console.log('this is for tom steyer')
    //                 eventURLString = 'https://events.' + candidateNameNoSpaces + '.com/event/' + allEvents[candidate][i].id + '/';
    //             }
    //             else if (allEvents[candidate][i].organization.candidate_name === 'Pete Buttigieg'){
    //                 // console.log('this is for mayor pete')
    //                 eventURLString = 'https://www.mobilize.us/peteforamerica/event/' +  allEvents[candidate][i].id + '/';
    //             }
    //             else if (allEvents[candidate][i].organization.candidate_name === 'Andrew Yang'){
    //                 // console.log('this is for andrew yang')
    //                 eventURLString = 'https://www.mobilize.us/yang2020/event/' +  allEvents[candidate][i].id + '/';
    //             }





    //             //assigns the correct title for each infoWindow popup (one per marker)
    //             let titleForPopup = '';
    //             if(allEvents[candidate][0].organization.candidate_name){
    //                 titleForPopup = allEvents[candidate][0].organization.candidate_name;
    //             }
    //             else if (allEvents[candidate][i]['organization'].name.slice(0, 13) === 'Kamala Harris'){
    //                 titleForPopup = 'Kamala Harris'
    //             }
    //             else if(allEvents[candidate][i].organization.name.includes('Bernie')){
    //                 titleForPopup = 'Bernie Sanders'
    //             }
    //             else {
    //                 titleForPopup = 'Cory Booker'
    //             }



    //             //Populates each infoWindow with the appropriate text and links.
    //             let contentString = 
    //             '<div id="content">'+
    //             '<div id="eventDescription">'+
    //             '</div>'+
    //             `<h1 id="firstHeading" class="firstHeading">${titleForPopup}</h1>`+
    //             '<div id="bodyContent">'+
    //             `<p><b></b>${allEvents[candidate][i].name}<br><br>`+
    //             `Date: ${allEvents[candidate][i].times[0].start.slice(5, 10)}-${allEvents[candidate][i].times[0].start.slice(0, 4)}<br>`+
    //             `Location: ${allEvents[candidate][i].location_one_line}<br><br>`+
    //             // ${allEvents[candidate][i].address_line1}, ${allEvents[candidate][i].city}, ${allEvents[candidate][i].state} ${allEvents[candidate][i].zipcode}<br><br>`+
    //             `${allEvents[candidate][i].description}<br><br>`+
    //             `<a target="_blank" href=${eventURLString}>Click Here to Learn More</a>`+
    //             '</div>'+
    //             '</div>';
                
    //             //creates the infoWindow.
    //             let infoWindow = new google.maps.InfoWindow({
    //                 content: contentString
    //             });

    //             //Adds a marker for each event to map
    //             let latLonPosition = {lat: allEvents[candidate][i].lat, lng: allEvents[candidate][i].lon};
    //             if(allEvents[candidate][i].lat === null || allEvents[candidate][i].lon === null){
    //                 console.log('ERROR: ' + allEvents[candidate][i] + ' has no lat or lon')
    //             }
    //             let marker = new google.maps.Marker({
    //                 position: latLonPosition,
    //                 icon: {
    //                     url: candidatePhotoURL
    //                 },
    //             });

    //             //Allows user to open infoWindow popups with more info when they click a candidate's marker
    //             marker.addListener('click', function() {
    //                 infoWindow.open(map, marker);
    //             });

    //             markerHolder.push({
    //                 marker,
    //                 event: allEvents[candidate][i],
    //                 candidate: candidate,
    //                 // candidate: allEvents[candidate][i].organization.candidate_name,

    //             })
    //             fullListOfEvents.push(allEvents[candidate][i])

                
    //         }
    //     }
    // }
    // addMarkersCreateArray();





    //-------------------------------------------------------------------------




    //calls the function setMapOnAll(), iterating through array markerHolder to populate map w/ markers
    // setMapOnAll(map);

}