const express = require('express');
const app = express();
const appRouter = express.Router();

const https = require('https');

const port = process.env.PORT || 3031;

const googleApi = process.env.GOOGLE_API || 'https://maps.googleapis.com/maps/api/directions/json?';
const googleApiKey = process.env.GOOGLE_KEY;
const toWorkURL = process.env.TO_WORK || 'origin=8651+46TH+AVE+SW+Seattle+WA&destination=223+W+Galer+St+Seattle+WA&mode=driving&departure_time=now'
const fromWorkURL = process.env.FROM_WORK || 'origin=223+W+Galer+St+Seattle+WA&destination=8651+46TH+AVE+SW+Seattle+WA&mode=driving&departure_time=now'
const TO_FROM_HOUR = 12;

appRouter.route('/b6097afbe0a4472ab40eefabcc9d246e')
    .get((req, res) => {
        let urlString = googleApi + toWorkURL + '&key=' + googleApiKey;

        let now = new Date(Date.now());
		if (now.getHours() > TO_FROM_HOUR) {
            urlString = googleApi + toWorkURL + '&key=' + googleApiKey;
        } else {
            urlString = googleApi + fromWorkURL + '&key=' + googleApiKey;
        }
        
        let data = '';
        console.log('URL used to create request: ' + urlString);
        https.get(urlString, (resp) => {
            
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log('Data from requested URL: ' + data);  // for debugging
                console.log('Data length (in characters) received from requested URL: ' + data.length);
                res.send(data);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    });
app.use('/api', appRouter);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});