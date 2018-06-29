var ref = firebase.database().ref("/Members/")


function smartSociety(){
    var addNoticeBtn = document.getElementById("addNoticeBtn");
    addNoticeBtn.addEventListener('click',this.addNotice.bind(this));
    console.log("hrllo");
}


smartSociety.prototype.addNotice = function(){
    console.log("button working");


}


window.onload = function(){
    window.smartSociety = new smartSociety();
};
