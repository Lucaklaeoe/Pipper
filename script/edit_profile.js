function edit(edit_button){
    const saved_content = edit_button.parentElement.parentElement.querySelector(".content");
    const post = saved_content.parentElement;

    const textarea = document.createElement("textarea");
    textarea.value = saved_content.textContent;
    textarea.classList.add("content");

    saved_content.parentElement.replaceChild(textarea, saved_content);

    const buttons = document.createElement("div");
    buttons.classList.add("actions");
    buttons.innerHTML = "<a class='save' onclick='save(this)'>Save</a> <a class='delete' onclick='delete_post(this)'>Delete</a>";
    console.log(buttons);

    post.appendChild(buttons);
    edit_button.remove();
}

async function save(button){
    const post = button.parentElement.parentElement;

    const name = post.querySelector(".overskrift").textContent;
    const content = post.querySelector(".content").value;
    const avatar = post.querySelector(".avatar").src;
    
    const data = {
        ID: post.id,
        name: name,
        content: content,
        avatar: avatar,
    };

    try{
        const url = "http://localhost:8000";
        const options = {
            method: "PUT",
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

}

async function delete_post(button){
    const post = button.parentElement.parentElement;

    const data = {
        ID: post.id,
    };

    try{
        const url = "http://localhost:8000";
        const options = {
            method: "Delete",
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

    post.remove();
}