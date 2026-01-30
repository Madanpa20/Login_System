$(document).ready(function () {

    let token = localStorage.getItem("session_token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Token exists → verify with backend
    $.ajax({
        url: "../backend/validate_session.php",
        type: "POST",
        data: { token: token },
        success: function (response) {
            if (response.status !== "success") {
                localStorage.removeItem("session_token");
                window.location.href = "login.html";
            }
        }
    });

    $("#logoutBtn").click(function () {

        let token = localStorage.getItem("session_token");

        // OPTIONAL: tell backend to destroy session
        $.ajax({
            url: "../backend/logout.php",
            type: "POST",
            data: { token: token },
            complete: function () {
                // Frontend cleanup (MANDATORY)
                localStorage.removeItem("session_token");
                window.location.href = "login.html";
            }
        });

    });
});