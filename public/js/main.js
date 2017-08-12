console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
function hidePasswordMessages(){
    console.log("=============================================\n");
    console.log("                This is hidePasswordMessages \n");
    console.log("=============================================\n");
    $("#passwordChangeSuccess").addClass("hide");
    $("#passwordChangeError").addClass("hide");
}

function requestPasswordChange(username) {
    console.log("=============================================\n");
    console.log("                This is requestPasswordChange\n");
    console.log("=============================================\n");
    $.ajax({
        url: "/api/updatePassword",
        type: "POST",
        data: JSON.stringify({
            user: username,
            currentPassword: $("#currentPassword").val(),
            password: $("#password").val(),
            password2: $("#password2").val(),
        }),
        contentType: "application/json"
    }).done(function (data) {
        console.log(data);
        hidePasswordMessages();
        if(data.successMessage){
            $("#passwordChangeSuccess").removeClass("hide").children(".alert").text(data.successMessage+data.user);
        }else if(data.errorMessage){
            $("#passwordChangeError").removeClass("hide").children(".alert").text(data.errorMessage+data.user);
        }
    }).fail(function (jqXHR) {
        $("#passwordChangeError").removeClass("hide").children(".alert").text("AJAX Error: " + jqXHR.responseText);
    });
}

$(document).ready(function () {
    $('#profileModal').on('hidden.bs.modal', function (e) {
        $(".passwordReset").val("");
        hidePasswordMessages();
    })
});