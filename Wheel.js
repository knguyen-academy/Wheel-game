var $startBtn = $('#startBtn');
var $resetBtn = $('#resetBtn'); 

$startBtn.click(function(){
    $('.initGame').addClass("active");
});


$resetBtn.click(function(){
    $('.initGame').removeClass("active");
});