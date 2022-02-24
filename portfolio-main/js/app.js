'use strict'

window.addEventListener("load", function (event) {
    let loaderImg = document.getElementById('preloader');
    loaderImg.style.display = 'none';
});

//Dark Mode -Light Mode
function themeChange() {
    const body = document.getElementsByTagName('body');
    const mode = document.getElementById('mode');

    mode.addEventListener('change', () => {
        body[0].classList.toggle('dark');
    });
}

themeChange();



const button = document.querySelector("#back2top");
// Call the BACK2TOP Function
// BACK2TOP(element, offsetToValue)
BACK2TOP(button, 200);


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//Active Class Add Remove
function addRemove(e) {
    // Get the container element
    var linkContainer = document.querySelector(".footer-menu");
    // Get all buttons with class="btn" inside the container
    var links = linkContainer.getElementsByClassName("nav-link");

    // Loop through the buttons and add the active class to the current/clicked button
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}
addRemove();

//Footer Year
document.getElementById("year").innerHTML = new Date().getFullYear();

//Form Submit
const form = document.getElementById('form');
const result = document.getElementById('msg');

form.addEventListener('submit', function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.style.display = "inline-block";
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.style.display = "inline-block";
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
