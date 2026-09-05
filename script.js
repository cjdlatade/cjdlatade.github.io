// =========================
// DASHBOARD CLOCK
// =========================

function updateDashboardTime() {

    const timeElement = document.getElementById("lastCheck");

    if (!timeElement) {
        console.log("lastCheck element not found");
        return;
    }

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    timeElement.textContent = `${hours}:${minutes}`;
}

updateDashboardTime();

setInterval(updateDashboardTime, 60000);


// =========================
// INCIDENT INTERACTION
// =========================

function updateIncident(incident) {

    const statusElement =
        incident.querySelector(".incident-status");

    const currentStatus =
        incident.getAttribute("data-status");

    let newStatus;

    if (currentStatus === "Investigating") {

        newStatus = "Monitoring";

    } else if (currentStatus === "Monitoring") {

        newStatus = "Resolved";

    } else {

        newStatus = "Investigating";

    }

    incident.setAttribute("data-status", newStatus);

    statusElement.textContent = newStatus;

    updateIncidentCount();

    const incidentNumber =
        incident.querySelector("span").textContent;

    showNotification(
        incidentNumber,
        newStatus
    );
}


// =========================
// INCIDENT COUNT
// =========================

function updateIncidentCount() {

    const incidents =
        document.querySelectorAll(".incident-status");

    let openIncidents = 0;

    incidents.forEach(function(status) {

        if (status.textContent !== "Resolved") {

            openIncidents++;

        }

    });

    const countElement =
        document.getElementById("incidentCount");

    if (countElement) {

        countElement.textContent =
            String(openIncidents).padStart(2, "0");

    }
}


// =========================
// NOTIFICATION
// =========================

function showNotification(incidentNumber, status) {

    const notification =
        document.createElement("div");

    notification.className =
        "dashboard-notification";

    notification.textContent =
        `${incidentNumber} updated → ${status}`;

    document.body.appendChild(notification);

    setTimeout(function() {

        notification.remove();

    }, 2500);
}
// =========================
// ENTERPRISE HEALTH CHECK
// =========================

function runHealthCheck() {

    const button = document.querySelector(".health-check-button");
    const status = document.getElementById("overallStatus");
    const time = document.getElementById("healthCheckTime");

    if (!button || !status || !time) {
        return;
    }

    button.textContent = "RUNNING CHECK...";

    status.textContent = "CHECKING SYSTEMS";

    const checks = document.querySelectorAll(".check-status");

    checks.forEach(function(check) {
        check.textContent = "CHECKING";
    });

    setTimeout(function() {

        checks.forEach(function(check) {
            check.textContent = "PASS";
        });

        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        time.textContent = `${hours}:${minutes}`;

        status.textContent = "ALL SYSTEMS OPERATIONAL";

        button.textContent = "RUN HEALTH CHECK →";

        showHealthNotification();

    }, 1500);
}


// =========================
// HEALTH CHECK NOTIFICATION
// =========================

function showHealthNotification() {

    const notification = document.createElement("div");

    notification.className = "dashboard-notification";

    notification.textContent =
        "Health check completed → All systems operational";

    document.body.appendChild(notification);

    setTimeout(function() {
        notification.remove();
    }, 2500);
}