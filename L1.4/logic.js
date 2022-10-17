function css(id) {
    id.style.display = 'none';
}

function js(id) {
    id.remove();
}

function jsCss(id) {
    id.classList.toggle("hidden");
}

function showRect() {
    const elem = document.getElementsByClassName("squaretGroup"); 
    for (let i = 0; i < elem.length; i++) {
        elem[i].classList.toggle("hidden");
    }
}

function changeBySelector() {
    const selector = document.getElementById("selector").value;
    const elem = document.querySelectorAll(selector);
    elem.forEach(el => el.classList.toggle("hidden"));
}

document.getElementById('yellowSquare').addEventListener("click", changeEvent);

function changeEvent() {
    alert("Hello!");
    document.getElementById('yellowSquare').removeEventListener("click", changeEvent);
    document.getElementById('yellowSquare').addEventListener("click", function() {jsCss(this)}); //если есть параметры нужно делать так
}

function show(id) {
    id.classList.remove("hidden");
}

function hide(id) {
    id.classList.add("hidden");
}

let greenRect = document.getElementById('greenRectangle');
document.getElementById('input').addEventListener("focus", function() {show(greenRect)});
document.getElementById('input').addEventListener("focusout", function() {hide(greenRect)});
document.getElementById('input').addEventListener("input", function() {hide(greenRect)});

function getImg() {
    const imgLink = document.getElementById('inputImg').value;
    document.getElementById('img').src = imgLink;
}

function viewLincs() {
    let x = document.getElementById('linksArea').value
        .match(/\S+\.(jpg|jpeg|png|ico)/g)
        .forEach(item => {
            let tag = document.createElement('img');
            tag.src = item;
            tag.classList.add('compactImg');
            document.getElementById('vewImg').appendChild(tag);
        })
}

function viewCoords(event) {
    let coord = `X: ${event.clientX} Y: ${event.clientY}`;
    document.getElementById("coord").innerHTML = coord;
}

//viewLeng();
function viewLeng() {
    document.getElementById("userLang").innerHTML = `Language: ${navigator.language}`;        
}

//viewGPS() 
function viewGPS() {
    navigator.geolocation.getCurrentPosition(function(e){
        document.getElementById("gps").innerHTML = `Ш: ${e.coords.latitude} Д:${e.coords.longitude}`;
    });
}

//task 13

function bodyIsLoaded() {
    viewLeng();
    viewGPS() 
    document.getElementById("thirteenInput1").value = localStorage.getItem("thirteenInput1");
    document.getElementById("thirteenInput2").value = sessionStorage.getItem("thirteenInput2");
    document.getElementById("thirteenInput3").value = getDataFromCookie("thirteenInput3");
    initInputArea();
}
document.getElementById("thirteenInput1").addEventListener("focusout", saveWithLocalStorage);
document.getElementById("thirteenInput2").addEventListener("focusout", saveWithSessionStorage);
document.getElementById("thirteenInput3").addEventListener("focusout", saveWithCookies);

function saveWithLocalStorage() {
    const massage = document.getElementById("thirteenInput1").value;
    localStorage.setItem('thirteenInput1', massage);
}

function saveWithSessionStorage() {
    const massage = document.getElementById("thirteenInput2").value;
    sessionStorage.setItem("thirteenInput2", massage);
}

function saveWithCookies() {
    const massage = document.getElementById("thirteenInput3").value;
    let d = new Date();
    d.setTime(d.getTime() + 3600000);
    document.cookie = `thirteenInput3=${massage};expires=${d.toUTCString()};`;
}

function getDataFromCookie(name) {
    return document.cookie.split(';')
    .find(item => item.includes(name))
    .split('=')[1]
}


//14
window.addEventListener('scroll', goToTopPage);

function goToTopPage() {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if(windowRelativeBottom <= document.documentElement.clientHeight) {
        let tag = document.createElement("img");
        tag.id = "goToTopButton";
        tag.src = "images/arrow_up.png"
        tag.addEventListener("click", () => window.scroll({ top: 0, behavior: 'smooth' }));
        document.body.append(tag);
    } else if(windowRelativeBottom > document.documentElement.clientHeight + 100) {
        document.getElementById("goToTopButton")?.remove();
    }
}

//15
squareInSquare.onclick = function(event) {
    if(event.target.className.includes('sqr')) {
        alert(`I\`m square`);
        console.log(event);
    }
}
//16
function showGreyScreen() {
    let tag = document.createElement("div");
    tag.id = "greySquare";
    tag.value = "I\`s over"
    tag.addEventListener("click", function() {
        js(this);
        document.body.style.overflow = "scroll";
    });
    document.body.append(tag);
    document.body.style.overflow = "hidden";
}

function initInputArea() {
    const wrap = document.querySelector('.inputWrapper');
    const icon = document.querySelector('.inputIcon');

    const active = () => {
        wrap.style.backgroundColor = '#7fffd4';
    }

    const inactive = () => {
        wrap.style.backgroundColor = '#f0f8ff';
    }

    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eName => {
        wrap.addEventListener(eName, prevents);
    });

    ['dragenter', 'dragover'].forEach(eName => {
        wrap.addEventListener(eName, active);
    });

    ['dragleave', 'drop'].forEach(eName => {
        wrap.addEventListener(eName, inactive);
    });

    wrap.addEventListener('drop', (e) => {
        icon.src = "images/2.png";
        const dt = e.dataTransfer;
        const file = dt.files;
        
    });
}

