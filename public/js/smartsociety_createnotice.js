var ref = firebase.database().ref("/Members/")


function smartSociety(){
    var saveNoticeBtn = document.getElementById("saveNoticeBtn");
    saveNoticeBtn.addEventListener('click',this.saveNotice.bind(this));
    console.log("hrllo");
}


smartSociety.prototype.saveNotice = function(){
    console.log("button working");


}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
