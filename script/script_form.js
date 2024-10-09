const maxChars = 255;
const textarea = document.getElementById('text');
textarea.addEventListener('input', updateCharCount);
const countdown = document.getElementById('countdown');

//update character count
function updateCharCount() {
    const remainingChars = maxChars - textarea.value.length;
    countdown.textContent = remainingChars;
}

// Funktion til at åbne/lukke dropdown
const dropdownContent = document.getElementById("myDropdown");

function toggleDropdown() {
    if (dropdownContent.style.display == "flex") {
        dropdownContent.style.display = "none";
    } 
    else {
        dropdownContent.style.display = "flex";
    }
}

// Funktion til at skifte avatar
const current_avatar = document.getElementById("selected_avatar");
var old_avatar;
function changeavatar(element) {
    old_avatar = current_avatar.firstChild.src;
    current_avatar.firstChild.src = element.firstChild.src;
    element.firstChild.src = old_avatar;

    dropdownContent.style.display = "none";
}

//Send post med date til server
document.getElementById("submit").addEventListener("click", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const content = document.getElementById("text").value;
    const avatar = current_avatar.firstChild.src;
    
    const data = {
        name: name,
        content: content,
        avatar: avatar,
    };
    try{
        const url = "http://localhost:8000";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options)
        const pipper_data = await response.json();

        console.log(pipper_data);
    }
    catch(error) {
        console.log(error);
    }
    
    
    
})


let currentPosition = 0; // Variabel til at holde styr på den aktuelle position
document.getElementById("submit").addEventListener("click", function () {
    currentPosition += 550; // Øg positionen med 100px hver gang der klikkes
    moveIcon();
});

function moveIcon() {
    const icon = document.getElementById("material-symbols-outlined");

    // Opdater ikonets position ved at justere transform-værdien
    icon.style.transform = `translateX(${currentPosition}px)`;

    //spil den seje lyd
    var audio = new Audio('sounds/Send a pipe.mp3');
    audio.play();

    setTimeout(() => {
        location.reload();
    }, 1200);
    
}