// ==========================================
// FAQ - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const faqCard = document.querySelector(".card");

    if (!faqCard) return;

    const questions = faqCard.querySelectorAll("h3");

    questions.forEach(function (question) {
        const answer = question.nextElementSibling;

        if (!answer) return;

        answer.style.display = "none";

        question.style.cursor = "pointer";
        question.style.padding = "15px";
        question.style.borderRadius = "8px";
        question.style.background = "#F7E3E6";

        const arrow = document.createElement("span");
        arrow.textContent = " ▼";
        question.appendChild(arrow);

        question.addEventListener("click", function () {
            if (answer.style.display === "none") {
                answer.style.display = "block";
                arrow.textContent = " ▲";
            } else {
                answer.style.display = "none";
                arrow.textContent = " ▼";
            }
        });
    });

    // FAQ search
    const searchBox = document.createElement("input");

    searchBox.type = "text";
    searchBox.placeholder = "🔍 Search FAQ...";
    searchBox.style.marginBottom = "20px";
    searchBox.style.width = "100%";
    searchBox.style.padding = "12px";
    searchBox.style.boxSizing = "border-box";

    faqCard.parentNode.insertBefore(searchBox, faqCard);

    searchBox.addEventListener("input", function () {
        const searchText = searchBox.value.toLowerCase();

        questions.forEach(function (question) {
            const answer = question.nextElementSibling;

            const content = (
                question.textContent +
                answer.textContent
            ).toLowerCase();

            if (content.includes(searchText)) {
                question.style.display = "block";
                answer.style.display =
                    searchText ? "block" : "none";
            } else {
                question.style.display = "none";
                answer.style.display = "none";
            }
        });
    });
});
