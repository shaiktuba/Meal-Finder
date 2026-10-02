let params = new URLSearchParams(window.location.search);
let categoryName = params.get("c");
let categoryInfo = document.getElementById("categoryInfo");
let mealsGrid = document.getElementById("mealsGrid");
let noResultMsg = document.getElementById("noResultMsg");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
function goSearch() {
    let query = searchInput.value.trim();
    if (query === "") {
        return;
    }    window.location.href = `index.html?s=${query}`;
}
searchBtn.addEventListener("click", goSearch);
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        goSearch();
    }});
async function loadCategoryInfo() {
    try {
        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        let data = await response.json();
        let categories = data.categories || [];
        let category = categories.find(function(item) {
            return item.strCategory.toLowerCase() ===
                   categoryName.toLowerCase();
                          });
        if (!category) {
            categoryInfo.innerHTML = `
                <h2>${categoryName}</h2>
            `;
            return;
        }
        categoryInfo.innerHTML = `
            <h2>${category.strCategory}</h2>
            <p>${category.strCategoryDescription}</p>
        `;
    } catch (error) {
        console.log("Error:", error);
          }
}
async function loadCategoryMeals() {
    try {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        let data = await response.json();
        let meals = data.meals;
        if (!meals) {
            noResultMsg.hidden = false;
            mealsGrid.innerHTML = "";
            return;
        }
        noResultMsg.hidden = true;
        let output = "";
        meals.map(function(meal) {
            output += `
                <a href="meal.html?id=${meal.idMeal}" class="card">
                    <img
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >
                    <div class="card-body">
                        <h3 class="cate-name">${meal.strMeal}</h3>
                    </div>
                </a>
            `;
        });
        mealsGrid.innerHTML = output;
    } catch (error) {
        console.log("Error:", error);
        mealsGrid.innerHTML =
            "<p>Something went wrong. Please try again.</p>";
    }
}
if (!categoryName) {
    categoryInfo.innerHTML =
        "<p>No category selected.</p>";
} else {
    loadCategoryInfo();
    loadCategoryMeals();
}