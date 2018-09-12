var $startBtn = $('#startBtn');
var $resetBtn = $('#resetBtn');
var $questionHolder = $('#questionHolder');
var $letterBoxesHolder = $('#letterBoxesHolder');
var $guessBtn = $('#guessBtn');
var $inputText = $('#inputText');
var $alphabetBoxesHolder = $('#alphabetBoxesHolder');
var $promptHolder = $('#promptHolder');
var answer_length, answer;
var max_prize = 20000;
var prize, round = 0;

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
    //Init
    prize = max_prize;
    $promptHolder.html(prize);

    //init elements
    $('.initGame').addClass("active");

    //Generate alphabetLetters
    genAlphabet();

    //Generate # boxes base on answer-length
    genBoxes();

});


$resetBtn.click(function () {
    //$('.initGame').removeClass("active");
    window.location.href = "wheel.html";
});


//*** Since alphabetBox class is created dynamically, when binding click event, it will not work *//
// Solution : user <parent>.on(<event>, <className>,function(){})
$('#alphabetBoxesHolder').on('click', '.alphabetBox', function () {

    //return if already clicked
    if ($(this).hasClass('clicked')) {
        alert("Already selected");
        return
    }

    //When select, change letter button to gray
    $(this).addClass('clicked');

    //Save letter to compare
    var selectedLetter = $(this).text();

    // flag used to determine the point deduction, if flag = true, means found, flag = false means not found
    var flag = false;

    //compare saved letter to answer, if found, change letterBox to gray and reveal the letter
    $('.letterBox').each(function () {


        //Loop through all letter Box, if found letter, reveal it
        if ($(this).text() == selectedLetter) {
            //reveal letter
            $(this).addClass('letterFound')
            // change flag = true if found
            flag = true;
        }
    });

    //if loops through and letter not matched, change flag = false to deduct point for each guess
    if (flag == false) {
        prize -= 300;
        $promptHolder.html(prize);
    }
});


$guessBtn.click(function () {
    debugger
    var guessWords = $inputText.val().toUpperCase();
    var upperCaseAnswer = answer.toUpperCase();
    if (guessWords == upperCaseAnswer) {
        $promptHolder.html(prize);
    }
    else
        alert("not corect");
    // $('.letterBox').each(function () {
    //     // console.log($(this).text() )
    //     var boxLetter = $(this).text();

    //     for (var k = 0; k <= chars.length; k++) {
    //         if (chars[k] == boxLetter) {
    //             $(this).addClass('letterFound');
    //         }
    //     }

    // });

});


///////-------FUNCTIONS-------////////
//Generates letter box base on number of answer letters
function genBoxes() {
    for (var i = 0; i < answer_length; i++) {

        if (answer[i] != " ")
            var $newBoxDiv = $("<div class='letterBox'></div> ").text(answer[i].toUpperCase());
        else
            // if asnwer character is space, then generate blank box
            var $newBoxDiv = $("<div class='letterBoxSpace'></div>");
        //append to DIV
        $letterBoxesHolder.append($newBoxDiv);
    }

}

function genAlphabet() {
    for (var i = 0; i < 26; i++) {
        var $alphabetBox = $("<div class='alphabetBox'></div>").text((i + 10).toString(36).toUpperCase());
        $alphabetBoxesHolder.append($alphabetBox);
    }
}

function calPoints(round, prize) {
    var prize = 0;
    if (round == 0)
        prize = max_prize;
    else
        prize = max_prize - (round * 100);
    return prize;
}