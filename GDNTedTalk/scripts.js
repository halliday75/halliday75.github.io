const content = {
    about: `
        <section id="about">
            <h1>Welcome to Innovatech</h1>
            <p>Innovatech is a cutting-edge software company revolutionizing technology to transform the way businesses operate.</p>
        </section>
    `,
    services: `
        <section id="services">
            <h2>Our Services</h2>
            <button onclick="loadServices()">Load Services</button>
            <div id="services-list" class="dynamic-content"></div>
        </section>
    `,
    team: `
        <section id="team">
            <h2>Meet Our Team</h2>
            <button onclick="loadTeam()">Load Team</button>
            <div id="team-list" class="dynamic-content"></div>
        </section>
    `,
    contact: `
        <section id="contact">
            <h2>Contact Us</h2>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
                
                <button type="submit">Submit</button>
            </form>
        </section>
    `
};

document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', (e) => {
        const section = e.target.getAttribute('data-section');
        document.getElementById('content').innerHTML = content[section];
    });
});

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
