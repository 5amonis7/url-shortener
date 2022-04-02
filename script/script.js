const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const longLink = document.querySelector(".long-link")
const activateShorten = document.querySelector("#activate-shorten");
const links = document.querySelector("#links");
const copy = document.querySelectorAll(".copy");
const invalid = document.querySelector('#invalid');


let newLinks = [];

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


// Retrieve Shorten Link 
activateShorten.addEventListener("click", urlShorten)
longLink.addEventListener("keypress", (e) => {
    if (e.key === "Enter") { urlShorten() }
})


function urlShorten() {

    if (longLink.value === '' || isUrlValid(longLink.value) === false) {
        longLink.style.border = "2px solid red"
        longLink.classList.add('empty')
        invalid.style.display = 'block'
        longLink.value = ''
    } else {
        longLink.style.border = "none"
        longLink.classList.remove('empty')
        invalid.style.display = 'invalid'
        let value = longLink.value;
        fetch("https://api.shrtco.de/v2/shorten?url=" + value)
            .then(res => res.json())
            .then(
                (result) => {
                    newLinks.push(result);
                }
            )
            .then(() => {
                links.innerHTML = `<div></div>`;
                newLinks.map((cur, index) => {
                    let currentLink = cur.result.short_link;
                    links.insertAdjacentHTML(
                        "beforeend",
                        `<div class="output">
                            <p class="input-link">${cur.result.original_link}</p>

                            <div>
                            <p id="value${index}" class="output-link">${currentLink}</p>
                            <button id="copy${index}" onclick="copied(${index})" class="copy">Copy</button>
                            </div>
                        </div>`
                    )
                })
            })
            .then(longLink.value = "")
    }


}

function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
}

function copied(object) {
    const value = document.querySelector(`#value${object}`);
    let copyText = value.innerText;
    navigator.clipboard.writeText(copyText);

    // copy button style change
    const copy = document.querySelector(`#copy${object}`);
    copy.style.backgroundColor = 'hsl(257, 27%, 26%)';
    copy.innerText = "Copied!";

}
