 //TODO additional UI elements to interact with highscore.
 //TODO find proper local storage code and make function for getting final high score and storing it. 
 //TODO js to move additional UI around at quiz beginings. Button also needs to function.
 const welcome = document.getElementById("welcome");
 const startBtn = document.getElementById("start-quiz");
 const body = document.body;
 var whichQuestion = "none";
 
 //Timer object. intiates timer and holds related elements and functions.
 var timer = {
    min: 0,
    sec: 0,
    clock: document.createElement("div"),
    clockWrapper: document.createElement("div"),
    generate: function (){
        body.appendChild(this.clockWrapper);
        this.clockWrapper.appendChild(this.clock);
        this.clockWrapper.setAttribute("style" , "border: 5px solid #000000; position: absolute; top: 15px; right: 50px; width: 100px; height: 50px; display: flex; justify-content: center; background-color: #000000; z-index: -1;");
        this.clock.setAttribute ("style" , "font-family: monospace; color: #57CE04; font-size: 40px; flex: 1 0 0px; text-align: center;");
        return;
    },
    start: function(){ 
       timer.min = 1;
       timer.sec = 15;
      var time = setInterval(()=>{
          if (timer.sec <= 9) {
          timer.clock.textContent = timer.min + ":0" + timer.sec;
          }
          else {
             timer.clock.textContent = timer.min + ":" + timer.sec;
          };
         if(timer.sec <= 0) {
             timer.min=timer.min - 1; 
             timer.sec = 59;
         }
         else {
            timer.sec = timer.sec - 1;
         };
         if (timer.min === 0 && timer.sec === 0){
            timer.clock.textContent = "0:00";
            clearInterval(time);
         };
         return;
      }, 1000);
      return;
   },
   calculateScore: function (){
      let score = this.min*60 + this.sec;
      return score;
   }
} 
//quiz object. Intializes and holds the majority of elements and functions that quiz contains/performs. primary object.
var quiz = {
   card: document.createElement("div"),
   cardWrapper: document.createElement("div"),
   question: document.createElement("h2"),
   answerOne: document.createElement("button"),
   answerTwo: document.createElement("button"),
   answerThree: document.createElement("button"),
   answerFour: document.createElement("button"),
   qArray: ["string" , "array" , "for", "primitive"],
   generate: function() {
      body.appendChild(this.cardWrapper);
      this.cardWrapper.appendChild(this.card);
      this.card.appendChild(this.question);
      this.card.appendChild(this.answerOne);
      this.card.appendChild(this.answerTwo);
      this.card.appendChild(this.answerThree);
      this.card.appendChild(this.answerFour);

      this.cardWrapper.setAttribute("class", "card");
      this.answerOne.setAttribute ("class" , "btn");
      this.answerTwo.setAttribute ("class" , "btn");
      this.answerThree.setAttribute ("class" , "btn");
      this.answerFour.setAttribute ("class" , "btn");
      this.card.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: nowrap;");
      this.cardWrapper.setAttribute( "style" , "border: 10px solid black; box-shadow: 5px 0px 15px black; padding: 50px, 100px; width:60%; left: 20%; min-height: 300px; ");

      return;
   },
   primitivesQuestion: function() {
      this.question.textContent = "Which of the following is not a primitive data type?";
      //answer is D
      this.answerOne.textContent = "A: integers";
      this.answerTwo.textContent = " B: string";
      this.answerThree.textContent = "C: boolean";
      this.answerFour.textContent = "D: Arrays";
      return;
   },
   forQuestion: function() {
      this.question.textContent = "which type of statement creates a loop of repeated code?";
      //answer is A
      this.answerOne.textContent = "A: a for statement ";
      this.answerTwo.textContent = " B: an if statement";
      this.answerThree.textContent = "C: a this statement";
      this.answerFour.textContent = "D: a loop statement";
      return;
   },
   stringQuestion: function() {
      this.question.textContent = "What characters when surrounding text do not make it a string?";
      //Answer is C
      this.answerOne.textContent = "A: \" \" ";
      this.answerTwo.textContent = " B: \' \'";
      this.answerThree.textContent = "C: / /";
      this.answerFour.textContent = "D: \` \`";;
      return;
   },
   arrayQuestion: function() {
      this.question.textContent = "What is stored in an array?";
      //Answer is B
      this.answerOne.textContent = "A: an integer";
      this.answerTwo.textContent = " B: a series of like values";
      this.answerThree.textContent = "C: a series of un-like values";
      this.answerFour.textContent = "D: for loops";
      return;
   },
   //builds the next question randomly, removing it from the sequence
   nextQuestion: function() {
         var q = this.qArray.splice(Math.floor(Math.random()* this.qArray.length), 1 );
         if (q[0] === "string"){
            this.stringQuestion();
            whichQuestion = q[0];
         }
         else if (q[0] === "array"){
            this.arrayQuestion();
            whichQuestion = q[0];

         }
         else if (q[0] === "for"){
            this.forQuestion();
            whichQuestion = q[0];

         }
         else if (q[0] === "primitive"){
            this.primitivesQuestion();
            whichQuestion = q[0];

         }
         //if there are no more questions the test ends
         else {
            this.cardWrapper.setAttribute("style" , "display: none;")
            end.finish();
            console.log("end");
         }
         return;
   }

}
var end = {
   card: document.createElement("div"),
   cardWrapper: document.createElement("div"),
   header: document.createElement("div"),
   heading: document.createElement("h2"),
   subtitle: document.createElement("div"),
   form: document.createElement("form"),
   formWrapper: document.createElement("div"),
   intialsInput: document.createElement("input"),
   submit: document.createElement("input"),
   intitals: "",
   finished: false,
   
   finish: function() {
      this.finished = true;
      score = timer.calculateScore();
      body.appendChild(this.cardWrapper);
      this.cardWrapper.appendChild(this.card);
      this.cardWrapper.appendChild (this.header);
      this.header.appendChild(this.heading);
      this.cardWrapper.appendChild(this.subtitle);
      this.cardWrapper.appendChild(this.formWrapper);
      this.formWrapper.appendChild(this.form);
      this.form.appendChild(this.intialsInput);
      this.form.appendChild(this.submit);

      this.cardWrapper.setAttribute("class", "card");
      this.intialsInput.setAttribute("type" , "text");
      this.submit.setAttribute("type" , "submit");

      this.form.setAttribute("style" , "display: flex; align-items: center;justify-contents: center; height:22px;");
      this.intialsInput.setAttribute("class" , "text-input");
      this.submit.setAttribute("id" , "submit");

      this.heading.setAttribute("style" , "text-align: left; margin: 15px;")
      this.card.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: nowrap;");
      this.cardWrapper.setAttribute( "style" , " padding: 50px, 100px; width:60%; left: 20%; justify-content: flex-start;");

      this.heading.textContent = "Finished!";
      this.subtitle.textContent = "your final score is: " + score;
   },
   
}
//function runs if the right answer is chosen.
function ifCorrect (){
   setTimeout(() => {
      body.setAttribute("style" , "background-color: #65F004;")
   }, 1);
   setTimeout(() => {
      body.setAttribute("style" , "background-color: var(--off-white);")
   }, 500);
};
//function runs if the wrong answer is chosen.
//TODO subtract time if wrong.
function ifWrong () {
   setTimeout(() => {
      body.setAttribute("style" , "background-color: #E32301;")
   }, 1);
   setTimeout(() => {
      body.setAttribute("style" , "background-color: var(--off-white);")
   }, 500);
};
//intiates even listeners. was going to do all this in quiz object but was running into errors put it out here for the time being. 
function buttonsWork () {
   startBtn.addEventListener("click", function() {
      welcome.style.display = "none";
      timer.generate();
       timer.start();
      quiz.generate();
      quiz.nextQuestion();
      return;
   } );

   quiz.answerOne.addEventListener("click", function(){
      if(whichQuestion === "for"){
            ifCorrect();
         }
      else {
         ifWrong();
      }
      quiz.nextQuestion ();
   });
   quiz.answerTwo.addEventListener ("click" , function(){
      if(whichQuestion === "array"){
         ifCorrect();
      }
      else {
         ifWrong();
      }
      quiz.nextQuestion ();
   });
   quiz.answerThree.addEventListener("click", function(){
      if(whichQuestion === "string"){
         ifCorrect();

      }
      else {
         ifWrong();
      }
      quiz.nextQuestion ();
   });
   quiz.answerFour.addEventListener("click" , function(){
      if(whichQuestion === "primitive"){
         ifCorrect();
      }
      else {
         ifWrong();
      }
      quiz.nextQuestion ();
   });
}
//starts buttons working, which starts the rest of the code running.
buttonsWork();



      