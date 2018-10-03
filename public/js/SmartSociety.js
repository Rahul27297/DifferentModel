$("#logout").click(function(){
    console.log("hi");
    localStorage.removeItem("email");
    window.location.replace('../../index.html');

})