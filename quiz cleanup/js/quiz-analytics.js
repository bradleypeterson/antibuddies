//TODO: Retrieve actual analytics for the quiz.
//Dummy analytics
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

//TODO: Retrieve actual questions for the quiz.
//Dummy questions
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

//Calls fillAnalytics when the page is loaded.
window.onload = function(){
    var quizContainer = document.getElementById('quizQuestions');
    fillAnalytics();
    generateAnalytics(myQuestions, quizContainer);
}


function fillAnalytics(){
    //High score
    quizInformation.highScore = quizInformation.scoreArr[quizInformation.scoreArr.length - 1];
    //Low score
    quizInformation.lowScore = quizInformation.scoreArr[0];
    //Average score
    quizInformation.avgScore = quizInformation.scoreArr.reduce((a, b) => a + b, 0) / quizInformation.scoreArr.length;
    //Quartile 1 for candlestick graph. It marks the 25th percentile. It is the 1/4 mark in the ordered array.
    quizInformation.q1 = quizInformation.scoreArr[Math.floor(quizInformation.scoreArr.length * 1/4)];
    //Quartile 3 for candlestick graph. It marks the 75th percentile. It is the 3/4 mark in the ordered arry.
    quizInformation.q3 = quizInformation.scoreArr[Math.floor(quizInformation.scoreArr.length * 3/4)];

    //Fills in the #chart div with a candlestick chart.
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

//Fills in the questions and quizContainer with questions, answers, and analytics about those answers.
function generateAnalytics(questions, quizContainer){
    //Sets the quiz name.
    document.getElementById('quizInformation').innerHTML = '<div id="quizName">Quiz: ' + quizInformation.quizName + '</div>' + '<div id="quizTaken">Submissions: '+ quizInformation.taken + '</div>' + '<div id="possible">Max possible: ' + myQuestions.length + '</div>' + '<div id="avgScore">Average score: ' + quizInformation.avgScore + '</div>' + '<div id="highScore">High score: ' + quizInformation.highScore + '</div>' + '</div>' + '<div id="highScore">Low score: ' + quizInformation.lowScore + '</div>';
    //Builds questions and fills in their information.
    function showQuestions(questions, quizContainer){
        //Holds array of html strings that will be placed in the innerHTML of the quiz container.
        var output = [];
        //Holds array of html strings about answers that get added to the output array.
        var answers;

        //For each question.
        for(var i=0; i<questions.length; i++){
            //Empty the output array.
            answers = [];
            //For each answer.
            for(letter in questions[i].answers){
                //Create div for the question.
                answers.push('<div id="question' + i + '_' + letter +'" >');
                //If this is the correct answer, add a check mark next to it.
                if(letter == 0){
                    answers.push('<i class="fa fa-check" sytle="color:#00FF00; display:inline"></i>');
                }
                //Else add an 'x' next to it.
                else{
                    answers.push('<i class="fa fa-times" sytle="color:#00FF00; display:inline"></i>');
                }
                //Display the percentage of times that students chose this answer.
                answers.push(((questions[i].studentAnswers[letter] / quizInformation.taken) * 100) + '% ' + questions[i].answers[letter] + '</div>');
            }
            //TODO: Fix text color inside cards.
            //Add the answers inside a card div.
            output.push('<div class="card"><div class="card-body"><div class="question card-header">' + questions[i].question + '</div>' + '<div class="answers card-text">' + answers.join('') + '</div> <div id="explanation' + i + '" hidden>' + questions[i].displayAnswer + '</div></div></div>');
        }
        //Set the quizContainer's innerHTML to the combined html of the output array.
        quizContainer.innerHTML = output.join('');
    }
    //Call showQuestions.
    showQuestions(questions, quizContainer);
}