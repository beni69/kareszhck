chrome.runtime.onMessage.addListener(request => {
    const {count, kps, kpc} = request;
    var script = document.createElement("script");
    let text = [];
    if (count != "")
        text.push(`localStorage.setItem("kareszCount", ${request.count})`);
    if (kps != "") text.push(`localStorage.setItem("kps", ${request.kps})`);
    if (kpc != "") text.push(`localStorage.setItem("kpc", ${request.kpc})`);

    if (text.length > 0) text.unshift('localStorage.setItem("saved", "true")');
    script.textContent = text.join(";");
    document.head.appendChild(script);
    console.debug(request);
    console.log("Karesz Hack > Succesfully added Karesz.");
    console.debug(script.textContent);
});
