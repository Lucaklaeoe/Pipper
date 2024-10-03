const button = document.getElementById("submit");
const icon = document.getElementById("material-symbols-outlined");

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      icon.classList.toggle('move');
    });