var questions = 1;

function addQuestion(){
    questions++;

    var container = document.getElementById('quiz');

    container.innerHTML += '<div class="card>"><div class="question card-header"> Question ' + questions + '</div>';
    container.innerHTML += '<div><label>Question ' + questions + ':</label><input name="question' + questions + '" class="form-control" /></div>';
    container.innerHTML += '<div><label>Correct answer: </label><input name="answer'+ questions + '_0" class="form-control" /></div>';
    container.innerHTML += '<div><label>Inorrect answer: </label><input name="answer'+ questions + '_1" class="form-control" /></div>';
    container.innerHTML += '<div><label>Inorrect answer: </label><input name="answer'+ questions + '_2" class="form-control" /></div>';
    container.innerHTML += '<div><label>Inorrect answer: </label><input name="answer'+ questions + '_3" class="form-control" /></div></div>';
}