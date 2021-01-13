// alert("xd");
// buyKareszGenerator(${request[1]})
chrome.runtime.onMessage.addListener(function (request) {
    const injectedCode = `
    ${request[0] != "" ? `kareszCount=${request[0]};` : ""}
    ${request[1] != "" ? `kps=${request[1]};` : ""}
    ${request[2] != "" ? `kpc=${request[2]}` : ""}
    update();
    // karesz hack moment
    `;
    var script = document.createElement("script");
    script.textContent = injectedCode;
    document.head.appendChild(script);
    console.log("Karesz Hack > Succesfully added Karesz.");
    console.debug(`Karesz Hack > ${request}`);
});
