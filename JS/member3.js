"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       MEMBER 3: CAMP FILTER
    ===================================== */

    const campFilters = document.querySelectorAll(".m3-filter");

    const campCards = document.querySelectorAll(".m3-camp-card");

    const campMessage = document.getElementById("m3CampMessage");


    campFilters.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove previous active filter

            campFilters.forEach(function (filter) {
                filter.classList.remove("active");
            });

            button.classList.add("active");

            const selectedCity = button.dataset.city;

            // Show matching camps

            campCards.forEach(function (card) {

                const campCity = card.dataset.city;

                if (selectedCity === "all" ||
                    campCity === selectedCity) {

                    card.hidden = false;

                } else {

                    card.hidden = true;
                }

            });

        });

    });


    /* =====================================
       MEMBER 3: CAMP INTEREST BUTTON
    ===================================== */

    const interestButtons =
        document.querySelectorAll(".m3-interest-btn");


    interestButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const campName = button.dataset.camp;

            campMessage.textContent =
                "You selected: " + campName +
                ". Registration is not connected yet.";

        });

    });

});