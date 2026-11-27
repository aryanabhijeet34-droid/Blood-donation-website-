// ==========================================
// HEALTHCARE SUPPORT - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".grid.g2 .card");

    cards.forEach(function (card) {
        const heading = card.querySelector("h3");
        const paragraph = card.querySelector("p");

        if (!heading || !paragraph) return;

        card.style.cursor = "pointer";

        const originalText = paragraph.textContent;
        let expanded = false;

        card.addEventListener("click", function () {
            if (!expanded) {
                let extraInformation = "";

                if (heading.textContent.includes("Thalassemia")) {
                    extraInformation =
                        " Regular blood transfusion support may be required. Donor availability can therefore be important.";
                } else if (heading.textContent.includes("Anemia")) {
                    extraInformation =
                        " Treatment depends on the underlying cause. Medical professionals should determine whether transfusion support is needed.";
                } else if (heading.textContent.includes("Cancer")) {
                    extraInformation =
                        " Some treatments can affect blood counts. Blood components may sometimes be required as part of supportive care.";
                } else if (heading.textContent.includes("Emergency")) {
                    extraInformation =
                        " In a serious emergency, contact local emergency medical services immediately.";
                }

                paragraph.textContent = originalText + extraInformation;
                card.style.transform = "scale(1.02)";
                card.style.transition = "0.2s";
                expanded = true;
            } else {
                paragraph.textContent = originalText;
                card.style.transform = "scale(1)";
                expanded = false;
            }
        });
    });

    const infoButton = document.createElement("button");
    infoButton.textContent = "🏥 View Healthcare Notice";
    infoButton.className = "btn btn-primary";

    const heading = document.querySelector("h1");

    if (heading) {
        heading.after(infoButton);

        infoButton.addEventListener("click", function () {
            alert(
                "🏥 Healthcare Support\n\n" +
                "LifeLink provides general educational information.\n\n" +
                "It does not replace professional medical diagnosis or treatment."
            );
        });
    }
});
