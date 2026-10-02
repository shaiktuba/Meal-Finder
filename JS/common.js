// common.js


// ---------------- MENU ----------------

const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const menuList = document.getElementById("menuList");


// Open menu
function openMenu() {
    sideMenu.classList.add("open");
    overlay.classList.add("show");
}


// Close menu
function closeMenu() {
    sideMenu.classList.remove("open");
    overlay.classList.remove("show");
}


// Button events
if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", openMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu);
}

if (overlay) {
    overlay.addEventListener("click", closeMenu);
}


// ---------------- LOAD MENU ----------------

async function loadMenu() {

    if (!menuList) {
        return;
    }

    try {

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        const data = await response.json();

        const categories = data.categories || [];

        let output = "";

        categories.map(function(category) {

            output += `
                <li>
                    <a href="category.html?c=${category.strCategory}">
                        ${category.strCategory}
                    </a>
                </li>
            `;

        });

        menuList.innerHTML = output;

    } catch (error) {

        console.log("Error:", error);

        menuList.innerHTML = "<li>Could not load menu</li>";
    }
}


loadMenu();