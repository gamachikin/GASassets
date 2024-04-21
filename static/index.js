const setObj = function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
}
const getObj = function (key) {
    return JSON.parse(localStorage.getItem(key))
}
        // Function to set the theme
        function setTheme(theme) {
            // Set the theme attribute on the body
            document.body.setAttribute('theme', theme);
            // Store the theme in local storage
            localStorage.setItem('theme', theme);
        }

        // Apply the stored theme or default theme on page load
        document.addEventListener('DOMContentLoaded', function() {
            const storedTheme = localStorage.getItem('theme');
            const themeSelect = document.getElementById('theme-select');
            if (storedTheme && themeSelect) {
                setTheme(storedTheme);
                themeSelect.value = storedTheme; // Set the selected value in the theme dropdown
            } else {
                // Default theme if no theme is stored
                const defaultTheme = 'main';
                setTheme(defaultTheme);
                if (themeSelect) {
                    themeSelect.value = defaultTheme; // Set the selected value in the theme dropdown
                }
            }
        });

        // Event listener for theme selection
        document.getElementById('theme-select').addEventListener('change', function() {
            const selectedTheme = this.value;
            setTheme(selectedTheme);
        });

// Function to change the tab title
function changeTabTitle(newTitle) {
    document.title = newTitle;  // Change the title of the current tab
    localStorage.setItem('tabTitle', newTitle);  // Store the tab title in local storage
}

// Function to change the favicon
function changeFavicon(faviconUrl) {
    var favicon = document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
        favicon.href = faviconUrl;  // Change the favicon of the current tab
        localStorage.setItem('faviconUrl', faviconUrl);  // Store the favicon URL in local storage
    }
}

// Check if there are stored values for tab title and favicon and apply them
window.onload = function() {
    var storedTitle = localStorage.getItem('tabTitle');
    var storedFaviconUrl = localStorage.getItem('faviconUrl');
    
    if (storedTitle) {
        changeTabTitle(storedTitle);
    }
    
    if (storedFaviconUrl) {
        changeFavicon(storedFaviconUrl);
    }
};

// Function to change the tab title
function changeTabTitle(newTitle) {
    document.title = newTitle;  // Change the title of the current tab
    localStorage.setItem('tabTitle', newTitle);  // Store the tab title in local storage
}

// Function to change the favicon
function changeFavicon(faviconUrl) {
    var favicon = document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
        favicon.href = faviconUrl;  // Change the favicon of the current tab
        localStorage.setItem('faviconUrl', faviconUrl);  // Store the favicon URL in local storage
    }
}

// Check if there are stored values for tab title and favicon and apply them
window.onload = function() {
    var storedTitle = localStorage.getItem('tabTitle');
    var storedFaviconUrl = localStorage.getItem('faviconUrl');
    
    if (storedTitle) {
        changeTabTitle(storedTitle);
    }
    
    if (storedFaviconUrl) {
        changeFavicon(storedFaviconUrl);
    }
};


