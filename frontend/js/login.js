$(document).ready(function () {
    // Clear error on input
    $("#email, #password").on("input", function () {
        // Optional: clear specific field errors if using inline validation too
    });

    $("#loginBtn").click(function (e) {
        e.preventDefault();

        // 1. Get Values
        let email = $("#email").val().trim();
        let password = $("#password").val();

        // 2. Validate Empty Fields
        if (email === "" || password === "") {
            showToast("warning", "Missing Information", "Please fill in all fields.");
            return;
        }

        // 3. Validate Email Format
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast("warning", "Invalid Email", "Please enter a valid email address.");
            return;
        }

        // 4. AJAX Request
        $.ajax({
            url: "../backend/login.php",
            type: "POST",
            dataType: "json",
            data: { email: email, password: password },

            beforeSend: function () {
                // Disable button and show loading state
                $("#loginBtn").prop("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...');
            },

            success: function (response) {
                if (response.status === "success") {
                    // Store token and redirect
                    localStorage.setItem("session_token", response.token);
                    showToast("success", "Login Successful", "Redirecting to your profile...");

                    setTimeout(function () {
                        window.location.href = "profile.html";
                    }, 1500);
                } else {
                    // Show error from backend
                    showToast("error", "Login Failed", response.message || "Invalid credentials.");
                    $("#loginBtn").prop("disabled", false).text("Login");
                }
            },

            error: function (xhr, status, error) {
                console.error("Login Error:", error);
                showToast("error", "System Error", "An error occurred. Please try again later.");
                $("#loginBtn").prop("disabled", false).text("Login");
            }
        });

    });

});
