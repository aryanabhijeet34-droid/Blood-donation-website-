
const DATA_URL = "./data.json";

$.ajax({
    url: DATA_URL,
    method: "GET",
    dataType: "json",

    success: function(data) {
        console.log("JSON Data Loaded:", data);

        console.log(data.stats);
        console.log(data.donors);
        console.log(data.camps);
    },

    error: function(error) {
        console.log("Error loading JSON:", error);
    }
});

$(document).ready(function () {

    "use strict";

    // ==========================================
    // 1. GLOBAL VARIABLES
    // ==========================================

    const DATA_URL = "./data.json";

    let appData = {
        donors: [],
        camps: [],
        stats: []
    };


    // ==========================================
    // 2. MESSAGE FUNCTION (jQuery + DOM)
    // ==========================================

    function showMessage(message) {

        let notice = $("#lifelinkNotice");

        if (notice.length === 0) {

            notice = $("<div>", {
                id: "lifelinkNotice",
                class: "dynamic-message",
                role: "status"
            }).prependTo("main");

        }

        notice
            .text(message)
            .stop(true, true)
            .fadeIn(150)
            .delay(2400)
            .fadeOut(300);

    }


    // ==========================================
    // 3. DYNAMIC STATISTICS (map + ES6)
    // ==========================================

    const renderStats = (stats = []) => {

        const html = stats.map(
            ({ icon, value, suffix = "", label }) => {

                return `
                    <div class="stat-card">

                        <span>${icon}</span>

                        <h2>
                            ${Number(value).toLocaleString("en-IN")}${suffix}
                        </h2>

                        <p>${label}</p>

                    </div>
                `;

            }
        ).join("");

        $(".stats-container").html(html);

    };


    // ==========================================
    // 4. CREATE DONOR SEARCH SECTION
    // ==========================================

    function createDonorFinder() {

        if ($("#donorFinder").length) {
            return;
        }

        const section = `

            <section class="section" id="donorFinder">

                <div class="container">

                    <h2>Find a Demo Donor</h2>

                    <p class="section-description">
                        Search donors by name, blood group and city.
                    </p>

                    <div class="dynamic-search">

                        <input
                            type="search"
                            id="donorName"
                            placeholder="Search donor name"
                        >

                        <select id="donorBloodGroup">

                            <option value="">All Blood Groups</option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                        <input
                            type="search"
                            id="donorCity"
                            placeholder="Search city"
                        >

                    </div>

                    <p id="donorResultCount"></p>

                    <div id="donorResults" class="dynamic-results"></div>

                </div>

            </section>

        `;

        $("#camps").before(section);

    }


    // ==========================================
    // 5. DISPLAY DONORS (map + destructuring)
    // ==========================================

    function renderDonors(donors = []) {

        const html = donors.map(
            ({ name, bloodGroup, city, phone, available }) => {

                const status = available
                    ? "Demo availability: Yes"
                    : "Demo availability: No";

                const statusClass = available
                    ? ""
                    : "unavailable";

                return `

                    <article class="dynamic-donor">

                        <h3>${name}</h3>

                        <p>
                            <strong>Blood Group:</strong>
                            ${bloodGroup}
                        </p>

                        <p>
                            <strong>City:</strong>
                            ${city}
                        </p>

                        <p class="dynamic-status ${statusClass}">
                            ${status}
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary donor-contact">

                            Show demo contact

                        </button>

                        <p class="donor-phone" hidden>
                            ${phone}
                        </p>

                    </article>

                `;

            }
        ).join("");

        $("#donorResults").html(

            html || "<p>No matching demo donors found.</p>"

        );

        $("#donorResultCount").text(
            donors.length + " demo donor records found."
        );

    }


    // ==========================================
    // 6. SEARCH AND FILTER DONORS
    // ==========================================

    function filterDonors() {

        const name = ($("#donorName").val() || "")
            .trim()
            .toLowerCase();

        const blood = $("#donorBloodGroup").val() || "";

        const city = ($("#donorCity").val() || "")
            .trim()
            .toLowerCase();


        const result = appData.donors.filter((donor) => {

            const nameMatch =
                donor.name.toLowerCase().includes(name);

            const bloodMatch =
                blood === "" || donor.bloodGroup === blood;

            const cityMatch =
                donor.city.toLowerCase().includes(city);


            // Logical AND operator

            return nameMatch && bloodMatch && cityMatch;

        });


        renderDonors(result);

    }


    // ==========================================
    // 7. DYNAMIC BLOOD CAMPS
    // ==========================================

    function renderCamps(camps = []) {

        const html = camps.map((camp) => {

            const remaining = Math.max(
                0,
                camp.capacity - camp.filled
            );

            const isFull = remaining === 0;

            return `

                <article class="card dynamic-camp">

                    <span class="badge badge-navy">
                        ${camp.date}
                    </span>

                    <h3>${camp.title}</h3>

                    <p>📍 ${camp.location}</p>

                    <small>
                        ${camp.filled} / ${camp.capacity} slots filled
                    </small>

                    <small>
                        ${remaining} slots remaining
                    </small>

                    <button
                        type="button"
                        class="btn btn-primary camp-register"
                        data-camp-id="${camp.id}"
                        ${isFull ? "disabled" : ""}>

                        ${isFull ? "Camp Full" : "Register Interest"}

                    </button>

                </article>

            `;

        }).join("");


        $("#camps .cards-grid").html(

            html || "<p>No upcoming camps available.</p>"

        );

    }


    // ==========================================
    // 8. AJAX - LOAD DATA FROM JSON
    // ==========================================

    function loadData() {

        $("<p>", {
            id: "lifelinkLoading",
            class: "dynamic-message",
            text: "Loading LifeLink data..."
        }).prependTo("main");


        $.ajax({

            url: DATA_URL,

            method: "GET",

            dataType: "json",

            timeout: 10000

        })

        // SUCCESS CALLBACK

        .done(function (data) {

            appData = { ...data };

            // Load statistics
            renderStats(appData.stats ?? []);

            // Create donor section
            createDonorFinder();

            // Display donor records
            renderDonors(appData.donors ?? []);

            // Display camp records
            renderCamps(appData.camps ?? []);

            $("#lifelinkLoading").remove();

            showMessage("LifeLink data loaded successfully!");

            $("#donorFinder .section-description").after(

                $("<p>", {
                    class: "dynamic-empty",
                    text: data.notice ?? "Demo data loaded."
                })

            );

        })


        // ERROR CALLBACK

        .fail(function (xhr, status) {

            $("#lifelinkLoading").remove();

            showMessage(
                "Unable to load data. Check data.json and Live Server."
            );

            $("#donorResults").html(
                "<p>Data could not be loaded.</p>"
            );

        });

    }


    // ==========================================
    // 9. DONOR SEARCH EVENTS (jQuery)
    // ==========================================

    $(document).on(
        "input change",
        "#donorName, #donorCity, #donorBloodGroup",
        function () {

            filterDonors();

        }
    );


    // ==========================================
    // 10. SHOW / HIDE DONOR CONTACT
    // ==========================================

    $(document).on("click", ".donor-contact", function () {

        const phone = $(this).siblings(".donor-phone");

        const shouldHide = !phone.prop("hidden");

        phone.prop("hidden", shouldHide);

        $(this).text(

            shouldHide
                ? "Show demo contact"
                : "Hide demo contact"

        );

    });


    // ==========================================
    // 11. CAMP REGISTRATION INTERACTION
    // ==========================================

    $(document).on("click", ".camp-register", function () {

        const id = Number($(this).attr("data-camp-id"));

        const camp = appData.camps.find(
            item => item.id === id
        );

        if (!camp) {

            showMessage("Camp not found!");

            return;

        }

        showMessage(
            "Interest recorded for " + camp.title + " (demo only)."
        );

    });


    // ==========================================
    // 12. BLOOD GROUP CARD CLICK EVENT
    // ==========================================

    $(document).on("click", ".blood-box", function () {

        $(".blood-box").css("border", "none");

        $(this).css(
            "border",
            "3px solid #B0203A"
        );

        const group = $(this)
            .find("strong")
            .text()
            .trim();

        showMessage("You selected blood group " + group);

    });


    // ==========================================
    // 13. NAVBAR AND HERO BUTTON EVENTS
    // ==========================================

    $(document).on(
        "click",
        ".nav-actions a, .hero-buttons a, .emergency-card a",
        function () {

            const label = $(this).text().trim();

            if (label) {

                showMessage("Opening: " + label);

            }

        }
    );


    // ==========================================
    // 14. START APPLICATION
    // ==========================================

    loadData();

});
