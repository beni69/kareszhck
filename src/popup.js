// get the current tab id
let tabId;
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    tabId = tabs[0].id;

    chrome.tabs.sendMessage(tabId, "ping", res => {
        // set up content script if it doesnt exist
        if (chrome.runtime.lastError || res != "pong")
            chrome.scripting.executeScript({
                target: { tabId },
                function: content,
            });
        console.log(res);
    });
});

// stuff on submit
document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();

    const k = document.getElementById("k").value;
    const kps = document.getElementById("kps").value;
    const kpc = document.getElementById("kpc").value;

    const opts = { k, kps, kpc };

    chrome.tabs.sendMessage(tabId, opts);
});

document.getElementById("resetBtn").addEventListener("click", e => {
    const opts = { k: "0", kps: "0", kpc: "0", reset: true };

    chrome.tabs.sendMessage(tabId, opts);
});

// actual content script
function content() {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg == "ping") return sendResponse("pong");

        console.debug({ msg, sender });

        const warning =
            "WARNING: This will overwrite your save and your current game.\nDo you want to continue?";
        if (!confirm(warning)) return;

        const { k, kps, kpc } = msg;
        if (k != "") localStorage.setItem("kareszCount", k);
        if (kps != "") localStorage.setItem("kps", kps);
        if (kpc != "") localStorage.setItem("kpc", kpc);

        if (!localStorage.getItem("hackTip")) {
            localStorage.setItem("hackTip", true);
            const hackTip = `Done. We will try to automatically load the changes, but if that doesn't work, click the "Load" button.\n\nThis message will only show once`;
            alert(hackTip);
        }

        const loadBtn = document.getElementById("loadButton");
        loadBtn.click();
    });

    console.log("Karesz Clicker Hack > Content script loaded!");
}
