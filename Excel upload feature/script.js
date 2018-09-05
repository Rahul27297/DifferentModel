/* set up XMLHttpRequest */

//Get the URL from firebase storage

var url = "https://firebasestorage.googleapis.com/v0/b/differentmodel-5b6b0.appspot.com/o/test.xlsx?alt=media&token=400fc147-c47e-4c42-8127-1971804e3252";
var oReq = new XMLHttpRequest();

oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
oReq.onload = function(e) {
    var arraybuffer = oReq.response;
        console.log("hi")
    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {type:"binary"});

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
    var temp = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    for (x in temp) {
        console.log(temp[x]);
        const name = temp[x]["Member Name"];
        const email = temp[x]["Email"];
        const flatno = temp[x]["Flat Number"];
        const contact = temp[x]["Contact No."];
        const type = temp[x]["Type"];
    
        console.log(name,email,flatno,contact,type);


        var xhttp2 = new XMLHttpRequest();
        //console.log("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email);
        xhttp2.open("POST","https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email,true);
        xhttp2.send();
        xhttp2.onreadystatechange = function(){
            if ( this.readyState == 4 && this.status == 200){
                console.log("Member Successfully Added");
            }
        }


        
    }





}

oReq.send();










