const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

let state = false;
hamburger.addEventListener("click", () => {
    if (!state) {
        menu.style.height = "20rem";
        state = true;
    }
    else {
        menu.style.height = "0";
        state = false;
    }
})