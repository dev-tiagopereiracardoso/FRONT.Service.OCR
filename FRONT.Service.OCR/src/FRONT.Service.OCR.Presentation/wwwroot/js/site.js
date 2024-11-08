$(document).ready(function () {

    var inputFile = document.getElementById("tm-choose-file");
    var inputFileName = document.getElementById("tm-file-name");
    inputFile.addEventListener("change", tmScript);

    function tmScript() {
        inputFileName.innerText = this.files[0].name;
    }


    jQuery(".input-file-wrap label").append("<span class='file-name'> NO FILE CHOOSEN </span>");
    jQuery('.input-file-wrap input[type="file"]').change(function (e) {
        FileName = e.target.files[0].name;
        jQuery(".input-file-wrap .file-name").text(FileName);
    });

    $(".loading").hide();

    $("#upload").on("submit", function (e) {
        e.preventDefault();

        $(".loading").show();
        setTimeout(function () {
            var file = $("#tm-choose-file")[0].files[0];
            var formData = new FormData();
            formData.append("file", file);

            $.ajax({
                url: "", // URL to send the file for OCR
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                error: function (a, b, c) {
                    $(".loading").hide();
                },
                success: function (response) {
                    $(".div-text").html(response.text);

                    if ($("#questionChatGPT").val() != "") {
                        var Json = new Object();
                        Json.Question = $("#questionChatGPT").val() + response.text;

                        JAjaxSync(
                            "POST",
                            "", // URL to send the question to ChatGPT
                            JSON.stringify(Json),
                            ReturnChatGPTError,
                            null,
                            ReturnChatGPTSuccess,
                            null);
                    }
                }
            });
        }, 1000);
    });
});

function ReturnChatGPTError(er, x, z) {
    console.log(er);
    console.log(x);
    console.log(z);
}

function ReturnChatGPTSuccess(data) {
    $(".div-text-final").html(data);
    $(".loading").hide();
    $(".div-result").show();
}