import http from 'k6/http';
import { sleep } from 'k6';

import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

let query = `
query{getUser(id:35){id, username, firstName, lastName, email, role, age, contraceptive, hasCycle{id, start, end}, hasSymptom{id, date, pain, symptom}}}`;

let headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQWR2ZXJ0aXNlciJ9.PfL7eg5CCcPIz31Fuo8SLIR_BQADcQ99cft2vlVumbY`, //Advertiser
    'Content-Type': 'application/json',
};

export let options = {

    vus: 500,
    duration: '30s',

};

export default function () {
    let res = http.post('https://peng-without-directives.azurewebsites.net', JSON.stringify({query: query}),{headers: headers});
    if(res.status != 200) {
        console.error("Could not send summary, got status " + res.status);
    }
    if(res.json().errors){
        console.log("Error in server side happend.");
    }
    sleep(1);
}

export function handleSummary(data) {

    return {

        'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...

        //'../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...

        //'summary.json': JSON.stringify(data), // and a JSON with all the details...
    }

}
