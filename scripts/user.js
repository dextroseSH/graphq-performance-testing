import http from 'k6/http';
import { sleep } from 'k6';

import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

let query = `
query{getUser(id:35){id, username, firstName, lastName, email, role, age, contraceptive, hasCycle{id, start, end}, hasSymptom{id, date, pain, symptom}}}`;

let headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQWR2ZXJ0aXNlciJ9.Ey1wKGi0d9j_5xK8KLmV46RVxhZen2Li6HVbNPqlN1c`, //Advertiser
    'Content-Type': 'application/json',
};

export let options = {

    vus: 10,
    duration: '1s',

};

export default function () {
    let res = http.post('http://localhost:4000', JSON.stringify({query: query}),{headers: headers});
    if(res.status != 200) {
        console.error("Could not send summary, got status " + res.status);
    }
    sleep(10);
}

export function handleSummary(data) {

    return {

        'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...

        //'../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...

        //'summary.json': JSON.stringify(data), // and a JSON with all the details...
    }

}
