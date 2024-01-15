//TODO add event listeners for go back and clear score. add time subtraction to incorrect answers
 const welcome = document.getElementById("welcome");
 const startBtn = document.getElementById("start-quiz");
 const body = document.body;
 const viewScores = document.getElementById("a-wrapper");
 var whichQuestion = "none";

 
 //Timer object. intiates timer and holds related elements and functions.
 var timer = {
    min: 0,
    sec: 0,
    time: null,
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
      timer.time = setInterval(()=>{
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
            clearInterval(timer.time);
            end.finish();
         };
         return;
      }, 1000);
      return;
   },
   calculateScore: function (){
      clearInterval(this.time);
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
   scoreTableWrapper: document.getElementById("score-wrapper"),
   scoreTable: document.getElementById("scoreboard"),
   buttonWrapper: document.createElement("div"),
   backButton: document.createElement("button"),
   clearScoresBtn: document.createElement("button"),
   finished: false,

   finish: function() {
      end.finished = true;
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
      
      this.cardWrapper.setAttribute( "style" , " padding: 50px, 100px; left: 40%; ");
      this.card.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: nowrap;");
      this.heading.setAttribute("style" , "text-align: left; margin: 15px;");
      this.subtitle.setAttribute("style" , "text-align: left; margin: 0 0 15px 15px;");
      this.formWrapper.setAttribute("style" , "margin: 15px;")
      this.form.setAttribute("style" , "display: flex; align-items: center;justify-contents: center; height:22px;");
      this.intialsInput.setAttribute("class" , "text-input");
      this.submit.setAttribute("id" , "submit");

      quiz.cardWrapper.setAttribute("style" , "display: none;");
      this.heading.textContent = "Finished!";
      this.subtitle.textContent = "your final score is: " + score;
   },
   scorePage: function () {
      end.finished = true;
      body.appendChild(this.scoreTableWrapper);
      this.scoreTableWrapper.appendChild (this.header);
      this.header.appendChild(this.heading);
      this.scoreTableWrapper.appendChild(this.scoreTable);
      this.scoreTableWrapper.appendChild(this.buttonWrapper);
      this.buttonWrapper.appendChild(this.backButton);
      this.buttonWrapper.appendChild(this.clearScoresBtn);



      
      this.scoreTableWrapper.setAttribute("class" , "card");
      this.scoreTableWrapper.setAttribute("style" ,"display: flex; width: 300px;");
      this.heading.setAttribute("style" , "text-align: left; margin: 15px;");
      this.heading.textContent = "Highscores";
      
      this.scoreTable.setAttribute("id" , "scoreboard");
      
      this.buttonWrapper.setAttribute("style" , "display: flex; margin: 15px; justify-contents: flex start;")
      this.backButton.setAttribute("class" , "btn");
      this.backButton.setAttribute("style" , "font-size: 15px; text-wrap: nowrap; padding: 15px; margin: 10px 20px;");
      this.backButton.textContent = "go back";
      this.clearScoresBtn.setAttribute("class" , "btn");
      this.clearScoresBtn.setAttribute("style" , "font-size: 15px; text-wrap: nowrap; padding: 15px; margin: 10px 20px;");
      this.clearScoresBtn.textContent = "clear scores";


      this.cardWrapper.setAttribute("style" , "display: none;");
      this.formWrapper.setAttribute("style" , "display: none;")
      this.subtitle.setAttribute("style" , "display: none;");
      quiz.cardWrapper.setAttribute("style" , "display: none;");
      welcome.setAttribute("style" , "display: none;");

      //--------------------score table-------------------------\\
      var array = sortStorage();
      for(var i =0; i< array.length; i++){
         var sc =array[i];
         var li = new localScore(i , sc[0] , sc[1]);
      }

   },
   
}

class localScore {
   constructor(n, name, score) {
      this.n = n;
      this.name = name;
      this.score = score;
      this.line = document.createElement("li");
      this.line.setAttribute ("class" , "high-score");
      end.scoreTable.appendChild(this.line);
      this.line.textContent = `${this.name} -- ${this.score}`
   };

   
}

function sortStorage() {
   var array = [];
   
   for(var i = localStorage.length-1; i >=0; i --){
      let large = "";
      let tempName = "";
      var tempscore = [];
      large =localStorage.getItem(localStorage.key(i))
      tempName=localStorage.key(i);
      for(var j = localStorage.length-1; j >= 0; j--){
         if(large < localStorage.getItem(localStorage.key(j))){
            large =localStorage.getItem(localStorage.key(j));
            tempName =localStorage.key(j);
         }
      }
      localStorage.removeItem(tempName);
      tempscore.push(tempName);
      tempscore.push(large);
      array.push(tempscore);
      console.log(array);
   }
   for( let i = 0; i < array.length; i++){
      var sc = array[i];
      localStorage.setItem(sc[0], (sc[1]));
   };
   return array;
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
   viewScores.addEventListener("click" , function(){
      end.scorePage();
      return;
   });
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
      quiz.nextQuestion();
   });
   end.submit.addEventListener("click" , function(){
      event.preventDefault();
      let intials = end.intialsInput.value;
      localStorage.setItem(intials, timer.calculateScore());
      end.scorePage();
      console.log(localStorage);
   });
}
//starts buttons working, which starts the rest of the code running.
buttonsWork();



      