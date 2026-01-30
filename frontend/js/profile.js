$(document).ready(function () {
    // 1. Session Check
    let token = localStorage.getItem("session_token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // 2. Fetch Profile Data
    function loadProfile() {
        $.ajax({
            url: "../backend/profile_fetch.php",
            type: "POST",
            dataType: "json",
            data: { token: token },
            success: function (res) {
                if (res.status === "success") {
                    // Populate fields
                    $("#name").val(res.data.name);
                    $("#email").val(res.data.email);
                    $("#age").val(res.data.age);
                    $("#dob").val(res.data.dob);
                    $("#contact").val(res.data.contact);
                } else {
                    console.error("Fetch Error:", res.message);
                    if (res.message === "Invalid session") {
                        logoutUser();
                    } else {
                        showToast("error", "Error", "Failed to load profile: " + res.message);
                    }
                }
            },
            error: function (xhr) {
                console.error("Network Error:", xhr);
                showToast("error", "Connection Failed", "Could not connect to the server.");
            }
        });
    }

    // 3. Update Profile
    $("#updateProfileBtn").click(function (e) {
        e.preventDefault();

        let age = $("#age").val();
        let dob = $("#dob").val();
        let contact = $("#contact").val();

        // Basic Client-side Verification
        if (age && age < 1) {
            showToast("warning", "Invalid Input", "Please enter a valid age.");
            return;
        }

        // Disable button
        let btn = $(this);
        btn.prop("disabled", true).text("Updating...");

        $.ajax({
            url: "../backend/profile_update.php",
            type: "POST",
            dataType: "json",
            data: {
                token: token,
                age: age,
                dob: dob,
                contact: contact
            },
            success: function (res) {
                if (res.status === "success") {
                    showToast("success", "Profile Updated", res.message);
                } else {
                    showToast("error", "Update Failed", res.message);
                }
            },
            error: function () {
                showToast("error", "System Error", "Update failed. Server error.");
            },
            complete: function () {
                btn.prop("disabled", false).text("Update Profile");
            }
        });
    });

    // 4. Logout Logic
    function logoutUser() {
        localStorage.removeItem("session_token");
        window.location.href = "login.html";
    }

    $("#logoutBtn").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: "../backend/logout.php",
            type: "POST",
            data: { token: token },
            complete: function () {
                logoutUser();
            }
        });
    });

    // Initial Load
    loadProfile();

});