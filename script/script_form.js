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

    document.getElementById("form_new_post").addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const name = document.getElementById("name").value;
        const content = document.getElementById("content").value;
        
        const data = {
            name: name,
            content: content,
    
        };
        const url = "http://localhost:8000/newpip";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        
        const response = await fetch(url, options)
        const cat = await response.json();
        
        console.log(newpiper_data);
        console.log("Det fucking virker!");
        
    })