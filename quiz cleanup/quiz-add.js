var questions = 0;
var course = "CS4450";

function addQuestion(){
    questions++;

    var container = document.getElementById('questions');
    var newquestion = document.createElement('div');
    newquestion.innerHTML += '<hr><div class="card>"><div class="question card-header"> Question ' + (questions+1) + '</div>';
    newquestion.innerHTML += '<div><label>Question :</label><input id="question' + questions + '" class="form-control" /></div>';
    newquestion.innerHTML += '<div><label>Correct answer: </label><input id="answer'+ questions + '_0" class="form-control" /></div>';
    newquestion.innerHTML += '<div><label>Inorrect answer: </label><input id="answer'+ questions + '_1" class="form-control" /></div>';
    newquestion.innerHTML += '<div><label>Inorrect answer: </label><input id="answer'+ questions + '_2" class="form-control" /></div>';
    newquestion.innerHTML += '<div><label>Inorrect answer: </label><input id="answer'+ questions + '_3" class="form-control" /></div></div>';
    container.appendChild(newquestion);
}

function submitQuiz(){
    //console.log("submitting");
    
    var quiz = {
        title: document.getElementById("quizNameInput").value,
        questions:[]
    }

    for(var i = 0; i <= questions; i++)
    {
        quiz.questions[i] = {question: document.getElementById("question" + i).value,
                answers: [
                    document.getElementById("answer" + i + "_0").value,
                    document.getElementById("answer" + i + "_1").value,
                    document.getElementById("answer" + i + "_2").value,
                    document.getElementById("answer" + i + "_3").value,
                ]
            };
    }
    document.getElementById("submit").disabled = true;
    api.addQuiz(course, quiz);
    //console.log(quiz);
}