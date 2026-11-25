// ==========================================
// FIND DONOR - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const filters = document.querySelectorAll(".grid.g4 select");

    if (filters.length < 4) return;

    const bloodGroupFilter = filters[0];
    const cityFilter = filters[1];
    const availabilityFilter = filters[3];

    const donorCards = document.querySelectorAll(".card-grid .card");

    function filterDonors() {
        const selectedBlood = bloodGroupFilter.value;
        const selectedCity = cityFilter.value;
        const selectedAvailability = availabilityFilter.value;

        let visibleCount = 0;

        donorCards.forEach(function (card) {
            const badge = card.querySelector(".badge");
            const paragraphs = card.querySelectorAll("p");

            if (!badge || paragraphs.length < 2) return;

            const blood = badge.textContent.trim();
            const locationText = paragraphs[0].textContent;
            const availabilityText = paragraphs[1].textContent;

            const bloodMatch =
                selectedBlood === "All" ||
                blood === selectedBlood;

            const cityMatch =
                selectedCity === "All" ||
                locationText.includes(selectedCity);

            const availabilityMatch =
                selectedAvailability === "All donors" ||
                availabilityText.includes("Available");

            if (bloodMatch && cityMatch && availabilityMatch) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        updateResultMessage(visibleCount);
    }

    function updateResultMessage(count) {
        let resultMessage = document.getElementById("donorResult");

        if (!resultMessage) {
            resultMessage = document.createElement("p");
            resultMessage.id = "donorResult";
            resultMessage.className = "muted";

            const donorGrid = document.querySelector(".card-grid");

            if (donorGrid) {
                donorGrid.parentNode.insertBefore(
                    resultMessage,
                    donorGrid
                );
            }
        }

        resultMessage.textContent =
            count === 0
                ? "❌ No matching donors found."
                : "🩸 " + count + " donor(s) available.";
    }

    filters.forEach(function (filter) {
        filter.addEventListener("change", filterDonors);
    });

    const requestButtons = document.querySelectorAll(
        '.card-grid a[href="request-blood.html"]'
    );

    requestButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const card = button.closest(".card");

            const donorName = card.querySelector("b").textContent;
            const bloodGroup = card.querySelector(".badge").textContent;

            const confirmation = confirm(
                "🩸 Request blood from " + donorName +
                "?\n\nBlood Group: " + bloodGroup
            );

            if (confirmation) {
                alert(
                    "✅ Blood request sent!\n\n" +
                    donorName + " has been notified."
                );
            }
        });
    });

    filterDonors();
});
