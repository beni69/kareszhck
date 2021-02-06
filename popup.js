document.addEventListener(
    "DOMContentLoaded",
    () => {
        document
            .querySelector("button")
            .addEventListener("click", onclick, false);

        function onclick() {
            const count = document.getElementById("count");
            const kps = document.getElementById("kps");
            const kpc = document.getElementById("kpc");
            const unlockall = document.getElementById("unlockall");
            chrome.tabs.query(
                {
                    currentWindow: true,
                    active: true,
                },
                tabs => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        count: count.value,
                        kps: kps.value,
                        kpc: kpc.value,
                        unlockall: unlockall.checked,
                    });
                }
            );
            window.close();
        }
    },
    false
);
