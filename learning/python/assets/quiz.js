/* quiz.js — shared retrieval-practice widget for every lesson.
   Markup:
   <div class="quiz" data-correct="1">
     <p class="quiz-q">Question text</p>
     <ul class="quiz-opts">
       <li><button>option a</button></li>
       <li><button>option b</button></li>   // index 1 = correct here
     </ul>
     <div class="quiz-explain"><strong>Right.</strong> explanation…</div>
   </div>
   Answers should be equal-length where possible — no formatting tells. */
(function () {
  function wire(quiz) {
    var correct = parseInt(quiz.getAttribute('data-correct'), 10);
    var btns = quiz.querySelectorAll('.quiz-opts button');
    var explain = quiz.querySelector('.quiz-explain');
    var answered = false;
    btns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;
        btns.forEach(function (b, j) {
          b.disabled = true;
          if (j === correct) b.classList.add('correct');
        });
        if (i !== correct) btn.classList.add('wrong');
        if (explain) explain.classList.add('show');
      });
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.quiz').forEach(wire);
  });
})();
