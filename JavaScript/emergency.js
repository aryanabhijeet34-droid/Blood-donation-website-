// ==========================================
// EMERGENCY BLOOD REQUEST - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const card = document.querySelector(".wrap-sm .card");

    if (!card) return;

    const inputs = card.querySelectorAll("input");
    const bloodGroup = card.querySelector("select");
    const submitButton = card.querySelector("button");

    const patientName = inputs[0];
    const units = inputs[1];
    const hospital = inputs[2];
    const contact = inputs[3];

    if (!submitButton) return;

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        const name = patientName.value.trim();
        const blood = bloodGroup.value;
        const numberOfUnits = Number(units.value);
        const hospitalName = hospital.value.trim();
        const phone = contact.value.trim();

        if (name === "") {
            alert("❌ Please enter patient name.");
            patientName.focus();
            return;
        }

        if (numberOfUnits < 1 || isNaN(numberOfUnits)) {
            alert("❌ Number of units must be at least 1.");
            units.focus();
            return;
        }

        if (hospitalName === "") {
            alert("❌ Please enter hospital name.");
            hospital.focus();
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("❌ Please enter a valid 10-digit contact number.");
            contact.focus();
            return;
        }

        const requestId =
            "LL-" + Math.floor(100000 + Math.random() * 900000);

        const emergencyRequest = {
            requestId: requestId,
            patientName: name,
            bloodGroup: blood,
            units: numberOfUnits,
            hospital: hospitalName,
            contact: phone,
            status: "Searching for donors",
            time: new Date().toLocaleString()
        };

        localStorage.setItem(
            "emergencyRequest",
            JSON.stringify(emergencyRequest)
        );

        alert(
            "🚨 EMERGENCY REQUEST CREATED\n\n" +
            "Request ID: " + requestId +
            "\nPatient: " + name +
            "\nBlood Group: " + blood +
            "\nUnits: " + numberOfUnits +
            "\nHospital: " + hospitalName +
            "\n\nStatus: Searching for donors 🔍"
        );

        patientName.value = "";
        units.value = "1";
        hospital.value = "";
        contact.value = "";

        submitButton.textContent = "✅ Request Submitted";
        submitButton.disabled = true;
    });
});
