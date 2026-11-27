"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       MEMBER 4: EMERGENCY REQUEST
    ===================================== */

    const emergencyForm =
        document.getElementById("m4EmergencyForm");

    const emergencyMessage =
        document.getElementById("m4EmergencyMessage");


    emergencyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!emergencyForm.checkValidity()) {
            emergencyForm.reportValidity();
            return;
        }

        const patientName =
            document.getElementById("m4PatientName").value.trim();

        const contact =
            document.getElementById("m4Contact").value.trim();

        const bloodGroup =
            document.getElementById("m4BloodGroup").value;

        const units =
            document.getElementById("m4Units").value;

        const hospital =
            document.getElementById("m4Hospital").value.trim();


        if (!/^[0-9]{10}$/.test(contact)) {

            emergencyMessage.style.color = "#B0203A";

            emergencyMessage.textContent =
                "Please enter a valid 10-digit contact number.";

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