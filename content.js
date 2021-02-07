chrome.runtime.onMessage.addListener(request => {
    if (
        !confirm(
            "WARNING: This will overwrite your save.\nDo you want to continue?"
        )
    )
        return;

    const {count, kps, kpc, unlock} = request;
    var script = document.createElement("script");
    let text = [];
    if (count != "")
        text.push(`localStorage.setItem("kareszCount", ${request.count})`);
    if (kps != "") text.push(`localStorage.setItem("kps", ${request.kps})`);
    if (kpc != "") text.push(`localStorage.setItem("kpc", ${request.kpc})`);
    if (unlock)
        text.push(
            'let items = JSON.parse(localStorage.getItem("items"));items.forEach(item => (item.unlocked = true));localStorage.setItem("items", JSON.stringify(items));'
        );

    if (text.length > 0) text.unshift('localStorage.setItem("saved", "true")');

    script.textContent = text.join(";");
    document.head.appendChild(script);
    console.log("Karesz Hack > Succesfully added Karesz.");
    console.debug(request);
    console.debug(script.textContent);

    if (!localStorage.getItem("hackOverwriteWarning")) {
        alert(
            "Done. To receive your Karesz, click the load button.\n\nThis message will only show once"
        );
        localStorage.setItem("hackOverwriteWarning", true);
    }
});
