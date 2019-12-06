function Exam(_NOFQ, _Ques, _QBGColor, _QAnswers, _modelAnswer, _hisAnswer) {
    this.NOFQ = _NOFQ;
    this.Ques = _Ques;
    this.QBGColor = _QBGColor;
    this.QAnswers = _QAnswers;
    this.ModelAnswer = _modelAnswer;
    this.hisAnswer = _hisAnswer;
}

var exams = [
    new Exam("Question 1", "HTML Is Programming Language ?", "#CC33FF", "Reading,Writing,Running,Developing", "Writing"),
    new Exam("Question 2", "I Can Run Jave Script With Compiler ?", "#CC33CC", "Reading,Writing,Running,Coding", "Coding"),
    new Exam("Question 3", "I Can Loop In JS Using Only For Loop ?", "#CC3399", "Reading,Writing,Coding", "Reading"),
    new Exam("Question 4", "JQ Is A Programming Language ?", "#CC3366", "Reading,Running", "Running"),
    new Exam("Question 5", "We Are In Web & Mobile Cross Platform Course ?", "#CC3333", "Reading,Writing,Running", "Writing"),
    new Exam("Question 6", "Are You OK..... ?", "#CC3300", "Reading,Writing,Coding,Swimming", "Swimming"),
    new Exam("Question 7", "HTML Is Programming Language ?", "#CC33FF", "Reading,Writing,Running,Developing", "Developing"),
    new Exam("Question 8", "I Can Run Jave Script With Compiler ?", "#CC33CC", "Reading,Writing,Running,Coding", "Writing"),
    new Exam("Question 9", "I Can Loop In JS Using Only For Loop ?", "#CC3399", "Reading,Writing,Coding", "Coding"),
    new Exam("Question 10", "JQ Is A Programming Language ?", "#CC3366", "Reading,Running", "Running"),
    new Exam("Question 11", "We Are In Web & Mobile Cross Platform Course ?", "#CC3333", "Reading,Writing,Running", "Writing"),
    new Exam("Question 12", "Are You OK..... ?", "#CC3300", "Reading,Writing,Coding,Swimming", "Reading"),
    new Exam("Question 13", "HTML Is Programming Language ?", "#CC33FF", "Reading,Writing,Running,Developing", "Writing"),
    new Exam("Question 14", "I Can Run Jave Script With Compiler ?", "#CC33CC", "Reading,Writing,Running,Coding", "Running"),
    new Exam("Question 15", "I Can Loop In JS Using Only For Loop ?", "#CC3399", "Reading,Writing,Coding", "Reading"),
    new Exam("Question 16", "JQ Is A Programming Language ?", "#CC3366", "Reading,Running", "Running"),
    new Exam("Question 17", "We Are In Web & Mobile Cross Platform Course ?", "#CC3333", "Reading,Writing,Running", "Writing"),
    new Exam("Question 18", "Are You OK..... ?", "#CC3300", "Reading,Writing,Coding,Swimming", "Swimming"),
    new Exam("Question 19", "HTML Is Programming Language ?", "#CC33FF", "Reading,Writing,Running,Developing", "Developing"),
    new Exam("Question 20", "I Can Run Jave Script With Compiler ?", "#CC33CC", "Reading,Writing,Running,Coding", "Reading"),
    new Exam("Question 21", "I Can Loop In JS Using Only For Loop ?", "#CC3399", "Reading,Writing,Coding", "Coding"),
    new Exam("Question 22", "JQ Is A Programming Language ?", "#CC3366", "Reading,Running", "Running"),
    new Exam("Question 23", "We Are In Web & Mobile Cross Platform Course ?", "#CC3333", "Reading,Writing,Running", "Writing"),
    new Exam("Question 24", "Are You OK..... ?", "#CC3300", "Reading,Writing,Coding,Swimming", "Swimming"),
    new Exam("Question 25", "I Can Loop In JS Using Only For Loop ?", "#CC33FF", "Reading,Writing,Coding", "Coding"),
    new Exam("Question 26", "HTML Is Programming Language ?", "#CC33FF", "Reading,Writing,Running,Developing", "Writing"),
    new Exam("Question 27", "I Can Run Jave Script With Compiler ?", "#CC33CC", "Reading,Writing,Running,Coding", "Coding"),
    new Exam("Question 28", "I Can Loop In JS Using Only For Loop ?", "#CC3399", "Reading,Writing,Coding", "Coding"),
    new Exam("Question 29", "JQ Is A Programming Language ?", "#CC3366", "Reading,Running", "Running"),
    new Exam("Question 30", "We Are In Web & Mobile Cross Platform Course ?", "#CC3333", "Reading,Writing,Running", "Writing"),
]; // edit that and make it eqal to randon objects in main exam

var Storage = window.localStorage;

$(function() {
    // Exam Model Dialoog Handle 

    startFlag = 0;
    selectFlag = 0;
    targetValue = new String();
    targetVal = [];
    targetQuestion = new String();
    targetQues = [];
    checkedPlace = 0;
    i = 0;
    QIndex = [];
    while (QIndex.length < 5) {
        var nr = Math.ceil(Math.random() * 30);
        if (QIndex.indexOf(nr) === -1) QIndex.push(nr);
    }

    time_in_minutes = 1;
    current_time = Date.parse(new Date());
    deadline = new Date(current_time + time_in_minutes * 60 * 1000);

    internalwrapper = document.getElementById('internalwrapper');
    welcome = document.createElement('h3');
    welcome.innerText = "Welcome..! Press Start To Take You'r Exam ";
    internalwrapper.appendChild(welcome);
    btnSubmit = document.getElementById('submit_btn');
    btnSubmit.addEventListener('click', submitExam); // U Will Change That One To Submit    
    btnnext = document.getElementById('btnnext');
    btnnext.addEventListener('click', nextQues);
    btnprev = document.getElementById('btnprev');
    btnprev.addEventListener('click', prevQues);
    btnExit = document.getElementById('exit_btn');
    btnExit.addEventListener('click', exitExam);
    if (startFlag == 0) {
        btnSubmit.style.visibility = "hidden";
        btnnext.style.visibility = "hidden";
        btnprev.style.visibility = "hidden";
        startFlag = 1;
    }
    btnStart = document.getElementById('btnStart'); // U Will Change That To Start exam 
    btnStart.addEventListener('click', startExam);

});

function startExam() {
    if (startFlag == 1 && confirm("Focus And Finish Before Time Expired")) {
        viewExam(QIndex[0]);
        btnSubmit.style.visibility = "visible";
        btnprev.style.visibility = "visible";
        btnnext.style.visibility = "visible";
        btnStart.style.visibility = "hidden";
        btnExit.style.visibility = "hidden";
    }
    xtime = setInterval(function() {
        var now = new Date().getTime();
        var t = deadline - now;
        //var days = Math.floor(t / (1000 * 60 * 60 * 24));
        //var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        document.getElementById('exam-title').innerHTML = /*days + "d "+ hours + "h " +*/ "Time Remaining " + minutes + "m " + seconds + "s ";
        if (t < 0) {
            clearInterval(xtime);
            timeOver();
            document.getElementById('exam-title').innerHTML = "TIME EXPIRED";
        }
    }, 1000);
}

function timeOver() {
    finalResult = 0;
    // View His Result and Hide Buttons And Make Exit Visable 
    btnprev.style.visibility = "hidden";
    btnnext.style.visibility = "hidden";
    btnStart.style.visibility = "hidden";
    btnExit.style.visibility = "visible";
    btnSubmit.style.visibility = "hidden";

    for (var i = 0; i < QIndex.length; i++) {
        var lastValue = targetVal[targetQues.lastIndexOf(exams[QIndex[i] - 1].NOFQ)];
        if (lastValue === exams[QIndex[i] - 1].ModelAnswer) {
            finalResult++;
        }
    }

    byeBye = document.createElement('h3');
    byeBye.innerText = "You'r Grade Is Saved To You'r Profile... THANKS";
    /*===========================================================================================================*/
    /*--------------------------------------The Final Grade Of Exa-----------------------------------------------*/
    /*===========================================================================================================*/
    localStorage.setItem("studentGrade", finalResult);
    internalwrapper.innerText = "";
    internalwrapper.appendChild(byeBye);

    function addToLocalStorage() {
        if (typeof(Storage) !== "undefined") {
            ///==========---------- adding all names in one array into local storage ----------==========///
            ///==========---------- the date of loged in user captured here and put it into local storage ----------==========///
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
}

function submitExam() {
    if (confirm("Are U Sure")) {
        clearInterval(xtime);
        timeOver();
        document.getElementById('exam-title').innerHTML = "TIME EXPIRED";
    }
}

function nextQues() {
    i++;
    if (i >= QIndex.length) {
        i = 0;
    }
    viewExam(QIndex[i]);
    viewInputSelect(QIndex[i]);
}

function prevQues() {
    i--;
    if (i < 0) {
        i = QIndex.length - 1;
    }
    viewExam(QIndex[i]);
    viewInputSelect(QIndex[i]);
}

function viewExam(index) {
    internalwrapper.innerText = "";
    var lol = index - 1;
    newExam = exams[lol];
    //internalwrapper.style.backgroundColor = newExam.QBGColor;
    divQues = document.createElement('h3');
    divQues.innerText = newExam.Ques;

    internalwrapper.appendChild(divQues);

    divAnswers = document.createElement('h4');
    divAnswers.innerText = "Select Correct Answers:";
    internalwrapper.appendChild(divAnswers);

    /*=-----------------------------------------= That Is The Model Answer =-----------------------------------= */
    //modelanswer = document.createElement('h1');
    //// h2 inner text => name
    //modelanswer.innerText = newExam.ModelAnswer;
    //modelanswer.style.color = 'red';
    //internalwrapper.appendChild(modelanswer);

    // view Answers As Radio
    examAnswers = newExam.QAnswers.split(',');
    if (selectFlag == 0) {
        viewInputSelect(lol + 1);
        selectFlag = 1;
    }

} // End Of View Function

function viewInputSelect(index) {
    if (targetQues.lastIndexOf(exams[index - 1].NOFQ) != -1) {
        checkedPlace = targetVal[targetQues.lastIndexOf(exams[index - 1].NOFQ)];
    }
    for (var k = 0; k < examAnswers.length; k++) {
        newExam = exams[index - 1];

        newAnswer = document.createElement('input');
        newAnswer.setAttribute('type', 'radio');
        if (examAnswers[k] == checkedPlace) {
            newAnswer.setAttribute('checked', 'true');
        }
        newAnswer.addEventListener('click', function(e) {
            if (e.target.checked) {
                targetValue = e.target.value;
                targetQuestion = newExam.NOFQ;
            }

        });
        newAnswer.setAttribute('value', examAnswers[k]);
        newAnswer.setAttribute('name', 'userAnswers');

        answerSpann = document.createElement('span');
        answerSpann.innerText = examAnswers[k];
        internalwrapper.appendChild(newAnswer);
        internalwrapper.appendChild(answerSpann);
        internalwrapper.appendChild(document.createElement('br'));

        //}
        if (targetValue != "") {
            //alert("Not Found");
            targetVal.push(targetValue); // any radio user pickes it's value saved here 
            targetQues.push(targetQuestion); // the Question Saved Here 
            targetValue = "";
        }
    }
}

function exitExam() {
    if (confirm("Are U Sure")) {


    }
}