// JavaScript source code
//$(".logOut > .search-form__toggle").show();
//$(".loggedIn > .search-form__toggle").hide();
$(function() {
    var Storage = window.localStorage;
    $(".logOut > .search-form__toggle").click(function() {
        if (confirm("Are You Sure..?")) {
            localStorage.removeItem("logedInUserName");
            localStorage.removeItem("logedInUserType");
            window.location.replace(window.location.origin + "/login/index.html");

        }
    });


});