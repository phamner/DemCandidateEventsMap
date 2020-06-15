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
    let address = '';
    let city = '';
    let state = '';
    let venue = ''


    // const markerHolders = lookthroughEvents(addData)
    // let filters = {canidateFilters, dateRange}

    // setUpDateSelector(filters, updateMap)
    // setupCanidateFilter(filters, updateMap)




    //ONLY ADD CODE TO THIS VERSION.
    let  = function(){
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




                if(!allData[i].data[j].location){
                    address = 'no data';
                    // console.log(venue)
                } else {
                    address = allData[i].data[j].location.address_lines;
                    city = allData[i].data[j].location.locality;
                    state = allData[i].data[j].location.region;
                    // venue = allData[i].data[j].location.venue;
                }

                //Populates each infoWindow with the appropriate text and links.
                let contentString = 
                '<div id="content">'+
                '<div id="eventDescription">'+
                '</div>'+
                `<h1 id="firstHeading" class="firstHeading">${titleForPopup}</h1>`+
                '<div id="bodyContent">'+
                `<p><b></b>Event: ${allData[i].data[j].title}<br>`+
                `Date: ${new Date(allData[i].data[j].timeslots[0].start_date * 1000)}<br>`+
                `Location: ${address + ' ' + city + ' ' +state}<br><br>`+
                // `Venue: ${venue}<br><br>`+
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
    createMarkersForEachEvent();


    // console.log(markerHolder[0].event.sponsor.candidate_name) //candidate name
    // console.log(new Date(markerHolder[0].event.timeslots[0].start_date * 1000))


    let setMarkers = function(map){
        for(var i = 0; i < markerHolder.length; i++){
            // console.log(new Date(markerHolder[i].event.timeslots[0].start_date * 1000))

            let eventDate = new Date(markerHolder[i].event.timeslots[0].start_date * 1000);
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

}