import http from 'k6/http';

import { sleep } from 'k6';

import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export default function () {

  http.get('https://test.k6.io');

  sleep(1);

}

export function handleSummary(data) {

    return {

        'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...

        //'../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...

        'summary.json': JSON.stringify(data), // and a JSON with all the details...
    }

}
