const template = document.getElementById("post_template");
const output = document.getElementById("Posts");
var search_input = document.getElementById("Profile_search").value;

//saves name to loclal storage
if (localStorage.getItem("post_content") != null) {
    search_input = localStorage.getItem("post_content");
    document.getElementById("Profile_search").value = search_input;
    Getdata();
}

//gets data from server with the name from input
async function Getdata(event) {
    const url = "http://localhost:8000/";

    const options = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        const pipper_data = await response.json();
        output.innerHTML = "";

        // Arrays til matchende og ikke-matchende opslag
        const matchingPosts = [];
        const nonMatchingPosts = [];

        // Sortér opslagene i matchende og ikke-matchende
        pipper_data.forEach((pip) => {
            if (pip.content.toLowerCase().includes(search_input.toLowerCase())) {
                matchingPosts.push(pip);
            } else {
                nonMatchingPosts.push(pip);
            }
        });

        // Vis først de matchende opslag
        matchingPosts.forEach((pip) => {
            const clon = template.content.cloneNode(true);
            if (pip.avatar == "") {
                pip.avatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian";
            }
            clon.querySelector(".avatar").src = pip.avatar;
            clon.querySelector(".overskrift").innerHTML = pip.name;
            clon.querySelector(".content").innerHTML = pip.content;

            clon.querySelector(".likes").innerHTML = pip.like_count;
            clon.querySelector(".timestamp").innerHTML = "Last Edit: " + pip.created_at;

            output.appendChild(clon);
        });

        // Vis derefter de ikke-matchende opslag
        nonMatchingPosts.forEach((pip) => {
            const clon = template.content.cloneNode(true);
            if (pip.avatar == "") {
                pip.avatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian";
            }
            clon.querySelector(".avatar").src = pip.avatar;
            clon.querySelector(".overskrift").innerHTML = pip.name;
            clon.querySelector(".content").innerHTML = pip.content;

            clon.querySelector(".likes").innerHTML = pip.like_count;
            clon.querySelector(".timestamp").innerHTML = "Last Edit: " + pip.created_at;

            output.appendChild(clon);
        });

        console.log(pipper_data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

if (search_input === "" || search_input == null) {
    Getdata();
}

//sets input to local storage and calls Getdata function
document.getElementById("Profile_search").addEventListener("input", function () {
    search_input = document.getElementById("Profile_search").value;
    if (search_input !== "") {
        output.innerHTML = "";
        Getdata();
    }

    localStorage.setItem("post_content", search_input);
});
