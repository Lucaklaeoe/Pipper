const button = document.getElementById("submit");
const icon = document.getElementById("material-symbols-outlined");

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      icon.classList.toggle('move');
    });

    const maxChars = 255;
    const textarea = document.getElementById('text');
    textarea.addEventListener('input', updateCharCount);
    const countdown = document.getElementById('countdown');

    function updateCharCount() {
        
        const remainingChars = maxChars - textarea.value.length;
        countdown.textContent = remainingChars;
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

    document.getElementById("submit").addEventListener("click", async (event) => {
        event.preventDefault();
    
        const name = document.getElementById("name").value;
        const content = document.getElementById("text").value;
        
        const data = {
            name: name,
            content: content
    
        };
        try{
            console.log(data)
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
            console.log("Det fucking virker!");
        }
        catch(error) {
            console.log(error);
        }
        
        
        
    })