// JavaScript source code
var Storage = window.localStorage;
var routeToProfile = window.location.origin + "/profile.html";

//---------------------set static data for the first run------------------//
if (mycourses == undefined) {

    var courses = [];
    var mycourses = new Array(1);
    for (var i = 0; i < 1; i++) {
        mycourses[i] = new Array(1);
    }
    mycourses[0][0] = "dummy";
    mycourses[0][1] = "dummy";
    localStorage.setItem("courses", JSON.stringify(mycourses))

    /////////////////////////////////////////
    //console.log("test here");

}

$("#btnjoin").on('click', function() {
    //check if user is logged in 
    if (localStorage.getItem("logedInUserName") == null) {
        if (confirm("You Should Sign in First"))
            window.location.replace(window.location.origin + "/login/index.html");
    } else {
        $("#mymodal").toggle();

        $("#mymodal").css("with", "400px");
        $("#mymodal").css("height", "500px");

        //mymodal.style.width = '400px';
        //mymodal.style.height = '500px';
    }
});

//////------------------Get the user name and course name------------------------///////
$("#btnregister").on('click', function() {

    username = document.getElementById("txtname").value;
    course = document.getElementById("txtcourse").value;

    $('#containermodelCourse').hide();


    if (localStorage.getItem("courses") != null) {

        mycourses = localStorage.getItem("courses");
        mycourses = JSON.parse(mycourses);


    }

    ///--------------------Check if user already joined this course-------------/////

    var fff = 0;
    for (let i of JSON.parse(localStorage.getItem("courses"))) {
        if (i[0].toLowerCase() === username.toLowerCase()) {
            if (i[1].toLowerCase() === course.toLowerCase()) {

                fff++;
            }

        }

    }

    if (fff == 0) {
        mycourses.push([username, course]);
        localStorage.setItem("courses", JSON.stringify(mycourses))

    }

    document.location.href = routeToProfile;
    fff = 0;



});




if (typeof(Storage) !== "undefined") {
    // Store
    //localStorage.setItem("logedInUser", usersGroup[i]);
    //alert("Done");
    // Retrieve
    var userName = localStorage.getItem("logedInUserName"); // the name of logged in person
    $('#profile-name').text(userName);

    if (userName == null) {
        $('.dropdown__toggle').first().text("HELLO");
    } else {
        $('.dropdown__toggle').first().text("Hi " + userName); //=> Select The Title and Change It's Name 
        var userType = JSON.parse(localStorage.getItem("logedInUserType"))
    }

} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}

/**---------------------------Display Student profile------------------------------------------------ */

if (userType == 1) {
    for (let i in JSON.parse(localStorage.getItem("courses"))) {

        //if the student's name exitsts in courses array'
        if (JSON.parse(localStorage.getItem("courses"))[i][0].toLowerCase() == userName.toLowerCase()) {
            // hide the 'No Courses' div
            $('#no-course').text("Enrolled Courses");
            $('#chartContainer').hide();

            //Create the div to display courses
            let maindiv = $(document.createElement('div'));
            maindiv.addClass('col-md-4 col-lg-3 ');
            maindiv.attr('id', 'crs-div')

            let boxdiv = $(document.createElement('div'));
            boxdiv.addClass('textbox');

            $('#enrolled-courses').append(maindiv);
            maindiv.wrapInner(boxdiv);

            let imgdiv = $(document.createElement('div'));
            imgdiv.addClass('textbox__image');
            boxdiv.wrapInner(imgdiv);

            let imglink = $(document.createElement('a'));
            imglink.attr('href', 'course-detail.html');
            imglink.attr('class', 'crs-img' + i);
            imgdiv.wrapInner(imglink);

            let bodydiv = $(document.createElement('div'));
            bodydiv.addClass('textbox__body');
            boxdiv.append(bodydiv);

            let boxTitle = $(document.createElement('h2'));
            boxTitle.addClass('textbox__title');
            bodydiv.append(boxTitle);

            let crsName = $(document.createElement('a'));
            crsName.attr('href', 'course-detail.html');
            crsName.attr('class', 'crs-name' + i);
            boxTitle.append(crsName);

            let boxDesc = $(document.createElement('div'));
            boxDesc.addClass('textbox__description');
            boxDesc.attr('class', 'crs-desc');
            bodydiv.append(boxDesc);

            let btnExam = $(document.createElement('a'));
            btnExam.addClass('btn btn-info');
            btnExam.addClass('takeExamBtn');

            btnExam.attr('type', "button");
            //btnExam.attr('id', "myBtn");
            btnExam.attr('data-toggle', "modal");
            btnExam.attr('data-target', "#myModal-exam");
            btnExam.text("Take Exam");

            //btnExam.click(function () {
            //    $("#centralModalSm").show();
            //    //alert("hhhhhhhhhhhh");
            //})


            boxdiv.append(btnExam);

            //Append the course Data
            //console.log("be4 appending data");

            $('.crs-img' + i).html("<img src='assets/img/services/" + i + ".jpg'>");
            $('.crs-name' + i).text(JSON.parse(localStorage.getItem("courses"))[i][1]);
            $('.crs-desc').text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
                  Ut laoreet ut lacus a tincidunt. ");
        }


    }
}

/**---------------------------Display instructor profile------------------------------------------------ */

if (userType == 2) {
    $("#profileimg").html('<img src="assets/img/instructors/instructor_2.jpg"/>')
    //get students enrolled in his course//
    stds = new Array();
    for (let i in JSON.parse(localStorage.getItem("courses"))) {
        //get the instructor course
        if (JSON.parse(localStorage.getItem("courses"))[i][1].toLowerCase() == "html") {
            stds.push(JSON.parse(localStorage.getItem("courses"))[i][0]);
        }
    }
    // hide the 'No Courses' div
    $('#no-course').hide();

    //Create the div to display the instructor's course
    let maindiv = $(document.createElement('div'));
    maindiv.addClass('col-md-4 col-lg-4 ');

    let boxdiv = $(document.createElement('div'));
    boxdiv.addClass('textbox');

    $('#instructorCrs').append(maindiv);
    maindiv.wrapInner(boxdiv);

    let imgdiv = $(document.createElement('div'));
    imgdiv.addClass('textbox__image');
    boxdiv.wrapInner(imgdiv);

    let imglink = $(document.createElement('a'));
    imglink.attr('href', 'course-detail.html');
    imglink.attr('class', 'crs-img');
    imgdiv.wrapInner(imglink);

    let bodydiv = $(document.createElement('div'));
    bodydiv.addClass('textbox__body');
    boxdiv.append(bodydiv);

    let boxTitle = $(document.createElement('h2'));
    boxTitle.addClass('textbox__title');
    bodydiv.append(boxTitle);

    let crsName = $(document.createElement('a'));
    crsName.attr('href', 'course-detail.html');
    crsName.attr('class', 'crs-name');
    boxTitle.append(crsName);

    let boxDesc = $(document.createElement('div'));
    boxDesc.addClass('textbox__description');
    boxDesc.attr('class', 'crs-desc');
    bodydiv.append(boxDesc);

    //Append the course Data in card
    $('.crs-img').html("<img src='assets/img/services/4.jpg'>");
    $('.crs-name').text("html");
    $('.crs-desc').html("<p>Students enrolled: <a href='#'> " + stds + " </a></p>\
              <p>End date: June, 2019</p>");

}


/**---------------------------Display Admin profile------------------------------------------------ */
if (userType == 0) {
    $("#profileimg").html('<img src="assets/img/instructors/instructor_2.jpg"/>')

    var html = 0,
        xml = 0,
        graphics = 0,
        web = 0,
        android = 0,
        bootstrap = 0;

    for (let i in JSON.parse(localStorage.getItem("courses"))) {
        //count num of students in each course
        switch (JSON.parse(localStorage.getItem("courses"))[i][1].toLowerCase()) {
            case "html":
                html++;
                break;

            case "xml":
                xml++;
                break;

            case "graphics":
                graphics++;
                break;

            case "web":
                web++;
                break;

            case "android":
                android++;
                break;

            case "bootstrap":
                bootstrap++;
                break;
        }
    }
    ////////////////////////know number of instructors to display for Admin/////////////////////////////////
    var instructorNum = 0;
    for (let i in JSON.parse(localStorage.getItem("userType"))) {

        if (JSON.parse(localStorage.getItem("userType"))[i] == 2) {
            instructorNum++;
        }



    }

    ////Display the website data for the admin///////
    $('#no-course').hide();

    let maindiv = $(document.createElement('div'));
    maindiv.addClass('col-12 ');

    let boxdiv = $(document.createElement('div'));
    boxdiv.addClass('textbox');

    $('#instructorCrs').append(maindiv);
    maindiv.wrapInner(boxdiv);

    let bodydiv = $(document.createElement('div'));
    bodydiv.addClass('textbox__body');
    boxdiv.append(bodydiv);
    bodydiv.attr('id', 'siteData');

    let boxTitle = $(document.createElement('h2'));
    boxTitle.addClass('textbox__title');
    bodydiv.append(boxTitle);

    let boxDesc = $(document.createElement('div'));
    boxDesc.addClass('textbox__description');
    boxDesc.attr('class', 'crs-desc');
    bodydiv.append(boxDesc);


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // I found Error Here When i Login Cannot read property 'length' of null/////////////////////////////////////////////
    ////////////////////////////////////////  SOLVED ////////////////////////////////////////////////////////////////////////////
    if (localStorage.getItem("courses") == null) {
        $('.crs-desc').html("<p>Students enrolled: No enrolled students yet...! </p>\
              <p>Number of instructors : " + instructorNum + "</p>");
    } else {
        $('.crs-desc').html("<p>Students enrolled: " + ((JSON.parse(localStorage.getItem("courses")).length) - 1) + "</p>\
              <p>Number of instructors : " + instructorNum + "</p>");
    }

    /////////////////Display chart of site data/////////////////////////////////
    var options = {
        title: {
            text: "Courses and Enrolled Students"
        },
        subtitles: [{
            text: "Total Number of enrolled students: " + ((JSON.parse(localStorage.getItem("courses")).length) - 1) + " Students"
        }],
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y} students",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y} students",
            dataPoints: [{
                    y: html,
                    label: "Html"
                },
                {
                    y: xml,
                    label: "XML"
                },
                {
                    y: graphics,
                    label: "Graphics"
                },
                {
                    y: web,
                    label: "Web-development"
                },
                {
                    y: android,
                    label: "Android"
                },
                {
                    y: bootstrap,
                    label: "Bootstrap"
                }
            ]
        }]
    };
    $("#chartContainer").CanvasJSChart(options);


    /*------------------------Display instructors in a table---------------------------------*/
    let tableContainer = $(document.createElement('div'))
    tableContainer.addClass('row');
    tableContainer.attr('id', 'tContainer');

    let instTable = $(document.createElement('table'));
    instTable.addClass('col-12 col-lg-5');
    instTable.addClass('adminTable');
    instTable.attr('id', 'mLeft');
    let tr1 = $(document.createElement('tr'));
    tr1.html("<th> Instructors </th>");
    instTable.append(tr1);

    for (let i in JSON.parse(localStorage.getItem("userType"))) {
        if (JSON.parse(localStorage.getItem("userType"))[i] == 2) {
            let tr2 = $(document.createElement('tr'));
            tr2.html("<td><a href='#'>" + JSON.parse(localStorage.getItem("names"))[i] + "</a></td>");
            instTable.append(tr2);
        }
    }

    $("#instructorCrs").append(tableContainer);
    $("#tContainer").append(instTable);

    /*-----------------------Students in a table---------------------------------*/
    let stdTable = $(document.createElement('table'));
    stdTable.addClass('adminTable');
    stdTable.addClass('col-12 col-lg-5');
    let tr3 = $(document.createElement('tr'));
    tr3.html("<th> Students </th>");
    stdTable.append(tr3);

    for (let i in JSON.parse(localStorage.getItem("userType"))) {
        if (JSON.parse(localStorage.getItem("userType"))[i] == "1") {
            let tr4 = $(document.createElement('tr'));
            tr4.html("<td><a href='#'>" + JSON.parse(localStorage.getItem("names"))[i] + "</a></td>");
            stdTable.append(tr4);
        }
    }

    $("#tContainer").append(stdTable);


}