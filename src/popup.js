document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();

    const k = document.getElementById("k").value;
    const kps = document.getElementById("kps").value;
    const kpc = document.getElementById("kpc").value;

    console.log({ k, kps, kpc });
});
