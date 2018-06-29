var admin = require('firebase-admin');

var serviceAccount = ('./differentmodel-5b6b0-firebase-adminsdk-enuxy-bb1f4f3a85.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

admin.auth().createCustomToken(uid)

.then(function(customToekn) => {
    // send token back to client
})
.catch(function(error){
    //
})


