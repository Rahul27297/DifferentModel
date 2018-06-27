var ref = firebase.database().ref("/Members/")


// validate if email is in correct form
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function smartSociety(){
    var addMemberBtn = document.getElementById("send");
    addMemberBtn.addEventListener('click',this.addMember.bind(this));
    console.log("hrllo")
}


smartSociety.prototype.addMember = function(){
    var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var email2 = document.getElementById("email2").value;
	var contact = document.getElementById("contactnumber").value;
    var flatno = document.getElementById("flatno").value;
    console.log(name,email,email2,contact,flatno);

    

    if(name==""){
        window.alert("Please enter your name");
        document.getElementById("name").focus();
        return false;
    }
    if(email==""){
        window.alert("Please enter your email");
        document.getElementById("email").focus();
        return false;
    }
    if(email2==""){
        window.alert("Please confirm your email");
        document.getElementById("email").focus();
        return false;
    }
    if(contact==""){
        window.alert("Please enter your contact number");
        document.getElementById("contact").focus();
        return false;
    }
    if(flatno==""){
        window.alert("Please enter your Flat number");
        document.getElementById("flatno").focus();
        return false;
    }


    // Check if confirmed email address is same
    if(email!=email2){
        window.alert("Email ID doesn't match");
        return false;
    }

    // Check if email ID entered is in valid form
    if(!validateEmail(email)){
        window.alert("Enter valid Email ID")
        return false;
    }


    var type = ""; 

    // '.' is used a separator

    if(document.getElementById("admin").checked){
		type += "admin.";
    }
    if(document.getElementById("tenant").checked){
		type += "tenant";
	}
	else if(document.getElementById("owner").checked){
		type += "owner";
    }
    
    // by default type is owner
    if(type==="" || type==="admin."){
        type += "owner";
    }
    console.log(type)


    // Check if email ID is already present in the database by using search cloud function

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/searchMember"+"?societyID=1"+"&email="+email,true);
    xhttp.send();
    console.log("here");
    xhttp.onreadystatechange = function(){
        if ( this.readyState == 4 && this.status == 200){
            console.log(xhttp.responseText);

            const memberInfo = JSON.parse(xhttp.responseText).member;
            if(memberInfo!=null){
                window.alert("Member with given email ID already exists. Select a different email ID");
    
            }
            else{
                console.log("in addition")

                // adding member using create member cloud function
                var xhttp2 = new XMLHttpRequest();
                console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
                xhttp2.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email,true);
                xhttp2.send();
                xhttp2.onreadystatechange = function(){
                    if ( this.readyState == 4 && this.status == 200){
                        window.alert("Member Successfully Added")
                    }
                }
            }
           

        }
    }

    //console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
    


}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
