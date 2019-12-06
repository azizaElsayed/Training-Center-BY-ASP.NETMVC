// JavaScript source code
var Storage = window.localStorage;
//localStorage.clear();

///==========---------- Getting all arrays from Local Storage And Parse Them to be able to work on them ----------==========///
if (localStorage.getItem("names") != null && localStorage.getItem("passwords") != null && localStorage.getItem("userType") != null) {
    var names = localStorage.getItem("names");
    names = JSON.parse(names);
    var passwords = localStorage.getItem("passwords");
    passwords = JSON.parse(passwords);
    var userType = localStorage.getItem("userType");
    userType = JSON.parse(userType);
}

$(function() {


    var routeToWebSiteLoginPage = window.location.origin + "/login/index.html";

    var regUserName = $("#name");
    var regUserPassword = $("#password");
    var regUserRe_Password = $("#re_password");
    var radios = $(".form-group input[type='radio']");
    var errorName = $("#errorName");
    var errorPass = $("#errorPass");
    var errorRePass = $("#errorRePass");
    ///==========---------- at first run the array will be null and that will make error so we handle ----------==========///
    ///==========----------   that here by adding first static element who is admain by the way ----------==========///
    if (names == null || passwords == null || userType == null) {
        names = ["mostafa"];
        passwords = ["mostafa"];
        userType = ["0"];

        localStorage.setItem("names", JSON.stringify(names));
        localStorage.setItem("passwords", JSON.stringify(passwords));
        localStorage.setItem("userType", JSON.stringify(userType));
    }



    ///==========---------- when click submit button what will happened ----------==========///
    $("#signup-form").submit(function(e) {
        if (isValidPassword() && isValidUserName() && isUserNameExist() && isValidRePassword()) {
            addToLocalStorage();
            $('#signup-form').attr('action', routeToWebSiteLoginPage);
        } else {
            e.preventDefault();
            if (!isUserNameExist()) {
                errorName.text("This user is already exist..! Try Again");
                errorName.css("display", "block");
            }
            if (!isValidUserName()) {
                errorName.text("Name must be at least 6 charecters & not more than 10");
                errorName.css("display", "block");
            }
            if (!isValidPassword()) {
                errorPass.text("Password must be at least 6 charecters & not more than 10");
                errorPass.css("display", "block");
            }
            if (!isValidRePassword()) {
                errorRePass.text("Two passwords must be equaled");
                errorRePass.css("display", "block");
            }
        }
    });
    ///==========---------- function that Save Date User Entered In Local Storage ----------==========///
    function addToLocalStorage() {
        if (typeof(Storage) !== "undefined") {
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    var userTypeSelected = radios[i].value;
                    break;
                }
            }
            ///==========---------- adding all names in one array into local storage ----------==========///
            names.push(regUserName.val());
            localStorage.setItem("names", JSON.stringify(names));
            ///==========---------- adding all passwords in one array into local storage ----------==========///
            passwords.push(regUserPassword.val());
            localStorage.setItem("passwords", JSON.stringify(passwords));
            ///==========---------- adding all type of users to one array into local storage ----------==========///
            userType.push(userTypeSelected);
            localStorage.setItem("userType", JSON.stringify(userType));

            ///==========---------- the date of loged in user captured here and put it into local storage ----------==========///
            localStorage.setItem("regUserName", regUserName.val());
            localStorage.setItem("regUserPassword", regUserPassword.val());
            localStorage.setItem("regUserCheckType", userTypeSelected); // stor 1 => student    Or   2 => Instructor 


        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
    ///==========---------- Check User Name if valid or not ----------==========///
    function isValidUserName() {
        var userNamePattern = /^[a-zA-Z0-9]{6,10}$/;
        if (regUserName.val().match(userNamePattern))
            return true;
        else
            return false;
    }
    ///==========---------- Check Re-Password if valid or not ----------==========///
    function isValidRePassword() {
        if (regUserPassword.val() === regUserRe_Password.val())
            return true;
        else
            return false;
    }
    ///==========---------- Check Passowrd if valid or not ----------==========///
    function isValidPassword() {
        var passwordPattern = /^[a-zA-Z0-9]{6,10}$/;
        if (regUserPassword.val().match(passwordPattern))
            return true;
        else
            return false;
    }
    ///==========---------- Check User Name if already exist or not  ----------==========///
    function isUserNameExist() {
        var done = $.inArray(regUserName.val(), names);
        if (done == -1)
            return true;
        else
            return false;

    };
});