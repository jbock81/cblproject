var path_between_quiz = "";
var path_main_quiz = "";
var path_end_quiz = "";
var path_retry_quiz = "";
var path_end_effect = "";
var userMedia = navigator.mediaDevices.getUserMedia({ audio: true });
var timeRespond = 0;
var elapseSec = 0;
var quizStatus = 1; // 1: Ready, 2: First question
var answers_yes = ["yes", "yup", "yeah", "yea", "that's right"];
var answers_no = ["no", "nada", "nope", "naw", "gnaw"];
var quiz_answers_correct = [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1];
var betweenSpeech, mainSpeech, endSpeech, retrySpeech, endEffect;
var quiz_cnt_intro = 1;
var quiz_cnt_before = 5;
var quiz_cnt_between = 10;
var quiz_cnt_main = 12;
var quiz_cnt_last = 5;
var quiz_cnt_end_correct = 1;
var quiz_cnt_end_wrong = 8;
var quiz_cnt_try_again = 5;
var quiz_num = 0;
var quiz_nums_between = [];
var quiz_nums_main = [];
var quiz_answers = [-1, -1, -1];
var quiz_idx = 0;
var between_main = 1;
var quiz_retry = 0;
var loops = 3;
var loop_idx = 1;
var puzzle_solved = 0;
var ansClicked = 0; //should be 1 for "yes" or 2 for "no".
var strQuiz = {
    intro: "Would you like to play a game?",
    quiz_main: [
        "Do lions eat carrots?",
        "Do elephants live in the Arctic?",
        "Is a zebra a pet?",
        "Has a fox got six legs?",
        "Can a duck quack?",
        "Is Washington DC the capital of the United States?",
        "Do alligators fly?",
        "Do bears meow?",
        "Is July a summer month?",
        "Has a spaceship ever been to the moon?",
        "Can magpie perch on clouds in the sky?",
        "Are cats the cleanest animals?"
    ],
    correct: "Congratulations! You solved the puzzle. Code one nine five eight seven. That is one nine five eight seven.",
    wrong: "Oh, no!!!"
};
var back_img_cnt = 6;
var noRespond = 0;
function initQuestions() {
    var imgNum = Math.floor(Math.random() * back_img_cnt + 1);
    $("body").css("background-image", "url('assets/samplequiz/images/back0" + imgNum + ".jpg')");
    $("body").css("background-size", "100% 100%");
    quiz_answers = [-1, -1, -1];
    ansClicked = 0;
    puzzle_solved = 0;
    quiz_idx = 0;
    quiz_nums_between = [];
    while(quiz_nums_between.length < 1){
        quiz_num = Math.floor((Math.random() * quiz_cnt_between) + 1);
        if(quiz_nums_between.indexOf(quiz_num) === -1) quiz_nums_between.push(quiz_num);
    }
    console.log(quiz_nums_between);
    quiz_nums_main = [];
    while(quiz_nums_main.length < 3){
        quiz_num = Math.floor((Math.random() * quiz_cnt_main) + 1);
        if(quiz_nums_main.indexOf(quiz_num) === -1) quiz_nums_main.push(quiz_num);
    }
    console.log(quiz_nums_main);
    for (var i=0; i<3; i++)
        console.log(quiz_answers_correct[quiz_nums_main[i] - 1]);
    
    $("#div_answer_quiz").hide();
    $("#div_quiz_done").hide();
    $("#div_enter_quiz").show();
}

function enterQuiz() {
    $("#div_enter_quiz").hide();
    $("#div_quiz_done").show();
    path_between_quiz = 'assets/samplequiz/audio/intro/intro.mp3';
    startQuiz();
}

document.addEventListener('keypress', function(e){
    if (e.keyCode == 13 && quizStatus == 1){        
        enterQuiz();    
    }
});

$("#div_enter_quiz").click(function(e){
    enterQuiz();
});

$("#btn_yes").click(function(e){
    ansClicked = 1;
});

$("#btn_no").click(function(e){
    ansClicked = 2;
});

function backToEnter() {
    ansClicked = 0;
    quizStatus = 1;
    noRespond = 0;
    $("#div_answer_quiz").hide();
    $("#div_quiz_done").hide();
    $("#div_enter_quiz").show();
}

function quizStep1() {
    $("#div_quiz_done").html("");
    $("#div_answer_quiz").hide();
    quizStatus = 2;
    ansClicked = 0;
    quiz_num = Math.floor((Math.random() * quiz_cnt_before) + 1);
    path_between_quiz = 'assets/samplequiz/audio/before-quiz/quiz-start-' + quiz_num + '.mp3';
    playBetweenSpeech(path_between_quiz);
    path_main_quiz = 'assets/samplequiz/audio/quiz-1-3/quiz-1-3-' + quiz_nums_main[0] + '.mp3';
    window.setTimeout("playMainSpeech(path_main_quiz, 0)", 4000);
}

function quizStep2_4() {
    $("#div_quiz_done").html("");
    ansClicked = 0;
    $("#div_answer_quiz").hide();
    if (quizStatus == 4){
        quiz_num = Math.floor((Math.random() * quiz_cnt_last) + 1);
        path_between_quiz = 'assets/samplequiz/audio/last-quiz/last-quiz-' + quiz_num + '.mp3';
    } else {
        path_between_quiz = 'assets/samplequiz/audio/between-quiz-2-4/between-quiz-2-4-' + quiz_nums_between[quiz_idx] + '.mp3';
    }
    // window.setTimeout("playBetweenSpeech(path_between_quiz)", 1000);
    playBetweenSpeech(path_between_quiz);
    quiz_idx++;
    path_main_quiz = 'assets/samplequiz/audio/quiz-1-3/quiz-1-3-' + quiz_nums_main[quiz_idx] + '.mp3';
    window.setTimeout("playMainSpeech(path_main_quiz, quiz_idx)", 3500);
}

function quizStep5() {
    $("#div_quiz_done").html("");
    ansClicked = 0;
    $("#div_answer_quiz").hide();
    console.log(quiz_answers);
    quizStatus = 6;
    if (judgeAnswers()) {
        path_end_effect = 'assets/samplequiz/audio/quiz-end/quiz-end-correct-effect.wav';
        path_end_quiz = 'assets/samplequiz/audio/quiz-end/quiz-end-correct.mp3';
        puzzle_solved = 1;
    } else {
        path_end_effect = 'assets/samplequiz/audio/quiz-end/quiz-end-wrong-effect.wav';
        var end_num = Math.floor((Math.random() * quiz_cnt_end_wrong) + 1);
        path_end_quiz = 'assets/samplequiz/audio/quiz-end/quiz-end-wrong-' + end_num + '.mp3';
    }
    playEndEffect(path_end_effect);
    window.setTimeout("playEndSpeech(path_end_quiz)", 4000);
}

function startQuiz(){
    userMedia.then((stream) => {
        console.log({ stream });
        if (!MediaRecorder.isTypeSupported('audio/webm'))
            return alert('Browser not supported');
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm',
        });
        const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
            'token',
            '1989ae1142a515f3fa34447a0c2588f7c1c7ab98',
        ]);
        socket.onopen = () => {
            // document.querySelector('#status').textContent = 'Connected';
            console.log({ event: 'onopen' });
            playBetweenSpeech(path_between_quiz);
            mediaRecorder.addEventListener('dataavailable', async (event) => {
                if (event.data.size > 0 && socket.readyState == 1) {
                    socket.send(event.data);
                }
            });
            mediaRecorder.start(1000);
            timeRespond = Date.now();
        }

        socket.onmessage = (message) => {
            const received = JSON.parse(message.data);
            const transcript = received.channel.alternatives[0].transcript;
            if (transcript && received.is_final) {
                console.log(transcript);
                if (quizStatus == 1) {
                    if (between_main == 2){
                        
                    }
                    if (endBetweenSpeech()) {
                        if (answers_yes.includes(transcript) || containsAnswerYes(transcript)){
                            quizStep1();
                        } else if (answers_no.includes(transcript) || containsAnswerNo(transcript)) {
                            socket.close();
                            backToEnter();
                        } else {

                        }
                    }
                } else if (quizStatus >= 2 && quizStatus <= 4) {
                    if (between_main == 1){
                    
                    }
                    if (endMainSpeech()) {
                        if (quiz_answers[quiz_idx] == -1) {
                            if (answers_yes.includes(transcript) || containsAnswerYes(transcript)) {
                                quiz_answers[quiz_idx] = 1;
                            } else if (answers_no.includes(transcript) || containsAnswerNo(transcript)) {
                                quiz_answers[quiz_idx] = 0;
                            }
                            if (quizStatus <= 4) {
                                if (answers_yes.includes(transcript) || containsAnswerYes(transcript) || answers_no.includes(transcript) || containsAnswerNo(transcript)) {
                                    quizStep2_4();   
                                }
                            }
                        }
                    } else {
                        
                    }
                } else if (quizStatus == 5) {
                    if (between_main == 1){
                    
                    }
                    if (endMainSpeech()) {
                        if (quiz_answers[quiz_idx] == -1) {
                            if (answers_yes.includes(transcript) || containsAnswerYes(transcript)) {
                                quiz_answers[quiz_idx] = 1;
                            } else if (answers_no.includes(transcript) || containsAnswerNo(transcript)) {
                                quiz_answers[quiz_idx] = 0;
                            }
                            if (answers_yes.includes(transcript) || containsAnswerYes(transcript) || answers_no.includes(transcript) || containsAnswerNo(transcript)) {
                                quizStep5();
                            }
                        }
                    } else {
                        
                    }
                } else if (quizStatus == 6) {
                    if (endEndSpeech()) {
                        quizStatus = 7;
                        if (puzzle_solved == 0){
                            var retry_num = Math.floor((Math.random() * quiz_cnt_try_again) + 1);
                            path_retry_quiz = 'assets/samplequiz/audio/try-again/try-again-' + retry_num + '.mp3';
                            playRetrySpeech(path_retry_quiz);
                        }
                    }
                    if (puzzle_solved == 1){
                    }
                } else if (quizStatus == 7){
                    if (endRetrySpeech() && puzzle_solved == 0) {
                        quizStatus = 1;
                        initQuestions();
                    }
                }   
                // document.querySelector('#transcript').textContent += transcript + ' ';
            } else {
                if (quizStatus == 1) {
                    if (endBetweenSpeech()) {
                        if (ansClicked == 1) {
                            quizStep1();
                        } else if (ansClicked == 2){
                            socket.close();
                            backToEnter();
                        } else {
                            elapseSec = Date.now() - timeRespond;
                            if (elapseSec >= 10000){
                                socket.close();
                                backToEnter();
                            }
                        }
                    }
                } else if (quizStatus >= 2 && quizStatus <= 4) {
                    if (endMainSpeech() && quiz_answers[quiz_idx] == -1) {
                        if (ansClicked == 1) {
                            quiz_answers[quiz_idx] = 1;
                            quizStep2_4();
                        } else if (ansClicked == 2) {
                            quiz_answers[quiz_idx] = 0;
                            quizStep2_4();
                        } else {
                            elapseSec = Date.now() - timeRespond;
                            if (elapseSec >= 15000){
                                path_end_quiz = 'assets/samplequiz/audio/intro/no-response.mp3';
                                noRespond = 1;
                                playEndSpeech(path_end_quiz);
                                socket.close();
                                backToEnter();
                            }
                        }
                    }
                } else if (quizStatus == 5) {
                    if (endMainSpeech() && quiz_answers[quiz_idx] == -1) {
                        if (ansClicked == 1) {
                            quiz_answers[quiz_idx] = 1;
                            quizStep5();
                        } else if (ansClicked == 2) {
                            quiz_answers[quiz_idx] = 0;
                            quizStep5();
                        } else {

                        }
                    }
                } else {

                }
            }
        }

        socket.onclose = () => {
            console.log({ event: 'onclose' });
        }

        socket.onerror = (error) => {
            console.log({ event: 'onerror', error });
        }
    })
}

function playBetweenSpeech(speechPath) {
    betweenSpeech = new Audio(speechPath);
    betweenSpeech.play();
    if (quizStatus == 1){
        $("#div_quiz_done").html(strQuiz.intro);
        $("#div_quiz_done").typewrite({
            'delay': 50, 
            'extra_char': '', 
            'trim': true, 
            'callback': null
        });
    }
    betweenSpeech.addEventListener('ended', function(){
        if (quizStatus == 1) {
            $("#div_answer_quiz").show();
        }
        between_main = 2;
    });
}

function playMainSpeech(speechPath, idx) {
    mainSpeech = new Audio(speechPath);
    mainSpeech.play();
    $("#div_quiz_done").html(strQuiz.quiz_main[quiz_nums_main[idx] - 1]);
    $("#div_quiz_done").typewrite({
        'delay': 50, 
        'extra_char': '', 
        'trim': true, 
        'callback': null
    });
    mainSpeech.addEventListener('ended', function(){
        between_main = 1;
        quizStatus++;
        timeRespond = Date.now();
        $("#div_answer_quiz").show();
    });
}

function endBetweenSpeech() {
    if (betweenSpeech)
        return betweenSpeech.ended;
    return false;
}

function endMainSpeech() {
    if (mainSpeech)
        return mainSpeech.ended;
    return false;
}

function playEndSpeech(speechPath) {
    console.log(quizStatus);
    endSpeech = new Audio(speechPath);
    endSpeech.play();
    if (puzzle_solved){
        $("#div_quiz_done").html(strQuiz.correct);
        $("#div_quiz_done").typewrite({
            'delay': 150, 
            'extra_char': '', 
            'trim': true, 
            'callback': null
        });
    } else {
        // $("#div_quiz_done").html(strQuiz.wrong);
        // $("#div_quiz_done").typewrite({
        //     'delay': 50, 
        //     'extra_char': '', 
        //     'trim': true, 
        //     'callback': null
        // });
    }
    
}

function playRetrySpeech(speechPath) {
    retrySpeech = new Audio(speechPath);
    retrySpeech.play();
}

function endEndSpeech() {
    if (endSpeech)
        return endSpeech.ended;
    return false;
}

function endRetrySpeech() {
    if (retrySpeech)
        return retrySpeech.ended;
    return false;
}

function playEndEffect(speechPath) {
    endEffect = new Audio(speechPath);
    endEffect.play();
    endEffect.addEventListener('ended', function() {
        if (loop_idx < loops){
            this.currentTime = 0;
            this.play();
            loop_idx ++;
        } else {
            loop_idx = 0;
        }
    }, false);
}

function endEndEffect() {
    if (endEffect)
        return endEffect.ended;
    return false;
}

function containsAnswerYes(strSpeech) {
    for (var i=0; i<answers_yes.length; i++) {
        if (strSpeech.endsWith(answers_yes[i]))
            return 1;
    }
    return 0;
}

function containsAnswerNo(strSpeech) {
    for (var i=0; i<answers_no.length; i++) {
        if (strSpeech.endsWith(answers_no[i]))
            return 1;
    }
    return 0;
}

function judgeAnswers() {
    for (var i=0; i<3; i++){
        if (quiz_answers[i] != quiz_answers_correct[quiz_nums_main[i] - 1]) {
            return false;
        }
    }
    return true;
}

initQuestions();