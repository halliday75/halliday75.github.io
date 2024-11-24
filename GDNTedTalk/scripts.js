function loadServices() {
    const services = [
        "Custom Software Development",
        "Cloud Computing Solutions",
        "AI-Powered Analytics",
        "Blockchain Integration",
        "Cybersecurity Services"
    ];

    const servicesList = document.getElementById("services-list");
    servicesList.innerHTML = ""; // Clear previous content

    const ul = document.createElement("ul");
    services.forEach(service => {
        const li = document.createElement("li");
        li.textContent = service;
        ul.appendChild(li);
    });

    servicesList.appendChild(ul);
}

function loadTeam() {
    const team = [
        { name: "Alice Johnson", role: "CEO & Founder" },
        { name: "Bob Smith", role: "CTO" },
        { name: "Clara Lee", role: "Lead Designer" },
        { name: "Daniel Martin", role: "Senior Developer" }
    ];

    const teamList = document.getElementById("team-list");
    teamList.innerHTML = ""; // Clear previous content

    team.forEach(member => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${member.name}</strong>: ${member.role}`;
        teamList.appendChild(div);
    });
}
