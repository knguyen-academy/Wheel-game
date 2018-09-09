var $startBtn = $('#startBtn');
var $resetBtn = $('#resetBtn'); 
var $questionHolder = $('#questionHolder');

//Read Json questions
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText); 
        debugger
        var length = myObj.length;

        //Get random question
        var random = Math.floor(Math.random() * length);

        // for (var i = 0; i < myObj.length; i++) {
        //     var question = myObj[i].QUESTION;
        //     // console.log(question);
        //     var answer = myObj[i].ANSWER;
        //     // console.log(answer);
        // }
        // console.log(length);
        // console.log(random);

        var question = myObj[random].QUESTION;
        var answer = myObj[random].ANSWER;
        var answer_length = answer.length;
        console.log(answer_length);
        // Display question
        $questionHolder.text(question +'?');
    }
};

xmlhttp.open("GET", "questions.text", true);
xmlhttp.send();

/////////////////////////////



$startBtn.click(function(){
    $('.initGame').addClass("active");
});


$resetBtn.click(function(){
    //$('.initGame').removeClass("active");
    window.location.href="wheel.html";
});