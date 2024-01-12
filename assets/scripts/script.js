 const welcome = document.getElementById("welcome");
 const startBtn = document.getElementById("start-quiz");
 const body = document.body;
 
 
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
   }
} 

var quiz = {
   card: document.createElement("div"),
   question: document.createElement("h2"),
   answerOne: document.createElement("button"),
   answerTwo: document.createElement("button"),
   answerThree: document.createElement("button"),
   answerFour: document.createElement("button"),
   generate: function() {
      var cardWrapper = document.createElement("div");
      body.appendChild(cardWrapper);
      cardWrapper.appendChild(this.card);
      this.card.appendChild(this.question);
      this.card.appendChild(this.answerOne);
      this.card.appendChild(this.answerTwo);
      this.card.appendChild(this.answerThree);
      this.card.appendChild(this.answerFour);

      cardWrapper.setAttribute("class", "card");
      this.answerOne.setAttribute ("class" , "btn");
      this.answerTwo.setAttribute ("class" , "btn");
      this.answerThree.setAttribute ("class" , "btn");
      this.answerFour.setAttribute ("class" , "btn");
      this.card.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: nowrap;")


      cardWrapper.setAttribute( "style" , "border: 10px solid black; box-shadow: 5px 0px 15px black; padding: 50px, 100px; position: absolute; width: 70%; top: 25%; leftt: 10%;");


      
   }


}

 startBtn.addEventListener("click", function() {
    //  timer.start();
    welcome.style.display = "none";
    timer.generate();
    quiz.generate();
    return;
   } )
   