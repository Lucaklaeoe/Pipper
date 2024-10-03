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