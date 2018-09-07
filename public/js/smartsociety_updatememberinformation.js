var ref = firebase.database().ref("/Members/")



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
    if(!name){
        name="yoo";
    }
    var type = "owner"; //by default
    if(document.getElementById("owner").checked){
		var type = "owner";
	}
	else if(document.getElementById("tenant").checked){
		var type = "tenant";
	}
	else if(document.getElementById("admin").checked){
		var type = "admin";
    }
    
    console.log(name,email,email2,contact,flatno,type);

    console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email,true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if ( this.readyState == 4 && this.status == 200){
            window.alert("Member Successfully Added")
        }
    }






}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
