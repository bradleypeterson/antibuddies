var quizInformation = {
    quizId: 1,
    quizName: "Sample Quiz #1",
    taken: 100,
    scoreArr: [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6],
    highScore: 0,
    lowScore: 0,
    avgScore: 0,
    q1: 0,
    q3: 0,
};

var myQuestions = [
    {
        question: "1. Which of the following antibodies can be neutralized by pooled human plasma?",
        answers: [
            'anti-Ch',
            'anti-Kna',
            'anti-Yka',
            'anti-Csa'
        ],
        studentAnswers: [
            50,
            10,
            15,
            25
        ],
        displayAnswer: 'Anti-Ch and anti-Rg can be neutralized by pooled human plasma because the Ch and Rg antigens reside on complement protein C4. Neutralization studies with pooled plasma can help confirm the antibody reactivity in a patient’s sample. (Source Harmening, 7th Edition, Chapter...)'
    },
    {
        question: "2. The following test results are noted for a unit of blood labeled group A, Rh-negative: <br> Cells tested with: <br> anti-A anti-B anti-D <br> 4+ 0 3+ <br>  What should be done next?",
        answers: [
            'notify the collecting facility',
            'transfuse as a group A, Rh-negative',
            'transfuse as a group A, Rh-positive',
            'discard the unit'
        ],
        studentAnswers: [
            70,
            10,
            15,
            5
        ],
        displayAnswer: 'A serological test to confirm the ABO on all RBC units and Rh on units labeled as Rh-negative must be performed prior to transfusion. Any errors in labeling must be reported to the collecting facility. (Source AABB Standards, Section...)'
    }
];

window.onload = function(){
    var quizContainer = document.getElementById('quizQuestions');
    fillAnalytics();
    generateAnalytics(myQuestions, quizContainer);
}

function fillAnalytics(){
    quizInformation.highScore = quizInformation.scoreArr[quizInformation.scoreArr.length - 1];
    quizInformation.lowScore = quizInformation.scoreArr[0];
    quizInformation.avgScore = quizInformation.scoreArr.reduce((a, b) => a + b, 0) / quizInformation.scoreArr.length;
    quizInformation.q1 = quizInformation.scoreArr[Math.floor(quizInformation.scoreArr.length * 1/4)];
    quizInformation.q3 = quizInformation.scoreArr[Math.floor(quizInformation.scoreArr.length * 3/4)];

    google.charts.setOnLoadCallback(drawChart);
                    function drawChart()
                    {
                        var data = new google.visualization.arrayToDataTable([['Scores', quizInformation.lowScore, quizInformation.q1, quizInformation.q3, quizInformation.highScore]], true);

                        var options = {
                            legend: 'none',
                            orientation: 'vertical',
                            height: 120,
                        };
                        var chart = new google.visualization.CandlestickChart(document.getElementById('chart'));
                        chart.draw(data, options);
                    }
}

function generateAnalytics(questions, quizContainer){
    document.getElementById('quizInformation').innerHTML = '<div id="quizName">Quiz: ' + quizInformation.quizName + '</div>' + '<div id="quizTaken">Submissions: '+ quizInformation.taken + '</div>' + '<div id="possible">Max possible: ' + myQuestions.length + '</div>' + '<div id="avgScore">Average score: ' + quizInformation.avgScore + '</div>' + '<div id="highScore">High score: ' + quizInformation.highScore + '</div>' + '</div>' + '<div id="highScore">Low score: ' + quizInformation.lowScore + '</div>';
    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;
        for(var i=0; i<questions.length; i++){
            answers = [];
            for(letter in questions[i].answers){
                
                answers.push('<div id="question' + i + '_' + letter +'" >');
                if(letter == 0){
                    answers.push('<i class="fa fa-check" sytle="color:#00FF00; display:inline"></i>');
                }
                else{
                    answers.push('<i class="fa fa-times" sytle="color:#00FF00; display:inline"></i>');
                }
                answers.push(((questions[i].studentAnswers[letter] / quizInformation.taken) * 100) + '% ' + questions[i].answers[letter] + '</div>');
            }
            output.push('<div class="card>"><div class="question card-header">' + questions[i].question + '</div>' + '<div class="answers card-text">' + answers.join('') + '</div> <div id="explanation' + i + '" hidden>' + questions[i].displayAnswer + '</div></div>');
            // output.push('<div class="question row ">' + questions[i].question  + '<div class="answers">' + answers.join('') + '</div></div>');
        }
        quizContainer.innerHTML = output.join('');
    }
    showQuestions(questions, quizContainer);
}