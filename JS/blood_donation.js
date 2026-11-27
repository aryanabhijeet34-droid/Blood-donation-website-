
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. DONOR SEARCH
    // =========================================

    const nameInput = document.getElementById("llDonorName");
    const bloodInput = document.getElementById("llDonorBlood");
    const cityInput = document.getElementById("llDonorCity");
    const availabilityInput = document.getElementById("llDonorAvailability");

    const results = document.getElementById("llDonorResults");
    const count = document.getElementById("llDonorCount");
    const resetButton = document.getElementById("llResetDonors");

    let donors = [];

    function isAvailable(value) {
        return value === true ||
            value === 1 ||
            ["true", "yes", "available", "1"].includes(
                String(value ?? "").toLowerCase()
            );
    }

    // Display donor cards
    function displayDonors(list) {

        if (!results || !count) return;

        results.replaceChildren();

        count.textContent = `${list.length} donor(s) found`;

        if (list.length === 0) {

            const message = document.createElement("p");

            message.className = "ll-no-donors";
            message.textContent =
                "No donors found. Try changing your filters.";

            results.appendChild(message);
            return;
        }

        list.forEach(donor => {

            const card = document.createElement("article");
            card.className = "ll-donor-card";

            const heading = document.createElement("h3");
            heading.textContent =
                donor.name || donor.fullName || "Donor";

            const blood = document.createElement("span");
            blood.className = "ll-donor-blood";

            blood.textContent =
                donor.bloodGroup ||
                donor.blood_group ||
                donor.bloodgroup ||
                "Not specified";

            const city = document.createElement("p");

            city.textContent =
                "City: " + (donor.city || donor.location || "Not specified");

            const status = document.createElement("p");

            const available = isAvailable(
                donor.available ??
                donor.isAvailable ??
                donor.availability
            );

            status.className = available
                ? "ll-donor-available"
                : "ll-donor-unavailable";

            status.textContent = available
                ? "Status: Available"
                : "Status: Unavailable";

            card.append(heading, blood, city, status);

            results.appendChild(card);

        });
    }

    // Filter donors
    function filterDonors() {

        const name = nameInput?.value.trim().toLowerCase() || "";
        const blood = bloodInput?.value.trim().toUpperCase() || "";
        const city = cityInput?.value.trim().toLowerCase() || "";
        const availability = availabilityInput?.value || "";

        const filtered = donors.filter(donor => {

            const donorName = String(
                donor.name || donor.fullName || ""
            ).toLowerCase();

            const donorBlood = String(
                donor.bloodGroup ||
                donor.blood_group ||
                donor.bloodgroup ||
                ""
            ).toUpperCase();

            const donorCity = String(
                donor.city || donor.location || ""
            ).toLowerCase();

            const available = isAvailable(
                donor.available ??
                donor.isAvailable ??
                donor.availability
            );

            return (
                donorName.includes(name) &&
                (!blood || donorBlood === blood) &&
                donorCity.includes(city) &&
                (
                    !availability ||
                    (availability === "available" && available) ||
                    (availability === "unavailable" && !available)
                )
            );
        });

        displayDonors(filtered);
    }

    // Load donor data from Data/data.json
    async function loadDonors() {

        if (!results || !count) return;

        try {

            const response = await fetch("/Data/data.json");

            if (!response.ok) {
                throw new Error("Unable to load donor data");
            }

            const data = await response.json();

            donors = Array.isArray(data)
                ? data
                : (Array.isArray(data.donors) ? data.donors : []);

            filterDonors();

        } catch (error) {

            count.textContent = "Unable to load donors.";

            results.textContent =
                "Please check Data/data.json.";

            console.error("Donor loading error:", error);
        }
    }

    // Search events
    nameInput?.addEventListener("input", filterDonors);
    cityInput?.addEventListener("input", filterDonors);

    bloodInput?.addEventListener("change", filterDonors);
    availabilityInput?.addEventListener("change", filterDonors);

    // Reset filters
    resetButton?.addEventListener("click", () => {

        if (nameInput) nameInput.value = "";
        if (bloodInput) bloodInput.value = "";
        if (cityInput) cityInput.value = "";
        if (availabilityInput) availabilityInput.value = "";

        document.querySelectorAll(".ll-blood-card").forEach(card => {

            card.classList.remove("active");
            card.setAttribute("aria-pressed", "false");

        });

        filterDonors();
    });

    // Blood group cards
    document.querySelectorAll(".ll-blood-card").forEach(card => {

        card.addEventListener("click", () => {

            document.querySelectorAll(".ll-blood-card").forEach(item => {

                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");

            });

            card.classList.add("active");
            card.setAttribute("aria-pressed", "true");

            if (bloodInput) {
                bloodInput.value = card.dataset.blood || "";
            }

            filterDonors();

            document.getElementById("find-donor")
                ?.scrollIntoView({ behavior: "smooth" });

        });

    });

    loadDonors();


    // =========================================
    // 2. LOGIN MODAL
    // =========================================

    const modal = document.getElementById("llLoginModal");

    const loginForm = document.getElementById("llLoginForm");

    const loginMessage =
        document.getElementById("llLoginMessage");

    function showLogin() {

        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.getElementById("llLoginEmail")?.focus();
    }

    function hideLogin() {

        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    document.getElementById("llOpenLogin")
        ?.addEventListener("click", showLogin);

    document.getElementById("llFooterLogin")
        ?.addEventListener("click", event => {

            event.preventDefault();
            showLogin();

        });

    document.getElementById("llCloseLogin")
        ?.addEventListener("click", hideLogin);

    document.getElementById("llGoRegister")
        ?.addEventListener("click", hideLogin);

    modal?.addEventListener("click", event => {

        if (event.target === modal) {
            hideLogin();
        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            hideLogin();
        }

    });

    loginForm?.addEventListener("submit", event => {

        event.preventDefault();

        if (!loginForm.reportValidity()) return;

        if (loginMessage) {

            loginMessage.textContent =
                "Login is a demo. Authentication is not connected yet.";

            loginMessage.style.color = "#B0203A";
        }

    });


    // =========================================
    // 3. EMERGENCY REQUEST FORM
    // =========================================

    const emergencyForm =
        document.getElementById("m4EmergencyForm");

    const emergencyMessage =
        document.getElementById("m4EmergencyMessage");

    emergencyForm?.addEventListener("submit", event => {

        event.preventDefault();

        if (!emergencyForm.reportValidity()) return;

        if (emergencyMessage) {

            emergencyMessage.textContent =
                "Form validated. No real request was sent. " +
                "Please contact a hospital or blood bank directly.";

            emergencyMessage.style.color = "#2E7D5B";
        }

        emergencyForm.reset();

    });


    // =========================================
    // 4. REGISTRATION FORM
    // =========================================

    const registerForm =
        document.getElementById("m4RegisterForm");

    const registerMessage =
        document.getElementById("m4RegisterMessage");

    registerForm?.addEventListener("submit", event => {

        event.preventDefault();

        if (!registerForm.reportValidity()) return;

        const phone =
            document.getElementById("m4Phone")?.value.trim() || "";

        if (!/^[0-9]{10}$/.test(phone)) {

            if (registerMessage) {

                registerMessage.textContent =
                    "Please enter a valid 10-digit phone number.";

                registerMessage.style.color = "#B0203A";
            }

            return;
        }

        if (registerMessage) {

            registerMessage.textContent =
                "Registration validated. Backend is not connected yet.";

            registerMessage.style.color = "#2E7D5B";
        }

        registerForm.reset();

    });

});
