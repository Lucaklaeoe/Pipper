const button = document.getElementById("submit");
const icon = document.getElementById("material-symbols-outlined");

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      icon.classList.toggle('move');
    });

    const maxChars = 255;

    function updateCharCount() {
        const textarea = document.getElementById('text');
        const remainingChars = maxChars - textarea.value.length;
        document.getElementById('countdown').textContent = remainingChars;
    }

    function updateCharCount() {
        const textarea = document.getElementById('name');
        const remainingChars = maxChars - textarea.value.length;
    }
    

     // Funktion til at åbne/lukke dropdown
     function toggleDropdown() {
        var dropdownContent = document.getElementById("myDropdown");
        if (dropdownContent.style.display === "flex") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "flex";
        }
    }