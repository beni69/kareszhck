// function setKaresz() {
// const number = document.getElementById("number");

//     const js = `alert('cock');`;
//     const script = document.createElement("script");
//     script.innerHTML = js;
//     document.head.appendChild(script);
// }

document.addEventListener(
    "DOMContentLoaded",
    function () {
        document
            .querySelector("button")
            .addEventListener("click", onclick, false);
        function onclick() {
            const number = document.getElementById("number");
            const kps = document.getElementById("kps");
            const kpc = document.getElementById("kpc");
            chrome.tabs.query(
                {currentWindow: true, active: true},
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, [
                        number.value,
                        kps.value,
                        kpc.value,
                    ]);
                }
            );
            window.close();
        }
    },
    false
);
