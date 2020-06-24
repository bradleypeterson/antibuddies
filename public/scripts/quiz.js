var myQuestions = [
    {
        question: "1. Which of the following antibodies can be neutralized by pooled human plasma?",
        answers: {
            a: 'anti-Kna',
            b: 'anti-Ch',
            c: 'anti-Yka',
            d: 'anti-Csa'
        },
        correctAnswer: 'b',
        displayAnswer: 'Correct response is B. Anti-Ch and anti-Rg can be neutralized by pooled human plasma because the Ch and Rg antigens reside on complement protein C4. Neutralization studies with pooled plasma can help confirm the antibody reactivity in a patient’s sample. (Source Harmening, 7th Edition, Chapter...)'
    },
    {
        question: "2. The following test results are noted for a unit of blood labeled group A, Rh-negative: <br> Cells tested with: <br> anti-A anti-B anti-D <br> 4+ 0 3+ <br>  What should be done next?",
        answers: {
            a: 'transfuse as a group A, Rh-negative',
            b: 'transfuse as a group A, Rh-positive',
            c: 'notify the collecting facility',
            d: 'discard the unit'
        },
        correctAnswer: 'c',
        displayAnswer: 'Correct response is C. A serological test to confirm the ABO on all RBC units and Rh on units labeled as Rh-negative must be performed prior to transfusion. Any errors in labeling must be reported to the collecting facility. (Source AABB Standards, Section...)'
    }
];

window.onload = function(){
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');

    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

}


// generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for(var i=0; i<questions.length; i++){
            answers = [];
            for(letter in questions[i].answers){
                answers.push('<label class="radio row">' + '<input type="radio" name="question' + i + '" value="'+letter+'">' + letter.toUpperCase() + ': ' + questions[i].answers[letter] + '</label>');
            }
            output.push('<div class="card>"><div class="question card-header">' + questions[i].question + '</div>' + '<div class="answers card-text">' + answers.join('') + '</div> <div id="explanation' + i + '" hidden>' + questions[i].displayAnswer + '</div></div><hr>');
            // output.push('<div class="question row ">' + questions[i].question  + '<div class="answers">' + answers.join('') + '</div></div>');
        }
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        var answerContainers = quizContainer.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;
        
        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                answerContainers[i].style.color = 'lightgreen';
                //console.log(i + "is correct")
            }

            else{
                answerContainers[i].style.color = 'red';
                //if (userAnswer!==questions[i].correctAnswer) {
                document.getElementById('explanation'+i).hidden = false;
                    //console.log(questions[i].displayAnswer);
                //}
                // if (userAnswer!==questions[i].correctAnswer) {
                //     //window.alert("Correct response is C. A serological test to confirm the ABO on all RBC units and Rh on units labeled as Rh-negative must be performed prior to transfusion. Any errors in labeling must be reported to the collecting facility. (Source AABB Standards, Section...)");
                //     document.getElementById('explanation'+i).hidden = false;
                //     //console.log(questions[i].displayAnswer);
                // }
            }
        }
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }
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