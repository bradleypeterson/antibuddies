///////////////
//Basic questions array structure
///////////////
// var myQuestion = [
//     {
//         question: "This string will be the question",
//         answers: [
//             'answer 0, which is always the correct answer',
//             'answer 1, which is incorrect',
//             'answer 2, which is incorrect',
//             'answer 3, which is incorrect',
//         ],
//         correctAnswer: '', //This will be blank until the answers are randomly rearranged.
//         displayAnswer: 'This will be an explanation of the answer'
//     }
// ]



//////////////
//This dummy array can be used to test the page
//in the event that the api goes down.
///////////// 
/*
//var quizName = "Sample Quiz #1";
// var myQuestions = [
//     {
//         question: "1. Which of the following antibodies can be neutralized by pooled human plasma?",
//         answers: [
//             'anti-Ch',
//             'anti-Kna',
//             'anti-Yka',
//             'anti-Csa'
//         ],
//         correctAnswer: '',
//         displayAnswer: 'Anti-Ch and anti-Rg can be neutralized by pooled human plasma because the Ch and Rg antigens reside on complement protein C4. Neutralization studies with pooled plasma can help confirm the antibody reactivity in a patient’s sample. (Source Harmening, 7th Edition, Chapter...)'
//     },
//     {
//         question: "2. The following test results are noted for a unit of blood labeled group A, Rh-negative: <br> Cells tested with: <br> anti-A anti-B anti-D <br> 4+ 0 3+ <br>  What should be done next?",
//         answers: [
//             'notify the collecting facility',
//             'transfuse as a group A, Rh-negative',
//             'transfuse as a group A, Rh-positive',
//             'discard the unit'
//         ],
//         correctAnswer: '',
//         displayAnswer: 'A serological test to confirm the ABO on all RBC units and Rh on units labeled as Rh-negative must be performed prior to transfusion. Any errors in labeling must be reported to the collecting facility. (Source AABB Standards, Section...)'
//     }
// ];
*/

//Keeps track of the correct answers.
var answerKey = [];

//Course ID to use with api.getQuizQuestions.
var course;

//Quiz ID to use with api.getQuizQuestions.
//Will need to be passed into the page for actual quizzes.
//var quizId = "5efa978c92c1290235963112"
var quizId

//Student ID to use with api.submitQuiz
//Will need to be passed into the page for actual quizzes.
//This student ID corresponds to user waceyts
var studentId = "5f2b63b0f669980959c93500"

var quizTitle;

   
//Builds questions on the page.
//questions = Array containing the quiz questions/answers.
//quizContainer = Id of the div that the quiz will be built inside of.
function showQuestions(questions, quizContainer){
    //Array that holds the html that will be pushed onto the page.
    var output = [];

    //TODO: Figure out if this variable is needed.
    var answers;

    //Loops through the questions array to build the html for the page.
    for(var i=0; i<questions.length; i++){
        
        //HoldS the randomly arranged answers for the question.
        var ansArray = [];

        //Holds the answer key.
        var key = [];

        //Array holds available places to put the answers.
        var places = [0,1,2,3];

        //Loops through possible answers.
        for(var j = 0; j < questions[i].answers.length; j++){
            //Randomly selects an available answer position.
            var ansNum = Math.floor(Math.random() * places.length);
            //Stores the answers number.
            key[j] = places[ansNum];
            //Stores the randomly arranged answer.
            ansArray[j] = questions[i].answers[places[ansNum]];

            //If the answer is correct(answer 0) store it's new random number.
            if(places[ansNum] == 0){
                questions[i].correctAnswer = j;
            }
            //Splice the used position from places.
            places.splice(ansNum, 1);
        }

        //This array will store the html string that will be eventually be put into the quiz container.
        answers = [];

        //For each answer in the ansArray, generates its html.
        //The use of 'letter' as a variable is left over from an earlier
        //iteration of this file where answers were given a defined letter
        //position instead of just an array position.
        for(letter in ansArray){

            // //Generates an html string and puts that string into the answers array.
            answers.push('<label class="radio row" id="question' + i + '_' + letter +'">' + '<input type="radio" name="question' + i + '" value="'+key[letter]+'">' + ansArray[letter] );

            // //If the answer is the correct answer, generates the html for a hidden
            // //checkmark that will indicate that the answer is correct.
            if(letter == questions[i].correctAnswer){
                answers.push('<span class="correct" hidden>&nbsp<i class="fa fa-check" sytle="color:#00FF00; display:inline"></i></span>'+ '</label>');
            }
            //Else, generate html for a hidden 'x' that will indicate that
            //the answer is incorrect.
            else{
                answers.push('<span class="incorrect" id="question' + i + '_' + key[letter] + 'incorrect" hidden>&nbsp<i class="fa fa-times" sytle="color:#00FF00; display:inline"></i></span>'+ '</label>');
            }
        }
        //TODO: Answer explanations are not currently in the database. Ask infrastructure to add answer explanations to the api.
        //Generates the div card that the question/answers will be held in
        //with the question as the card header.
        //Pushes that html into the output array.
        output.push('<div class="card"><div class="card-body"><div class="question card-header">' + questions[i].question + '</div>' + '<div class="answers">' + answers.join('') + '</div> <div id="explanation' + i + '" hidden>' + questions[i].displayAnswer + '</div></div></div>');
    }
    //Joins the combined output array to the innerHTML of the quiz container.
    quizContainer.append(output.join(''));
}


//Calculates and displays the results of the quiz.
//Triggered by pressing the submit button.
function showResults(questions, quizContainer, resultsContainer, submitButton){
//function showResults(v[quiz].questions, getElementById("quiz"), getElementById("results")){
    //Holds answer containers to check contents.
    //var answerContainers = quizContainer.querySelectorAll('.answers');
    var answerContainers = $(".answers");
    
    //Will hold the users answer for a given question.
    var userAnswer;
    
    //Tracks how many correct answers have been selected.
    var numCorrect = 0;

    //Array that will store which answers have been selected
    //so that information can be sent to the database.
    var userAnswers = [];
    
    //Stores the checkmark elements to display for correct answers.
    var cor = document.getElementsByClassName('correct');

    //Removes 'hidden' from all checkmarks, to show the student
    //which answers were correct.
    for(var j = 0; j < cor.length; j++){
        cor[j].hidden = false;
    }

    //Analyzes each question, and displays 'x's next to incorrect guesses.
    for(var i=0; i<questions.length; i++){
        //Stores the value of the selected radio button.
        userAnswer = parseInt((answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value);

        //Stores the user's answer in the userAnswers array to submit to database.
        userAnswers[i] = questions[i].answers[userAnswer];

        //If the user selected the correct answer, increment their score.
        //Else display 'x' next to their guess.
        if(userAnswer !=null){
            if(userAnswer===0){
                numCorrect++;
            }
            //Else, remove 'hidden' from the 'x' next to the user's answer
            //and display the explanation.
            else{
                if(userAnswer != 0){
                    //document.getElementById('question' + i + '_' + userAnswer).style.color = 'red';
                    document.getElementById('question' + i + '_' + userAnswer+'incorrect').hidden = false;
                }
                document.getElementById('explanation'+i).hidden = false;
            }
        }
    }
    //Shows the user's score in the innerHTML of the resultsContainer.
    resultsContainer.html('<div class="card"><div class="card-body">' + numCorrect + ' out of ' + questions.length + '(' + ((numCorrect/questions.length) * 100) + '%)</div></div>');
    
    //TODO: Test if this successfully submits quiz to database.
    //Submits quiz to database.
    var quizData = {
        quiz_id: quizId,
        user_id: studentId,
        answers: userAnswers,
    }
    //console.log(quizData);
    api.submitQuiz = (course, quizData)

    //TODO: Add confirmation message.
    //Disable the submit button to prevent double submissions.
    submitButton.prop('disabled', true);
}


////////////////////////////
///////////////////////////
/////Earlier Iteration/////
///////////////////////////
///////////////////////////

// (function() 
//  {
//     var questions = []; //Array for questions
    
    
//     var selections = []; //Array for users choices
    
//     var quiz = $('#quiz');
//     var adminquiz = $('#currentQuiz');
    
//     loadQuestions();
    
//     displayQuestions();
//     adminQuizStart();
//     console.log(questions);
//     //Click handler for 'submit' button
//     $('#submit').on('click', function(e) {
//         e.preventDefault();
        
        
        
//         //choose();
        
//         //showResults();
//     });
    
    
//     function loadQuestions()
//     {
//         questions = [{
//         question: "Which of the following antibodies can be neutralized by pooled human plasma?",
//         choices: {
//             a: 'anti-Kna', 
//             b: 'anti-Ch', 
//             c: 'anti-Yka', 
//             d: 'anti-Csa'},
//         correctAnswer: 'b',
//         explanations: "Correct response is B. Anti-Ch and anti-Rg can be neutralized by pooled human plasma because the Ch and Rg antigens reside on complement protein C4. Neutralization studies with pooled plasma can help confirm the antibody reactivity in a patient’s sample. (Source Harmening, 7th Edition, Chapter...)"
//       }, {
//         // question: "The following test results are noted for a unit of blood labeled group A, Rh-negative: <br> Cells tested with: <br> anti-A anti-B anti-D <br> 4+ 0 3+ <br>  What should be done next?",
//         question: "The following test results are noted for a unit of blood labeled group A, Rh-negative: \n Cells tested with: \n anti-A anti-B anti-D <br> 4+ 0 3+ <br>  What should be done next?",

//         choices: {
//             a: 'transfuse as a group A, Rh-negative', 
//             b: 'transfuse as a group A, Rh-positive', 
//             c: 'notify the collecting facility', 
//             d: 'discard the unit'},
//         correctAnswer: 'c',
//         explanations: "Correct response is C. A serological test to confirm the ABO on all RBC units and Rh on units labeled as Rh-negative must be performed prior to transfusion. Any errors in labeling must be reported to the collecting facility. (Source AABB Standards, Section...)"
//       }]
//     questions = getStudentQuestions();
//     }
    
    
//       // Creates and returns the div that contains the questions and 
//     // the answer selections
//     function createQuestionElement(index) 
//     {
//         var qElement = $('<div class="row">', {
//           id: 'question'+index
//         });

//         var header = $('<h2>Question ' + (index + 1) + ':</h2>');
//         qElement.append(header);

//         var question = $('<p>').append(questions[index].question);
//         qElement.append(question);
//         //console.log(qElement);

//         var radioButtons = createRadios(index);
//         qElement.append(radioButtons);

//         return qElement;
//     }
    
//     // Creates a list of the answer choices as radio inputs
//       function createRadios(index) 
//     {
//         var radioList = $('<ul>');
//         var item;
//         var input = '';
        
//         answers = [];
        
//         for (letter in questions[index].choices)
//             {
//                 item = $('<li>');
//                 input = '<input type="radio" name="answer'+letter+'" value="' + letter + ' ">' + letter + ': ';
//                 input += questions[index].choices[letter];
//                 item.append(input);
//                 radioList.append(item);
//             }
        
//         return radioList;
//      }

//       // Reads the user selection and pushes the value to an array
//       function choose() 
//     {
        

//         var userAnswer = '';
//         var numCorrect = 0;
        
//         var checkempty = 0;
        
        
//         for(var i = 0; i < questions.length; i++)
//             {
//                 console.log("Question "+ i);
//                 for (letter in questions[i].choices)
//                     {
//                         var x = document.getElementsByName("answer"+letter).checked;
//                         console.log(x);
//                         if (!x)
//                             {
//                                 checkempty++;
//                             }
                            
//                     }
                
//                 console.log(checkempty);
                
//                 //userAnswer = (answers[i].querySelector('input[name=questions'+i+']:checked')||{}).value;
                
//                 //correct answers
//                 /*if(userAnswer == questions[i].correctAnswer)
//                     {
//                         numCorrect++;
//                     }
//                 else
//                     {
                        
//                     }*/
                
//             }
          
//       }
    

    

//     function displayQuestions()
//     {
//         quiz.fadeOut(function() 
//         {
//             var questionlength = questions.length;
            
//             //console.log(questionlength);
            
//             for (var i = 0; i < questionlength; i++)
//             {
//                 var nextQuestion = createQuestionElement(i);
//                 quiz.append(nextQuestion).fadeIn();
//             }
//         });
//     }
    
//       // Computes score and returns a paragraph element to be displayed
//     function displayScore() 
//     {
//         var score = $('<p>',{id: 'question'});

//         var numCorrect = 0;
//         for (var i = 0; i < selections.length; i++) 
//         {
//             if (selections[i] === questions[i].correctAnswer) 
//             {
//                 numCorrect++;
//             }
//         }

//         score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!');
        
//         return score;
//     }
    
//     //for admin quiz page, to be used to determine if there is already a quiz to edit
//     function editQuizStart()
//     {
//         adminquiz.fadeOut(function() 
//         {
//             var questionlength = questions.length;
            
            
            
//             for (var i = 0; i < questionlength; i++)
//             {
//                 var nextQuestion = $('<div>', { id: 'question'+i});
            
                
//                 //add buttons for edit or remove per question
//                 var deletebutton = $('<input type="button" class="btns" id="delete" name="btnsdele"  value="Delete" /> ');
//                 nextQuestion.append(deletebutton);
                
                
                
//                 var editbutton = $('<input type="button" class="btns" id="edit" onClick="editQuestion('+i+')" value="Edit"/>');
//                 nextQuestion.append(editbutton);

                
//                 var header = $('<h2>Question ' + (i + 1) + ':</h2>');
                
//                 nextQuestion.append(header);
                
//                 var question = $('<p>').append(questions[i].question);
//                 nextQuestion.append(question);
                
                
//                 adminquiz.append(nextQuestion).fadeIn();
                
//                 var answersh = viewAnswers(i);
//                 adminquiz.append(answersh);
                
//                var deleteButtons = document.getElementsByName("btnsdele");
//                 console.log(deleteButtons);

                    
                
//             }
            
            
//         });
//     }
    
    
//     function viewAnswers(index)
//     {
//         var questionList = $('<ul>');
//         var item;
//         var input = '';
//         var count = 0;
        
//         answers = [];
        
//         for (letter in questions[index].choices)
//             {
                
//                 item = $('<li>');
//                 input = '<p name="answer'+letter+'" id="'+index+letter+'">' + letter + ': ';
//                 input += questions[index].choices[letter];
//                 item.append(input);
//                 questionList.append(item);

                
//                 if(letter == questions[index].correctAnswer)
//                 {
//                     item = $('<li>');
//                     input = '<p name="answer'+letter+'" id="CorrectAnswer">' + letter + ': ';
//                     input += questions[index].choices[letter];
//                     item.append(input);
//                     questionList.append(item);
//                 }
//                 else
//                 {
//                     item = $('<li>');
//                     input = '<p name="answer'+letter+'" id="'+index+letter+'">' + letter + ': ';
//                     input += questions[index].choices[letter];
//                     item.append(input);
//                     questionList.append(item);
//                 }
//             }
        
//         return questionList;
//     }
    
//     function addQuestion()
// {
//     console.log("add working");
// }

    
// function editQuestions(index)
// {
        
// }
             
// function deleteQuestion(index)
// {
//     console.log(index);
//     questions.splice(index,1);
    
// }
    
// } )();

// function getStudentQuestions() {

  
//     //This is set up for only one quiz but can be set up for the others as well
//     //TODO create buttons for each different quiz that's been created, get the courseID for each admin and the difficultly of each quiz to pull different quizzes.
    
//     var difficulty = "1";
//     var courseID = "1";
    
//     //document.getElementById("get").style.visibility = "hidden";

//   // create JSON object for loginParams
//   var questionParams = {
//     FunctionName : "getPracticeQuestions",
//     InvocationType : "RequestResponse",
//     LogType : "None",
//     Payload : '{"courseID":"'+String(courseID)+
//               '","difficulty":"'+String(difficulty)+'"}',
//   };

//   lambda.invoke(questionParams, function(error, data) {
//     if (error) {
//       prompt(error, error.stack);
//     } else {
     
//       myQuestions = JSON.parse(data.Payload);
//         console.log(myQuestions);
        
        

//         studentQuizStart();
       
//     }
//   });

// }

// //gets the answers from aws per question
// function getStudentAnswers(questionID) {
    
//     var Answers = [{}];
//     var listAnswers = [];
//     var check;

//   // create JSON object for loginParams
//   var questionParams = {
//     FunctionName : "getPracticeQuestionAnswers",
//     InvocationType : "RequestResponse",
//     LogType : "None",
//     Payload : '{"questionID":"'+String(questionID)+'"}',
//   };

//   lambda.invoke(questionParams, function(error, data) {
//     if (error) {
//       prompt(error, error.stack);
//     } else {
     
//         Answers = JSON.parse(data.Payload);
        
//         placeAnswers(Answers, questionID);
        
//         var answerLength = Answers.PracticeQuestionAnswers.length;
//     }
//   });
// }

// function studentQuizStart()
// {
//     var studentQuiz = document.getElementById("currentQuiz");
    
//     var questions = [];

//     var questionLength = myQuestions.PracticeQuestions.length;
    
//     var addQuestionbtn = '<input type="image" id="addQuestionButton" src="AddQuestButton.png" onclick="addQuestion()" width="250" Height="100"/>';
    
//     questions.push(addQuestionbtn);
    
//     //inserts the questions from the lambda
    
//     for (var i = 0; i < questionLength; i++)
//         {
//             var questionID = myQuestions.PracticeQuestions[i].id;
            
//             console.log(questions);
            
//             //get answers
//             myAnswers = getAnswers(questionID);
                
//             //var deletebutton = '<input type="button" class="btns" id="delete"  name="btnsdele" onClick="deleteQuestion('+questionID+')" value="Delete"/>';
            
//             //var editbutton = '<input type="button" class="btns" id="edit" onClick="editQuestion('+i+')" value="Edit"/>';
            
//             var header = '<h2>Question ' + (i+1) + ': </h2>';
            
//             var question = '<p>'+(myQuestions.PracticeQuestions[i].question);
            
//             questions.push(
//                 '<div class="row"><div>' + '</div>' + ' ' + '<div id="'+questionID+'">' + ' ' + header + question + '</div></div>');
//             studentQuiz.innerHTML = questions.join('');

//             console.log(myQuestions);
//         }  
    
// }