const content = {
    about: `
        <section id="about">
        <h1>Welcome to Innovatech</h1>
        <p>Welcome to Innovatech, where innovation meets technology to shape a smarter future. Since our founding in 2010, we have dedicated ourselves to designing cutting-edge solutions that empower businesses to succeed in a constantly evolving digital landscape. By blending creativity with advanced technology, Innovatech delivers software solutions tailored to meet the unique challenges of our clients.</p>
        <p>Our mission is simple: to simplify complexity. Whether you're navigating the challenges of artificial intelligence, optimizing cloud infrastructure, or exploring blockchain for your business, Innovatech is your trusted partner. We strive to bridge the gap between groundbreaking technology and practical applications, making advanced solutions accessible and impactful for businesses of all sizes.</p>
        <p>At Innovatech, we pride ourselves on our team of forward-thinking innovators. From software engineers and data scientists to UX designers and project managers, each team member brings expertise and passion to the table. Together, we have successfully completed hundreds of projects across diverse industries, including healthcare, finance, retail, and manufacturing.</p>
        <p>But our story doesn’t end with technology. At Innovatech, we believe in giving back. Our commitment to sustainability and social impact drives our green coding initiatives and our partnerships with non-profits worldwide. By promoting ethical development practices and creating opportunities for underrepresented communities in tech, we aim to contribute to a better, more equitable world.</p>
        <p>Join us on this journey of innovation. At Innovatech, we don't just build software—we build futures. Let's create something extraordinary together.</p>
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

document.addEventListener("DOMContentLoaded", function () {
    const div = document.getElementById("locContent");
    if (div && window.location.href.endsWith('fr-FR/')) {
        const p = document.createElement("p");
        p.textContent = "Le meilleur logiciel au monde";
        div.appendChild(p);
    }
});
