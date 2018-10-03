var ref = firebase.database().ref("/Members/")



function smartSociety(){
    var loginBtn = document.getElementById("send");
    loginBtn.addEventListener('click',this.adminAuth.bind(this));
    //console.log("hrllo")
}


smartSociety.prototype.adminAuth = function(){
    
    const email = document.getElementById('inpemail').value;
    const password = document.getElementById('inppass').value;



    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        localStorage.setItem("email",email);
        localStorage.setItem("password",password);
        console.log(localStorage.getItem("email"));

        console.log(localStorage.getItem("password"));
        window.location.replace('./gentelella-master/production/SmartSociety.html');
    })

    .catch(function(error) {
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //bootbox.alert(errorMessage);
            console.log("err")
        });




}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
