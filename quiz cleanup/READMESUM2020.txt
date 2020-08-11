-OVERVIEW-

The admin files are as follows: manage-quizzes.html, quiz-analytics.html, quiz.html, index.html, login.html, 
admin-quiz.html, admin-quiz-add.html, quiz-results.html, styleQuizCleanUp.css, quizCleanUpScripts.js.
The student files are as follows: study-materials.html, student-home-page.html, index.html, login.html, styleQuizCleanUp.css, quizCleanUpScripts.js.
We were able to connect to the backend. I will include the links to the functionality of the backend. 
They are in the API document.
We were able to clean up the project and maintain a constant theme throughout the website.
We spent a lot of time cleaning up different button sizes and overall elements on the pages. 
We did add a few html pages and separate the files into respective groups. 
We have been able to successfully connect to the API and the login page works. 
However, it does need some work to ensure it is a secure login and the website tracks who is currently logged in.
Student-home-page has the default outline of what we envision the layout to be. You can use this to lay out the rest of the html pages. 
As I mentioned before we worked mostly on the layout of the pages and cleaning up prior styles. 
The functionality of the buttons will be left to you. Most of the html pages should look similar to one another. 
The API connection should allow you to retrieve quiz results, user info, quizzes and anything that is in a database. 
If you have any questions about the database you should communicate with the group that took over the API/Database.
The footer in each page just allows for updating text here of how recent the last push is. It is up to you if you want to keep it or remove It once published.
Right now, the menu link for study material is leading to the student home page. However, there should be two study material home pages. 
One for the admin to add the material and then another where the student can just access the material. The student home page should be a separate landing page.
For the index.html (log off/log on screen) the content should be in the center lined up underneath the picture.
The login.html page is not necessary. You need to do the functionality of the API in the index.html page. 
The login.html page is just there to test the API connection.
We used GitHub desktop and visual studios code for mac devices. And we just opened the html pages with the default or chose browser. 
Each group in the project created a repo but Brad ultimately created his own repo that we all worked off of with different branches.


---------------------------------------------------------------


-API functionality-

The infrastructure group in this project were able to put together a great and easy API connection with different functionalities. 
Attached are the links that they gave us. The documentation link has an explanation of how everything works. 
Please get familiar with these functionalities before starting anything major on the project as it will make it a lot easier.
https://antibuddies-api.glitch.me/api
https://antibuddies-api.glitch.me/
https://antibuddies-api.glitch.me/js/api.js
https://antibuddies-api.glitch.me/documentation.html


---------------------------------------------------------------


-FIGMA-
Attached are the Figma’s that our group presented to Justin (the client). He approved these layouts.
Admin add quiz -- https://www.figma.com/proto/bjSXwTTamb4brN5hZnBFPR/AdminAddQuiz?node-id=0%3A1

Student quiz view -- https://www.figma.com/file/A8MHxTmBHYhvhLJuanUI4S/StudentQuizView?node-id=0%3A1

Admin edit quiz –
https://www.figma.com/file/Y1I40Mwh9i7hmNUApNWrIO/AdminEditQuiz?node-id=0%3A1

Figma is a program used to lay out what the possible user interfaces would look like. 
If you would like to learn how to use Figma please just google Figma tutorials. It is a pretty easy program to learn.  
Please keep in mind that in order to maintain a constant theme you will have to communicate with the other groups of this project. 
The main layout colors/styles/fonts and everything are kept in the css file called ‘ styleQuizCleanUp.css’.


---------------------------------------------------------------


-Future tasks-

quiz.html:
    -Consider finding a more efficient submit quiz function.

quiz.js:
    -Retrieve course, quizId, and studentId to fill variables.
    -Implement answer explanations after they have been added to the database.
    -Fix student quiz submission.
    -Add confirmation message on success.

quiz-add.html:
    -Add answer 1 explanation once they are in the database.
    -Add buttons for images on question 1 and its answers.


quiz-add.js:
    -Use login to check user permissions.
    -Add answer explanations once they are in the database.
    -Add validation so only complete answers are submitted to the database.
    -Add a remove question functionality.
    -Add confirmation message and redirect on successful submission.
    -Add funtionality to use images in questions and answers once those features are complete on the backend.

quiz-analytics.js:
    -Retrieve actual analytics and questions.
    -Fix text color inside question/answer cards.

user authentication
    - right now the user authentication/signup only kind of works. a person can sign up just fine,
    but when you go to login/authenticate the token the api sends back isn't actually useful.
    the api needs to check and validate tokens when requests are made to the api. right now the
    authentication works by checking if they api has sent back a token. if it did, authentication was successful
    thus, the client (javascript) creates a variable that stores the current unix epoch in local storage.
    when trying to access pages that require a logged in user, the client looks up the time that it stored earlier.
    if it doesn't exist or is more than 5 hours old (the time the real token lasts on the server), then the user will
    be forced to reauthenticate.