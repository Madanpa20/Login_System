$(document).ready(function () {
    // Clear errors on input
    $("input").on("input", function () {
        $(this).removeClass("is-invalid");
        $(this).next(".error-msg").hide();
    });

    $("#registerBtn").click(function (e) {
        e.preventDefault(); // Prevent default if inside a form, though we use div structure primarily

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        let isValid = true;

        // Reset previous errors
        $(".error-msg").hide();
        $(".form-control").removeClass("is-invalid");

        // Validate Name
        if (name === "") {
            $("#name").addClass("is-invalid");
            $("#error-name").show();
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailPattern.test(email)) {
            $("#email").addClass("is-invalid");
            $("#error-email").text("Please enter a valid email address").show();
            isValid = false;
        }

        // Validate Password
        if (password.length < 6) {
            $("#password").addClass("is-invalid");
            $("#error-password").show();
            isValid = false;
        }

        if (!isValid) {
            showToast("warning", "Validation Error", "Please correct the highlighted fields.");
            return;
        }

        // Loading State
        const $btn = $("#registerBtn");
        const originalText = $btn.text();
        $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...');

        $.ajax({
            url: "../backend/register.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                email: email,
                password: password
            },
            success: function (response) {
                if (response.status === "success") {
                    showToast("success", "Registration Successful", response.message);
                    $("#registerForm input").val(""); // Clear inputs

                    // Redirect after 2 seconds
                    setTimeout(function () {
                        window.location.href = "login.html";
                    }, 2000);
                } else {
                    showToast("error", "Registration Failed", response.message || "User already exists.");
                    $btn.prop("disabled", false).text(originalText);
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", error);
                showToast("error", "Server Error", "An error occurred. Please try again later.");
                $btn.prop("disabled", false).text(originalText);
            }
        });
    });
});