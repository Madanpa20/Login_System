$(document).ready(function () {

    $("#loginBtn").click(function () {

        let email = $("#email").val();
        let password = $("#password").val();

        if (email === "" || password === "") {
            alert("All fields required");
            return;
        }

        $.ajax({
            url: "../backend/login.php",
            type: "POST",
            dataType: "json",   // 🔥 THIS LINE FIXES IT
            data: { email, password },

            success: function (response) {

                if (response.status === "success") {
                    alert(response.message);
                    localStorage.setItem("session_token", response.token);
                    window.location.href = "profile.html";
                } else {
                    alert(response.message);
                }
            },

            error: function () {
                alert("Server error");
            }
        });

    });

});
