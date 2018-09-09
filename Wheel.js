var $startBtn = $('#startBtn');
var $resetBtn = $('#resetBtn');
var $questionHolder = $('#questionHolder');
var $letterBoxesHolder = $('#letterBoxesHolder');
var $guessBtn = $('#guessBtn');
var $inputText = $('#inputText');

var answer_length, answer;

//Read Json questions
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        // debugger
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

        //Retrieve question and answer from json
        var question = myObj[random].QUESTION;
        answer = myObj[random].ANSWER;

        //Get answer length to generate boxes
        answer_length = answer.length;
        // console.log(answer_length);

        // Display question on alert text box
        $questionHolder.text(question + '?');
    }
};

xmlhttp.open("GET", "questions.text", true);
xmlhttp.send();

/////////////////////////////



$startBtn.click(function () {
    $('.initGame').addClass("active");

    //Generate # boxes base on answer-length
    genBoxes();
});


$resetBtn.click(function () {
    //$('.initGame').removeClass("active");
    window.location.href = "wheel.html";
});

$guessBtn.click(function(){
    var chars = $inputText.val().toUpperCase();
    
    $('.letterBox').each(function () {
        // console.log($(this).text() )
        var boxLetter = $(this).text();

        for (var k =0; k <=chars.length; k++)
            {
                if (chars[k] == boxLetter)
                {
                    $(this).addClass('letterFound');
                }
            }
        
    });
        
});


///////-------FUNCTIONS-------////////
//Generates letter box base on number of answer letters
function genBoxes() {
    for (var i = 0; i < answer_length; i++) {

        if (answer[i] != " ")
            var $newBoxDiv = $("<div class='letterBox'></div> ").text(answer[i].toUpperCase());
        else
        // if asnwer character is space, then generate blank box
            var $newBoxDiv = $("<div class='letterBoxSpace'</div>");
        //append to DIV
        $letterBoxesHolder.append($newBoxDiv);
    }

}