// ==========================================
// DONATE BLOOD - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Make donation type cards interactive
    const donationCards = document.querySelectorAll(".grid.g2 .card");

    donationCards.forEach(function (card) {
        card.style.cursor = "pointer";

        card.addEventListener("click", function () {
            const title = card.querySelector("h3").textContent;
            let message = "";

            if (title === "Whole Blood") {
                message = "Whole Blood is the most common type of blood donation.";
            } else if (title === "Plasma") {
                message = "Plasma is the liquid part of blood and can help trauma and burn patients.";
            } else if (title === "Platelets") {
                message = "Platelets are especially important for some cancer patients and surgeries.";
            } else if (title === "Double Red Cells") {
                message = "Double Red Cell donation collects two units of red blood cells.";
            }

            alert("🩸 " + title + "\n\n" + message);
        });
    });

    // Eligibility checker
    const eligibilityButton = document.createElement("button");
    eligibilityButton.textContent = "✅ Check My Eligibility";
    eligibilityButton.className = "btn btn-dark";

    const wrap = document.querySelector(".wrap-md.section");

    if (wrap) {
        wrap.insertBefore(eligibilityButton, wrap.children[1]);
    }

    eligibilityButton.addEventListener("click", function () {
        const age = prompt("Enter your age:");

        if (age === null) return;

        const userAge = Number(age);

        if (isNaN(userAge)) {
            alert("❌ Please enter a valid age.");
        } else if (userAge < 18) {
            alert("❌ You may not currently meet the general age guideline for donation.");
        } else if (userAge > 65) {
            alert("⚠️ Eligibility can depend on local guidelines and medical assessment.");
        } else {
            alert(
                "✅ You appear to meet the general age guideline.\n\n" +
                "Final eligibility will be determined by qualified medical professionals."
            );
        }
    });

    // Register as donor
    const registerButton = document.querySelector(
        'a[href="register.html"]'
    );

    if (registerButton) {
        registerButton.addEventListener("click", function (event) {
            event.preventDefault();

            const name = prompt("Enter your name:");

            if (!name || name.trim() === "") {
                alert("❌ Please enter your name.");
                return;
            }

            const bloodGroup = prompt(
                "Enter your blood group:\n\nA+  A-  B+  B-  AB+  AB-  O+  O-"
            );

            if (!bloodGroup || bloodGroup.trim() === "") {
                alert("❌ Please enter your blood group.");
                return;
            }

            const donor = {
                name: name.trim(),
                bloodGroup: bloodGroup.toUpperCase().trim(),
                registeredAt: new Date().toLocaleString()
            };

            localStorage.setItem("lifelinkDonor", JSON.stringify(donor));

            alert(
                "🎉 Registration Successful!\n\n" +
                "Name: " + donor.name +
                "\nBlood Group: " + donor.bloodGroup +
                "\n\nThank you for helping save lives! ❤️"
            );
        });
    }
});
