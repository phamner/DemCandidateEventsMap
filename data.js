
const idNumberForEachCampaign = [
    1310, //warren
    1396, //yang
    1393, //Biden
    1477, //Buttigieg
    1684, //Harris
    1581, //Klubachar
    1270, //booker
    1653, //steyer
    1771, //sanders
];




(async function() {
    window.fetchedData = await Promise.all([


        fetch('https://api.mobilize.us/v1/events?organization_id=1316&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Warren
        fetch('https://api.mobilize.us/v1/events?organization_id=1396&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Yang
        fetch('https://api.mobilize.us/v1/events?organization_id=1393&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Biden
        fetch('https://api.mobilize.us/v1/events?organization_id=1297&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Buttigieg
        fetch('https://api.mobilize.us/v1/events?organization_id=1576&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Klubachar  HAVING PROBLEMS, only displays 10ish events
        fetch('https://api.mobilize.us/v1/events?organization_id=1270&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Booker     HAVING PROBLEMS, only displays 10ish events
        fetch('https://api.mobilize.us/v1/events?organization_id=1653&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//steyer     HAVING PROBLEMS, only displays 10ish events
        fetch('https://api.mobilize.us/v1/events?organization_id=1767&per_page=100&timeslot_start=gte_now').then((response) => response.json()),//Sanders


    ]);
    window.dataReady();



}());




