
// CSV to JSON conversion

// Source: http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}

function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
}

$("#convert").click(function() {
    var csv = $("#csv").val();
    var json = CSV2JSON(csv);
    $("#json").val(json);
});

$("#download").click(function() {
    var csv = $("#csv").val();
    var json = CSV2JSON(csv);
    window.open("data:text/json;charset=utf-8," + escape(json))
});




//CSV to JSON conversion end

//Read file 

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}






var ref = firebase.database().ref("/Members/")







// validate if email is in correct form
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function smartSociety(){
    var addMemberBtn = document.getElementById("send");
    addMemberBtn.addEventListener('click',this.addMember.bind(this));
    console.log("hello");
    tst = readTextFile("data.csv");

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
            //console.log(memberInfo);


            var totalMemberCount = Object.keys(memberInfo).length;
            //console.log(size)

            if(totalMemberCount!=0){
                window.alert("Member with given email ID already exists. Select a different email ID");
            }
            else{
                console.log("in addition")

                // adding member using create member cloud function
                var xhttp2 = new XMLHttpRequest();
                //console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
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
