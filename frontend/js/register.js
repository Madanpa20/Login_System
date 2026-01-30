$(document).ready(function () {
    console.log("Register page loaded");

    $("#registerBtn").click(function () {
        console.log("Register button clicked");

        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();

        console.log(name, email, password);

        if (name === "" || email === "" || password === "") {
            alert("All fields are required");
            return;
        }

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
                alert(response.message);
            },
            error: function (xhr, status, error) {
                console.log("AJAX Error:", xhr.responseText);
                console.log("Status:", status);
                console.log("Error:", error);
                alert("Something went wrong: " + xhr.responseText);
            }
        });
    });
});