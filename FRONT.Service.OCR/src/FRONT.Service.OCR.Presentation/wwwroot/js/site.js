function ProcessImage(data) {
    $(".loading").show();

    setTimeout(function () {
        var Obj = new Object();
        Obj.base64 = data;
        JAjaxSync("POST", "https://api.chatgpt.pro.dev.isoftforge.com/v1/chatgpt/question", JSON.stringify(Obj), null, null, ProcessImageSuccess, null);

    }, 1000);
    
}

function ProcessImageSuccess(data) {
    console.log(data);
    $(".div-text").html(data);
    $(".div-result").show();
    $(".loading").hide();
}

(function () {
    if (
        !"mediaDevices" in navigator ||
        !"getUserMedia" in navigator.mediaDevices
    ) {
        alert("Camera API is not available in your browser");
        return;
    }

    // get page elements
    const video = document.querySelector("#video");
    const btnPlay = document.querySelector("#btnPlay");
    const btnPause = document.querySelector("#btnPause");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const btnChangeCamera = document.querySelector("#btnChangeCamera");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");

    // video constraints
    const constraints = {
        video: {
            optional: [
                { minWidth: 320 },
                { minWidth: 640 },
                { minWidth: 1024 },
                { minWidth: 1280 },
                { minWidth: 1920 },
                { minWidth: 2560 },
            ]
        },
    };

    // use front face camera
    let useFrontCamera = false;

    // current video stream
    let videoStream;

    // handle events
    // play
    btnPlay.addEventListener("click", function () {
        video.play();
        btnPlay.classList.add("is-hidden");
        btnPause.classList.remove("is-hidden");
    });

    // pause
    btnPause.addEventListener("click", function () {
        video.pause();
        btnPause.classList.add("is-hidden");
        btnPlay.classList.remove("is-hidden");
    });

    // take screenshot
    btnScreenshot.addEventListener("click", function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);

        var img = $('<div><a onclick=ProcessImage("' + canvas.toDataURL("image/png") + '")><img src=' + canvas.toDataURL("image/png") +' /></a></div>'); 
        img.attr('src', canvas.toDataURL("image/png"));
        img.appendTo('#screenshots')
    });

    // switch camera
    btnChangeCamera.addEventListener("click", function () {
        useFrontCamera = !useFrontCamera;

        initializeCamera();
    });

    // stop video stream
    function stopVideoStream() {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    // initialize
    async function initializeCamera() {
        stopVideoStream();
        constraints.video.facingMode = useFrontCamera ? "user" : "environment";

        try {
            videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = videoStream;
        } catch (err) {
            alert("Could not access the camera");
        }
    }

    initializeCamera();
})();

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
