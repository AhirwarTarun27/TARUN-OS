/* quiz.js — reusable retrieval-practice widget for the course.
 *
 * Markup contract (keeps content in HTML, behavior here):
 *   <div class="quiz">
 *     <div class="q">Question text?</div>
 *     <button class="opt" data-correct>Right answer</button>
 *     <button class="opt">Wrong answer</button>
 *     <div class="feedback" data-right="Why it's right." data-miss="Nudge on a miss."></div>
 *   </div>
 *
 * Behavior: one attempt reveals the correct option, marks the click, and shows
 * feedback. Retrieval first, feedback immediate — that's the point.
 */
(function () {
  function wire(quiz) {
    var opts = Array.prototype.slice.call(quiz.querySelectorAll("button.opt"));
    var fb = quiz.querySelector(".feedback");
    opts.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quiz.dataset.answered) return;
        quiz.dataset.answered = "1";
        var choseRight = btn.hasAttribute("data-correct");
        opts.forEach(function (b) {
          b.disabled = true;
          if (b.hasAttribute("data-correct")) b.classList.add("correct");
        });
        if (!choseRight) btn.classList.add("wrong");
        if (fb) {
          fb.textContent = choseRight
            ? (fb.dataset.right || "Correct.")
            : (fb.dataset.miss || "Not quite — see the highlighted answer.");
          fb.classList.add("show", choseRight ? "right" : "miss");
        }
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quiz").forEach(wire);
  });
})();
