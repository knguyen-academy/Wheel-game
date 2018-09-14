
var $startBtn = $('#startBtn');
var $resetBtn = $('#resetBtn');
var $questionHolder = $('#questionHolder');
var $letterBoxesHolder = $('#letterBoxesHolder');
var $guessBtn = $('#guessBtn');
var $inputText = $('#inputText');
var $alphabetBoxesHolder = $('#alphabetBoxesHolder');
var $promptHolder = $('#promptHolder');
var $card = $('.card');
var answer_length, answer_length_nospace = 0, answer;
var max_prize = 20000;
var prize, round = 0;
var letterFoundCount = 0;


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


///INIT GAME
$startBtn.click(function () {

    if ($('.initGame').hasClass('active'))
        return;

    //Init prize
    prize = max_prize;
    $promptHolder.html("<font color='blue'> '<strong> $"+ convertToCur(prize)+" plus bonus(500)</strong> </font> ");

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

    // flag used to determine the point deduction, if point_flag = true, means found, point_flag = false means not found
    var point_flag = false;


    //compare saved letter to answer, if found, change letterBox to gray and reveal the letter
    $('.letterBox').each(function () {


        //Loop through all letter Box, if found letter, reveal it
        if ($(this).text() == selectedLetter) {

            $(this).addClass('letterFound');  //reveal letter, change bg to green
            $(this).parents().addClass('flipEnable'); // allow to flip the card (letterBox -> Parent -> Card)
            point_flag = true;    // change flag = true if found
            letterFoundCount++; // use to determine last guess char
        }
    });

    //if loops through and letter not matched, change point_flag = false to deduct point for each guess
    if (point_flag == false) {
        prize -= 300;
        $promptHolder.html("<font color='red'> '<strong> $"+ convertToCur(prize)+"</strong> </font>");
    }

    var letterFoundCountHalf = letterFoundCount / 2; //divide by 2 because letterBox is twice (from front and back)

    //If guess the last char, if correct, auto flip the remaining boxes and change color to blue
    if (letterFoundCountHalf == answer_length_nospace) {
        $promptHolder.html("Congraz!! You won: "+"<font color='blue'><strong> $"+ convertToCur(prize)+"</strong> </font>");
        //flips all 
        $('.card').addClass('flipped');
        //change color
        $('.back').addClass('finishGame');

    }


    // console.log(letterFoundCountHalf);
    // console.log(answer_length_nospace);

});


//when click on card
$('#letterBoxesHolder').on('click', '.card', function () {
    if ($(this).hasClass('flipEnable')) {
        $(this).toggleClass('flipped');
    }

});

$guessBtn.click(function () {

    var guessWords = $inputText.val().toUpperCase();
    var upperCaseAnswer = answer.toUpperCase();

    if (guessWords == upperCaseAnswer) {
        var bonus = prize + 500;
        $promptHolder.html("Congraz!! You won: "+"<font color='blue'><strong> $"+ convertToCur(bonus)+"</strong> </font>");
        //Flips all
        $('.card').addClass('flipped');
        //Change color
        $('.back').addClass('finishGame');
    }
    else
        $promptHolder.html("WRONG GUESS !!! PLAY AGAIN");
});


///////-------FUNCTIONS-------////////
//Generates letter box base on number of answer letters
function genBoxes() {
    for (var i = 0; i < answer_length; i++) {

        if (answer[i] != " ") {
            var letter = answer[i].toUpperCase();
            // var $newBoxDiv = $("<div class='letterBox'></div> ").text(answer[i].toUpperCase());
            //  var $newBoxDiv = $("<div class ='flip-container'> <div class='card'> <div class='front'></div> <div class='letterBox back'></div></div></div> ");
            var $newBoxDiv = "<div class ='flip-container'>" +
                "<div class='card'>" +
                "<div class='letterBox front'>" + letter + "</div>" +   //need letterbox class because the front is visible when click, front font size =0 to hide the char
                "<div class='letterBox back'>" + letter + "</div>" +
                "</div></div>";
            answer_length_nospace++;
        }
        else {
            // if asnwer character is space, then generate blank box
            var $newBoxDiv = $("<div class='letterBoxSpace'></div>");
        }
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

// funct to convert from int to currency
function convertToCur(intNum) {
    var curVal = intNum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //return currency value
    return curVal
}

// function calPoints(round, prize) {
//     var prize = 0;
//     if (round == 0)
//         prize = max_prize;
//     else
//         prize = max_prize - (round * 100);
//     return prize;
// }

// function flip() {
//     $('.card').toggleClass('flipped');
// }
