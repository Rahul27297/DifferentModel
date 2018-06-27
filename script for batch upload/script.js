var storage = firebase.storage();
var storageRef = storage.ref('/')



function smartSociety(){
    var addMembersBtn = document.getElementById("addMembersBtn");
    addMembersBtn.addEventListener('click',this.addMembers.bind(this));
    console.log("script running");  


    
}


smartSociety.prototype.addMembers = function(){


  // file uploaded to this path in storage
  storageRef.child('/societies/1/members.json').getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
    console.log("hello")
    // This can be downloaded directly:

    var myJSONobj = {}

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
      var reader = new FileReader();
      reader.readAsText(blob);

      reader.onload = function(e){
        console.log(typeof reader.result)
        var res = JSON.parse(reader.result);
        myJSONobj = res.members;  // access members from json obj which is formatted as {members: ...}
        console.log(res);
        console.log(reader.result)            // Contents of the file
        console.log(myJSONobj)            // Contents of the file

        for(var member in myJSONobj){
          console.log(myJSONobj[member])
          name = myJSONobj[member].name;
          contact = myJSONobj[member].contact;
          email = myJSONobj[member].email;
          flatno = myJSONobj[member].flatno;
          type = myJSONobj[member].type;
  
          var xhttp2 = new XMLHttpRequest();
          //console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
          xhttp2.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email,true);
          xhttp2.send();
          xhttp2.onreadystatechange = function(){
              if ( this.readyState == 4 && this.status == 200){
                  console.log("Member Successfully Added")
              }
          }
        }

      }

    };
    xhr.open('GET', url);
    xhr.send();

  }).catch(function(error) {
    // Handle any errors
    console.log(error)
  });


}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
