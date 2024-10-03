const template = document.getElementById("post_template");
const output = document.getElementById("Posts");


async function Getdata(event) {

    const url = "http://localhost:8000/data";
    const options = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        const pipper_data = await response.json();

        pipper_data.forEach((pip) => {
            const clon = template.content.cloneNode(true);
            if(pip.avatar == "") {
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



Getdata();