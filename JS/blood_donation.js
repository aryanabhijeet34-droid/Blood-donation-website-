
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. FIND DONOR
    ========================================= */

    const donorName = document.getElementById("llDonorName");
    const donorBlood = document.getElementById("llDonorBlood");
    const donorCity = document.getElementById("llDonorCity");
    const donorAvailability =
        document.getElementById("llDonorAvailability");

    const donorResults = document.getElementById("llDonorResults");
    const donorCount = document.getElementById("llDonorCount");
    const resetButton = document.getElementById("llResetDonors");

    let allDonors = [];


    // Convert availability values into true/false

    function isAvailable(value) {
        return value === true ||
            value === 1 ||
            ["true", "yes", "available", "1"].includes(
                String(value).toLowerCase()
            );
    }


    // Load donor data from data.json

    async function loadDonors() {

        try {

            const response = await fetch("./data.json");

            if (!response.ok) {
                throw new Error("Could not load data.json");
            }

            const data = await response.json();

            allDonors = Array.isArray(data.donors)
                ? data.donors
                : [];

            filterDonors();

        } catch (error) {

            donorCount.textContent = "Unable to load donor records.";

            donorResults.textContent =
                "Check data.json and run the website using Live Server.";

            console.error("Donor data error:", error);
        }
    }


    // Filter donor list using all selected filters

    function filterDonors() {

        const nameValue = donorName.value.trim().toLowerCase();

        const bloodValue = donorBlood.value.trim().toUpperCase();

        const cityValue = donorCity.value.trim().toLowerCase();

        const availabilityValue = donorAvailability.value;

        const filteredDonors = allDonors.filter(function (donor) {

            const name = String(
                donor.name || donor.fullName || ""
            ).toLowerCase();

            const blood = String(
                donor.bloodGroup ||
                donor.blood_group ||
                donor.bloodgroup ||
                ""
            ).toUpperCase();

            const city = String(
                donor.city || donor.location || ""
            ).toLowerCase();

            const available = isAvailable(
                donor.available ??
                donor.isAvailable ??
                donor.availability
            );

            const matchesName = name.includes(nameValue);

            const matchesBlood =
                bloodValue === "" || blood === bloodValue;

            const matchesCity = city.includes(cityValue);

            const matchesAvailability =
                availabilityValue === "" ||
                (availabilityValue === "available" && available) ||
                (availabilityValue === "unavailable" && !available);

            return matchesName &&
                matchesBlood &&
                matchesCity &&
                matchesAvailability;

        });

        displayDonors(filteredDonors);
    }


    // Display matching donor records

    function displayDonors(donors) {

        donorResults.replaceChildren();

        donorCount.textContent =
            donors.length + " donor(s) found";

        if (donors.length === 0) {

            const message = document.createElement("p");

            message.className = "ll-no-donors";

            message.textContent =
                "No donors found. Try changing your filters.";

            donorResults.appendChild(message);

            return;
        }


        // Frontend demonstration only.
        // No emergency request is sent to a hospital or donor.

        emergencyMessage.style.color = "#2E7D5B";

        emergencyMessage.textContent =
            "Form validated. No real emergency request was sent. " +
            "Contact a hospital or blood bank directly.";

        console.log("Emergency form data:", {
            patientName: patientName,
            contact: contact,
            bloodGroup: bloodGroup,
            units: units,
            hospital: hospital
        });

        emergencyForm.reset();

    });


    /* =====================================
       MEMBER 4: REGISTRATION
    ===================================== */

    const registerForm =
        document.getElementById("m4RegisterForm");

    const registerMessage =
        document.getElementById("m4RegisterMessage");


    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!registerForm.checkValidity()) {
            registerForm.reportValidity();
            return;
        }

        const name =
            document.getElementById("m4Name").value.trim();

        const email =
            document.getElementById("m4Email").value.trim();

        const phone =
            document.getElementById("m4Phone").value.trim();

        const bloodGroup =
            document.getElementById("m4RegisterBlood").value;

        const city =
            document.getElementById("m4City").value.trim();

        const password =
            document.getElementById("m4Password").value;


        if (!/^[0-9]{10}$/.test(phone)) {

            registerMessage.style.color = "#B0203A";

            registerMessage.textContent =
                "Please enter a valid 10-digit phone number.";

            return;
        }

        if (password.length < 8) {

            registerMessage.style.color = "#B0203A";

            registerMessage.textContent =
                "Password must contain at least 8 characters.";

            return;
        }


        // Frontend demonstration only.
        // Do not store passwords in browser storage or JSON.
        // Connect to secure backend authentication later.

        registerMessage.style.color = "#2E7D5B";

        registerMessage.textContent =
            "Form validated successfully. Backend registration " +
            "is not connected yet.";

        console.log("Registration form data:", {
            name: name,
            email: email,
            phone: phone,
            bloodGroup: bloodGroup,
            city: city
        });

        registerForm.reset();

    });

});
        donors.forEach(function (donor) {

            const name = donor.name || donor.fullName || "Unknown";

            const blood = donor.bloodGroup ||
                donor.blood_group ||
                donor.bloodgroup ||
                "Not specified";

            const city = donor.city ||
                donor.location ||
                "Not specified";

            const available = isAvailable(
                donor.available ??
                donor.isAvailable ??
                donor.availability
            );

            const card = document.createElement("article");
            card.className = "ll-donor-card";

            const heading = document.createElement("h3");
            heading.textContent = name;

            const bloodGroup = document.createElement("span");
            bloodGroup.className = "ll-donor-blood";
            bloodGroup.textContent = blood;

            const cityText = document.createElement("p");
            cityText.textContent = "City: " + city;

            const status = document.createElement("p");
            status.className = available
                ? "ll-donor-available"
                : "ll-donor-unavailable";

            status.textContent = available
                ? "Status: Available"
                : "Status: Unavailable";

            card.append(heading, bloodGroup, cityText, status);

            donorResults.appendChild(card);
        });
    }


    // Input and dropdown events

    donorName.addEventListener("input", filterDonors);
    donorCity.addEventListener("input", filterDonors);
    donorBlood.addEventListener("change", filterDonors);
    donorAvailability.addEventListener("change", filterDonors);


    // Reset all filters

    resetButton.addEventListener("click", function () {

        donorName.value = "";
        donorBlood.value = "";
        donorCity.value = "";
        donorAvailability.value = "";

        document.querySelectorAll(".ll-blood-card").forEach(
            function (card) {
                card.classList.remove("active");
                card.setAttribute("aria-pressed", "false");
            }
        );

        filterDonors();
    });


    /* =========================================
       2. BLOOD GROUP CARDS
    ========================================= */

    const bloodCards = document.querySelectorAll(".ll-blood-card");

    bloodCards.forEach(function (card) {

        card.addEventListener("click", function () {

            // Remove previous active selection

            bloodCards.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            // Highlight selected card

            card.classList.add("active");
            card.setAttribute("aria-pressed", "true");

            // Get selected blood group

            const selectedBlood = card.dataset.blood;

            // Update Find Donor dropdown

            donorBlood.value = selectedBlood;

            // Apply filter

            filterDonors();

            // Scroll to donor search

            document.getElementById("find-donor").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       3. LOGIN MODAL
    ========================================= */

    const openLogin = document.getElementById("llOpenLogin");
    const closeLogin = document.getElementById("llCloseLogin");
    const loginModal = document.getElementById("llLoginModal");
    const loginForm = document.getElementById("llLoginForm");
    const loginMessage = document.getElementById("llLoginMessage");

    const loginEmail = document.getElementById("llLoginEmail");
    const loginPassword = document.getElementById("llLoginPassword");


    // Open login modal

    function showLogin() {

        loginModal.classList.add("active");
        loginModal.setAttribute("aria-hidden", "false");

        loginMessage.textContent = "";

        loginEmail.focus();
    }


    // Close login modal

    function hideLogin() {

        loginModal.classList.remove("active");
        loginModal.setAttribute("aria-hidden", "true");
    }


    openLogin.addEventListener("click", showLogin);

    closeLogin.addEventListener("click", hideLogin);


    // Close modal on outside click

    loginModal.addEventListener("click", function (event) {

        if (event.target === loginModal) {
            hideLogin();
        }

    });


    // Close modal with Escape key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" &&
            loginModal.classList.contains("active")) {

            hideLogin();
        }

    });


    // Login form submission

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value;

        if (!email || !password) {

            loginMessage.style.color = "#B0203A";
            loginMessage.textContent =
                "Please enter your email and password.";

            return;
        }

        // Frontend demonstration only.
        // Connect this form to backend authentication
        // when the team implements the backend.

        loginMessage.style.color = "#2E7D5B";
        loginMessage.textContent =
            "Form submitted. Backend authentication is not connected yet.";

    });


    /* =========================================
       4. INITIALIZE DONOR DATA
    ========================================= */

    loadDonors();

});



// Footer Login Link

const footerLogin = document.getElementById("llFooterLogin");

footerLogin.addEventListener("click", function (event) {

    event.preventDefault();

    showLogin();

});
