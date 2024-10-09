function edit(edit_button){
    const saved_content = edit_button.parentElement.parentElement.querySelector(".content");

    const textarea = document.createElement("textarea");
    textarea.value = saved_content.textContent;
    textarea.classList.add("content");

    saved_content.parentElement.replaceChild(textarea, saved_content);
}