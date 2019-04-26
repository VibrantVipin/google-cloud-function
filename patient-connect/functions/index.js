const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const responses = require('./responses');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    var session = request.body.session;
    var sessionArray = session.split("/"); 
    const sessionId = sessionArray[sessionArray.length -1];
    var queryResult = request.body.queryResult;
    const dialogflowAgentRef = db.collection('users').doc(sessionId);
    
    function welcomeIntent(agent) {
        console.log('Dialogflow welcomeIntent Request body: ' + JSON.stringify(request.body));
        const queryText = queryResult.queryText;
        var queryResponse = responses.welcomeIntentResponse;
        var resObject = {
            query: queryText,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.set(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }

    function numberIntent(agent) {
        console.log('Dialogflow numberIntent Request body: ' + JSON.stringify(request.body));
        const queryText = queryResult.queryText;
        const number = queryResult.parameters.number;
        var queryResponse = `Thank you ${ responses.numberIntentResponse }`;
        var resObject = {
            query: queryText,
            number: number,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, {number: number, history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }

    function userIntent(agent) {
        console.log('Dialogflow userIntent Request body: ' + JSON.stringify(request.body));
        const queryText = queryResult.queryText;
        const name = queryResult.parameters.name;
        var queryResponse = `Thank you ${ name } ${ responses.userIntentResponse }`;
        var resObject = {
            query: queryText,
            name: name,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }

    function problemIntent() {
        console.log('Dialogflow problemIntent Request body: ' + JSON.stringify(request.body));
        const queryText = queryResult.queryText;
        var problem = queryResult.parameters.kidney;
        var queryResponse = `${ responses.problemIntentResponse} ${ problem[0] } problem?`;
        var resObject = {
            query: queryText,
            problem: problem,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }
    
    function problemDurationIntent() {
        console.log('Dialogflow problemDurationIntent Request body: ' + JSON.stringify(request.body));
        const queryText = queryResult.queryText;
        var duration = queryResult.parameters.duration;
        var queryResponse = responses.problemDurationIntentResponse;
        var resObject = {
            query: queryText,
            duration: duration,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }
    
    function doctorIntent() {
        console.log('Dialogflow doctorIntent Request body: ' + JSON.stringify(request.body));

        const queryText = queryResult.queryText;
        var queryResponse = responses.doctorIntentResponse;
        var resObject = {
            query: queryText,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }

    function yesIntent() {
        console.log('Dialogflow yesIntent Request body: ' + JSON.stringify(request.body));

        const queryText = queryResult.queryText;
        var queryResponse = responses.yesIntent;
        var resObject = {
            query: queryText,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }

    function noIntent() {
        console.log('Dialogflow noIntent Request body: ' + JSON.stringify(request.body));

        const queryText = queryResult.queryText;
        var queryResponse = responses.noIntent;
        var resObject = {
            query: queryText,
            queryResponse: queryResponse
        };
        // Get the database collection 'users' and document 'sessionId' and store
        // the document  {entry: "<value of database entry>"} in the 'sessionId' document
        return db.runTransaction(t => {
            t.update(dialogflowAgentRef, { history: admin.firestore.FieldValue.arrayUnion(resObject)});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log('Sending response to Agent: ' + queryResponse);
            agent.add(queryResponse);
            return Promise.resolve();
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            return Promise.reject(err);
        });
    }

    // Map from Dialogflow intent names to functions to be run when the intent is matched
    let intentMap = new Map();

    intentMap.set('WelcomeIntent', welcomeIntent);
    intentMap.set('PhoneNumberIntent', numberIntent);
    intentMap.set('UserIntent', userIntent);
    intentMap.set("ProblemIntent", problemIntent);
    intentMap.set("ProblemDurationIntent", problemDurationIntent);
    intentMap.set("DoctorIntent", doctorIntent);
    intentMap.set("DoctorIntent-no", noIntent);
    intentMap.set("DoctorIntent-yes", yesIntent);
    intentMap.set("DoctorIntentNo", noIntent);

    agent.handleRequest(intentMap);
});

exports.patientConnect = functions.https.onRequest((req, res) => {
    var users = [];
    if(req.method === 'GET' && req.path === '/users') {
        var usersRef = db.collection('users');
        var allUsers = usersRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                users.push(doc.data());
            });
            console.log('getAllUsers: ' + JSON.stringify(users));
            res.header('Access-Control-Allow-Origin', '*');
            res.send(users);
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.header('Access-Control-Allow-Origin', '*');
            res.send(404);
        });
    }
});