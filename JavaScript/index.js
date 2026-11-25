// ==========================================
// LIFELINK HOME PAGE - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const bloodTiles = document.querySelectorAll(".bg-tile");

    const bloodInformation = {
        "A+": "A+ blood is a commonly needed blood group.",
        "A-": "A- is a less common blood group and can be valuable for compatible patients.",
        "B+": "B+ is an important blood group for blood donation.",
        "B-": "B- is less common and donor availability can be important.",
        "AB+": "AB+ can receive red blood cells from all blood groups.",
        "AB-": "AB- is one of the less common blood groups.",
        "O+": "O+ is one of the most common blood groups.",
        "O-": "O- red blood cells are often used when the patient's blood type is unknown in emergencies."
    };

    bloodTiles.forEach(function (tile) {
        tile.style.cursor = "pointer";

        tile.addEventListener("click", function () {
            const bloodGroup = tile.textContent.trim();
            alert("🩸 Blood Group: " + bloodGroup + "\n\n" +
                  bloodInformation[bloodGroup]);
        });

        tile.addEventListener("mouseenter", function () {
            tile.style.transform = "scale(1.08)";
            tile.style.transition = "0.2s";
        });

        tile.addEventListener("mouseleave", function () {
            tile.style.transform = "scale(1)";
        });
    });

    const emergencyButtons = document.querySelectorAll(
        'a[href="emergency.html"]'
    );

    emergencyButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            const confirmation = confirm(
                "🚨 Are you looking for emergency blood support?"
            );

            if (!confirmation) {
                event.preventDefault();
            }
        });
    });

    const welcome = document.createElement("div");
    welcome.textContent = "❤️ Welcome to LifeLink — Every drop counts.";

    Object.assign(welcome.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 18px",
        background: "#12263A",
        color: "white",
        borderRadius: "10px",
        zIndex: "999"
    });

    document.body.appendChild(welcome);

    setTimeout(function () {
        welcome.style.opacity = "0";
        welcome.style.transition = "opacity 1s";

        setTimeout(function () {
            welcome.remove();
        }, 1000);
    }, 4000);
});
