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
            if ($("#tm-choose-file")[0].files.length > 0) {
                var formData = new FormData();
                formData.append("text", $("#questionChatGPT").val());
                formData.append("file", file);

                $.ajax({
                    url: "https://api.ocr.pro.dev.isoftforge.com/v1/process/ocr/chatgpt", // URL to send the file for OCR
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    error: function (a, b, c) {
                        console.log(a);
                        console.log(b);
                        console.log(c);

                        $(".div-result").show();
                        $(".div-text").html(a.responseJSON.message);

                        $(".loading").hide();
                    },
                    success: function (response) {
                        console.log(response);
                        $(".div-text").html(response.text);

                        $(".div-result").show();
                        $(".loading").hide();
                    }
                });
            }
            else {
                $(".loading").hide();
            }
        }, 1000);
    });
});