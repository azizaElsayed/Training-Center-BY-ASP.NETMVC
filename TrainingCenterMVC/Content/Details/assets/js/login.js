// JavaScript source code

///==========---------- Getting all arrays from Local Storage And Parse Them to be able to work on them ----------==========///
if (localStorage.getItem("names") != null && localStorage.getItem("passwords") != null && localStorage.getItem("userType") != null) {
    var names = localStorage.getItem("names");
    names = JSON.parse(names);
    var passwords = localStorage.getItem("passwords");
    passwords = JSON.parse(passwords);
    var userType = localStorage.getItem("userType");
    userType = JSON.parse(userType);
}

//-------------------define object class User------------------
function User(_id, _userName, _userPassword, _userType) {
    this.id = _id;
    this.userName = _userName;
    this.userPassword = _userPassword;
    this.userType = _userType;
}

var usersGroup = [];

for (var i = 0; i < userType.length; i++) {
    usersGroup.push(new User(i + 1, names[i], passwords[i], userType[i]));
}

//console.log(usersGroup);

$(function() {
    //---------- Create Flag To Know If User Existes in My Array Or Not ---------------------------
    var routeToWebSiteHomePage = window.location.origin + "/index.html";
    var userNameInputText = $(".input100[type='text']");
    var userPassInputPass = $(".input100[type='password']");
    var errorUserName = $(".input100[type='text']");
    var Storage = window.localStorage;

    //-----------------When Clicked Login Check if i had userName And Password In My AbjArray To Make Him LogIn Or Regester------------------ 
    $("#login100-form").submit(function(e) {
        var userNameIsOk = $.inArray(userNameInputText.val(), names);
        var userPassIsOk = $.inArray(userPassInputPass.val(), passwords);
        if (userNameIsOk == -1 && userPassIsOk == -1) {
            //alert("The problem is here ");
            e.preventDefault();
            errorUserName.val("User name Or password are incorrect or did not Exist");
            errorUserName.css({
                "font-size": "13px",
                "color": "#DC3545"
            });
            errorUserName.focus(function() {
                errorUserName.val("");
                errorUserName.css({
                    "font-size": "18px",
                    "color": "#333333"
                });
            });
        } else {
            $("#login100-form").attr('action', routeToWebSiteHomePage);
            //----------------= chesck Storage And Add Date userName & user Type 
            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem("logedInUserName", userNameInputText.val());
                localStorage.setItem("logedInUserType", userType[names.indexOf(userNameInputText.val())]);

            } else {
                //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
            }
        }
    });
});