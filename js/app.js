//Loader
window.onload = function () {

    setTimeout(function () {

       // document.getElementById("loader").remove();

    }, 1000);

};

//Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

//AOS
AOS.init();

//Form
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});

//Go to top button
mybutton = document.getElementById("myBtn");

window.addEventListener('scroll', function () {
    scrollFunction()
})

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Sticky Header
function stickyHeader() {
    window.addEventListener('scroll', function () {
        scrollFunction()
    });

    function scrollFunction() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            document.getElementById("header").classList.add('sticky');
        } else {
            document.getElementById("header").classList.remove('sticky');
        }
    }
}
stickyHeader();

//Side Menu
let menuBtn = document.querySelector('.menu-btn');
let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('.btn-close');

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('slide-in');
});
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('slide-in');
})

//Header Menu List Active Deactive Class
const activeLink = document.querySelectorAll('header nav ul li');
for (let clickTab of activeLink) {
    clickTab.onclick = function () {
        let activeClass = document.querySelectorAll('li.active');
        activeClass[0].classList.remove('active')
        clickTab.classList.add('active');
    }
}
//Sidebar Menu List Active Deactive Class
const activeLinkSidebar = document.querySelectorAll('.sidebar .inner .mobile-nav ul li');

for (let clickTab of activeLinkSidebar) {
    clickTab.addEventListener('click', function () {
        let activeClass = document.querySelectorAll('li.active');
        console.log(activeClass);
        activeClass[0].classList.remove('active')
        clickTab.classList.add('active');
    })
}
