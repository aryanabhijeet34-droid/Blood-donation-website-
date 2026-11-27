
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. BLOOD CAMP CITY FILTER
    // =========================================

    const filters = document.querySelectorAll(".m3-filter");

    const cards = document.querySelectorAll(".m3-camp-card");

    const message = document.getElementById("m3CampMessage");

    filters.forEach(button => {

        button.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const selectedCity = button.dataset.city;

            cards.forEach(card => {

                const campCity = card.dataset.city;

                if (
                    selectedCity === "all" ||
                    selectedCity === campCity
                ) {

                    card.hidden = false;

                } else {

                    card.hidden = true;

                }

            });

        });

    });


    // =========================================
    // 2. CAMP INTEREST BUTTON
    // =========================================

    const interestButtons =
        document.querySelectorAll(".m3-interest-btn");

    interestButtons.forEach(button => {

        button.addEventListener("click", () => {

            const campName = button.dataset.camp;

            if (message) {

                message.textContent =
                    "You selected: " + campName +
                    ". Registration is not connected yet.";

            }

        });

    });

});
