function populateQuizzes() {
  // this function will be called when the page loads and will return a button for each quiz in the database
}

//gets the questions from aws per quiz
function getQuizQuestions() {
  // this function will be called when a quiz button is clicked and will load all questions for that quiz onto the page

  //This is set up for only one quiz but can be set up for the others as well
  //TODO create buttons for each different quiz that's been created, get the courseID for each admin and the difficultly of each quiz to pull different quizzes.

  var difficulty = "1";
  var courseID = "1";

  // create JSON object for loginParams
  var questionParams = {
    FunctionName: "getPracticeQuestions",
    InvocationType: "RequestResponse",
    LogType: "None",
    Payload: '{"courseID":"' + String(courseID) +
      '","difficulty":"' + String(difficulty) + '"}',
  };

  lambda.invoke(questionParams, function (error, data) {
    if (error) {
      prompt(error, error.stack);
    } else {
      myQuestions = JSON.parse(data.Payload);
      console.log(myQuestions);
      adminQuizStart();
    }
  });

}

function addQuestion() {
  // will call this function when a user clicks the add question button
}

function deleteQuestion() {
  // will call this function when a user clicks the delete question button
}

function changeAnswer() {
  // will call this function when a user selects an answer to a question. it will figure out which quiz the answer is for by selecting the parent element
}


//places the answers per question into the admin quiz
function placeAnswers(answers, qi) {
  var questionhtml = document.getElementById(qi);
  var answerlist = [];

  var createList = document.createElement("UL");
  //var listOption = document.createElement("LI");

  //questionhtml.appendChild(createList);

  var logging = '';
  var answerLength = answers.PracticeQuestionAnswers.length;


  console.log(answers);

  var num = 0;

  for (var i = 0; i < answerLength; i++) {
    answerNumber = answers.PracticeQuestionAnswers[i].id;
    //console.log(answerNum);

    num++;

    var listOption = document.createElement("LI");
    var para = document.createElement("P");
    var idatt = document.createAttribute("id");
    idatt.value = "answer" + answerNumber;

    var nameatt = document.createAttribute("name");
    nameatt.value = "answer" + answerNumber;

    para.setAttributeNode(idatt);
    para.setAttributeNode(nameatt);

    var answer = num + ': ' + answers.PracticeQuestionAnswers[i].correctAnswer;

    var answerelement = document.createTextNode(answer);

    para.appendChild(answerelement);
    listOption.appendChild(para);
    createList.appendChild(listOption);
  }


  questionhtml.appendChild(createList);

}

//puts the answers from aws into the adminquiz html
function adminQuizStart() {
  var adminQuiz = document.getElementById("currentQuiz");

  var questions = [];

  var questionLength = myQuestions.PracticeQuestions.length;

  var addQuestionbtn = '<input type="image" id="addQuestionButton" src="AddQuestButton.png" onclick="addQuestion()" width="250" Height="100"/>';

  questions.push(addQuestionbtn);

  //inserts the questions from the lambda

  for (var i = 0; i < questionLength; i++) {
    var questionID = myQuestions.PracticeQuestions[i].id;

    console.log(questions);

    //get answers
    myAnswers = getAnswers(questionID);

    var deletebutton = '<input type="button" class="btns" id="delete"  name="btnsdele" onClick="deleteQuestion(' + questionID + ')" value="Delete"/>';

    var editbutton = '<input type="button" class="btns" id="edit" onClick="editQuestion(' + i + ')" value="Edit"/>';

    var header = '<h2>Question ' + (i + 1) + ': </h2>';

    var question = '<p>' + (myQuestions.PracticeQuestions[i].question);

    questions.push(
      '<div class="row"><div>' + editbutton + ' ' + deletebutton + '</div>' + ' ' + '<div id="' + questionID + '">' + ' ' + header + question + '</div></div>');
    adminQuiz.innerHTML = questions.join('');
  }

}

//submits a new question per quiz number
function submitNewQuestion() {
  var course = document.getElementById("selected_course_quiz").selectedIndex;
  console.log("Course: " + course);

  var section = document.getElementById("section_quiz").value;
  console.log("Section: " + section);

  //level
  var level;
  if (document.getElementById("level_quiz_1").checked == true) {
    level = "1";
  } else if (document.getElementById("level_quiz_2").checked == true) {
    level = "2";
  } else {
    level = "3";
  }
  console.log("Level: " + level);

  var questionText = document.getElementById("question_text_quiz").value;
  console.log("Question text: " + questionText);

  //get text answers
  var answer_a_txt = document.getElementById("answer_a").value;
  console.log("Answer a: " + answer_a_txt);
  var answer_b_txt = document.getElementById("answer_b").value;
  console.log("Answer b: " + answer_b_txt);
  var answer_c_txt = document.getElementById("answer_c").value;
  console.log("Answer c: " + answer_c_txt);
  var answer_d_txt = document.getElementById("answer_d").value;
  console.log("Answer d: " + answer_d_txt);

  var corr_answer;
  if (document.getElementById("check_answer_a").checked == true) {
    corr_answer = '0';
  } else if (document.getElementById("check_answer_b").checked == true) {
    corr_answer = '1';
  } else if (document.getElementById("check_answer_c").checked == true) {
    corr_answer = '2';
  } else {
    corr_answer = '3';
  }
  console.log("Correct answer: " + corr_answer);

  var notes = document.getElementById("notes_quiz").value;
  console.log("Notes: " + notes);

  var createQuestionParams = {
    FunctionName: "createPracticeQuestion",
    InvocationType: "RequestResponse",
    LogType: "None",
    Payload: '{"citemID":"' + String("3") +
      '","section":"' + String(section) +
      '","question":"' + String(questionText) +
      '","difficulty":"' + String(level) +
      '","correctAnswer":"' + String(corr_answer) +
      '","answerDesc":"' + String(notes) +
      '","answer1":"' + String(answer_a_txt) +
      '","answer2":"' + String(answer_b_txt) +
      '","answer3":"' + String(answer_c_txt) +
      '","answer4":"' + String(answer_d_txt) +
      '","num1":"' + String("0") +
      '","num2":"' + String("1") +
      '","num3":"' + String("2") +
      '","num4":"' + String("3") +
      '"}',
  };

  lambda.invoke(createQuestionParams, function (error, data) {
    if (error) {
      prompt(error, error.stack);
      alert("Question could not be created - Please try again");
      //TODO: Show create user error
    } else {
      console.log(data.FunctionName);
      console.log("newQuestion: " + data.Payload);
      newUserResponse = JSON.parse(data.Payload);
      alert("Your question was successfully created!");
      //window.location.href="admin.html";

      getPracticeQuestions();
    }
  });
}

//sets up the add question quiz page
function getQuizPage() {

}
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function addQuestion() {
  var adminQuiz = document.getElementById("currentQuiz");
  var questions = [];
  newQuestOn = true;
  questions.push('<div class="newQuestion_div">');
  questions.push('<form name="frmText">');
  questions.push('<select id="selected_course_quiz">');
  questions.push('<option value="" disabled="disabled" selected="selected">Please select a course</option>');
  questions.push('<option value="1">Immunhematology</option>');
  questions.push('<option value="2">Chemistry</option>');
  questions.push('<option value="3">Microbiology</option>');
  questions.push('<option value="4">Hematology</option>');
  questions.push('<option value="5">Immunology</option>');
  questions.push('<option value="6">Urinalysis</option>');
  questions.push('</select>');
  questions.push('<textarea id="section_quiz" placeholder="Enter your section here..."></textarea>');
  questions.push('<div>');
  questions.push('<span class="form-check">');
  questions.push('<input class="form-check-input" type="radio" name="exampleRadios" id="level_quiz_1" value="1">');
  questions.push('<label class="form-check-label" for="exampleRadios1">');
  questions.push('Beginner');
  questions.push('</label>');
  questions.push('</span>');
  questions.push('<span class="form-check">');
  questions.push('<input class="form-check-input" type="radio" name="exampleRadios" id="level_quiz_2" value="2">');
  questions.push('<label class="form-check-label" for="exampleRadios2">');
  questions.push('Intermediate');
  questions.push('</label>');
  questions.push('</span>');
  questions.push('<span class="form-check disabled">');
  questions.push('<input class="form-check-input" type="radio" name="exampleRadios" id="level_quiz_3" value="3">');
  questions.push('<label class="form-check-label" for="exampleRadios3">');
  questions.push('Advanced');
  questions.push('</label>');
  questions.push('</span>');
  questions.push('</div>');
  questions.push('<div>');
  questions.push('<textarea id="question_text_quiz" name="form_text" rows="10" cols="40" placeholder="Enter your question here..."></textarea>');
  questions.push('</div>');
  questions.push('<h5>Select correct answer</h5>');
  questions.push('<div class="options">');
  questions.push('<span><input type="radio" id="check_answer_a" name="correctAnswer" value="0"><label for="a">a</label><input type="" id="answer_a" /></span>');
  questions.push('<span><input type="radio" id="check_answer_b" name="correctAnswer" value="1"><label for="b">b</label><input type="" id="answer_b" /></span>');
  questions.push('<span><input type="radio" id="check_answer_c" name="correctAnswer" value="2"><label for="c">c</label><input type="" id="answer_c" /></span>');
  questions.push('<span><input type="radio" id="check_answer_d" name="correctAnswer" value="3"><label for="d">d</label><input type="" id="answer_d" /></span>');
  questions.push('</div>');
  questions.push('<div>');
  questions.push('<textarea id="notes_quiz" name="form_text" rows="10" cols="40" placeholder="Enter additional notes...(ex. Correct answer is B, can be found on page: )"></textarea>');
  questions.push('</div>');
  questions.push('</div class="subbtn" id="subButt">');
  questions.push('<button onclick="submitNewQuestion()" id="submit">Submit</button></div>');
  questions.push('</form>');
  questions.push('</div>');





  adminQuiz.innerHTML = questions.join('');
  //document.getElementById("newQuestion_div").style.display = "block";	
}

function editQuestion() {

}

function deleteQuestion(questionID) {

  // create JSON object for questionParams
  var questionParams = {
    FunctionName: "deletePracticeQuestion",
    InvocationType: "RequestResponse",
    LogType: "None",
    Payload: '{"questionID":"' + questionID + '"}',
  };

  lambda.invoke(questionParams, function (error, data) {
    if (error) {
      prompt(error, error.stack);
    } else {
      console.log("question " + questionID + " deleted");
      getPracticeQuestions();
    }
  });
}
