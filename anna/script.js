// Add event listeners to navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        switch(href) {
            case 'index.html':
                window.location.href = 'index.html';
                break;
            case 'about.html':
                window.location.href = 'about.html';
                break;
            case 'services.html':
                window.location.href = 'services.html';
                break;
            case 'resources.html':
                window.location.href = 'resources.html';
                break;
            case 'contact.html':
                window.location.href = 'contact.html';
                break;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Track if the menu is open or closed
    let isOpen = false;

    // Function to handle resizing logic for resetting the menu on desktop
    function resetMenuForDesktop() {
        if (window.innerWidth > 768) {
            // On desktop view, we want the menu to be visible by default
            navMenu.style.maxHeight = 'none'; // Remove any max-height constraints
            navMenu.style.opacity = '1'; // Ensure the menu is visible
            navMenu.classList.add('active'); // Make sure the menu appears
            isOpen = true; // Consider the menu as open
        }
    }

    // Initial reset in case the page loads in desktop mode
    resetMenuForDesktop();

    // Resize listener to handle window resizing
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            resetMenuForDesktop();
        } else {
            // Reset the menu when transitioning back to mobile
            if (isOpen) {
                navMenu.style.maxHeight = '0';
                navMenu.style.opacity = '0';
                navMenu.classList.remove('active');
                navMenu.style.pointerEvents = 'none'; // Ensure the opacity transition works
                isOpen = false;
            }
        }
    });

    // Hamburger click toggle logic
    hamburger.addEventListener('click', function () {
        if (!isOpen) {
            // When opening the menu, we calculate its height and set max-height to this value
            const menuHeight = navMenu.scrollHeight; // Get the actual height of the menu
            navMenu.style.maxHeight = `${menuHeight}px`; // Set max-height to the actual height
            navMenu.style.opacity = 1; // Ensure the opacity transition works
            navMenu.style.pointerEvents = 'auto'; // Ensure the opacity transition works
            navMenu.classList.add('active');
            isOpen = true;
        } else {
            // When closing, we set max-height to 0, which will trigger the closing transition
            navMenu.style.maxHeight = '0';
            navMenu.style.opacity = 0; // Ensure the opacity transition works
            navMenu.classList.remove('active');
            navMenu.style.pointerEvents = 'none'; // Ensure the opacity transition works
            isOpen = false;
        }
    });
});

