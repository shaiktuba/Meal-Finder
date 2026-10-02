// home.js

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let mealsSection = document.getElementById("mealsSection");
let mealsGrid = document.getElementById("mealsGrid");
let noResultMsg = document.getElementById("noResultMsg");
let categoriesGrid=document.getElementById("categoriesGrid");
async function loadCategories() {
  try {
    let response = await fetch( "https://www.themealdb.com/api/json/v1/1/categories.php" ); 
    let data = await response.json(); 
    let categories = data.categories;
    let output = ""; 
    categories.map(function(category) { 
      output += ` 
          <a
           href="category.html?c=${category.strCategory}" 
           class="card" >
          <img 
              src="${category.strCategoryThumb}" 
              alt="${category.strCategory}" > 
          <h3 class="cate-name">
            ${category.strCategory}
          </h3> 
          </a> `; });
         categoriesGrid.innerHTML = output; 
        } catch (error) { 
          console.log("Error loading categories:", error); 
        } } 
loadCategories();

// Search meals
async function searchMeals(foodName) {
    try {

        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
        let data = await response.json();
        let meals = data.meals;
        mealsSection.hidden = false;
        if (!meals) {
            mealsGrid.innerHTML = "";
            noResultMsg.hidden = false;
            return;
        }
        noResultMsg.hidden = true;
        let output = "";
        meals.map(function(meal) {
            output += `
                <a href="meal.html?id=${meal.idMeal}" class="card">
                    <img 
                        src="${meal.strMealThumb}" 
                        alt="${meal.strMeal}">
                    <div class="card-body">
                        <h3 class="meal-name">${meal.strMeal}</h3>
                    </div>
                    
                </a>
            `;
        });
        mealsGrid.innerHTML = output;
    } catch (error) {
        console.log("Error:", error);
        mealsGrid.innerHTML =
            "<p>Something went wrong. Please try again.</p>";
    }}
// Search button
searchBtn.addEventListener("click", function() {
    let foodName = searchInput.value.trim();
    if (foodName === "") {
        mealsSection.hidden = true;
        return;
    }
    searchMeals(foodName);
});
// Press Enter
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        let foodName = searchInput.value.trim();
        if (foodName === "") {
            mealsSection.hidden = true;
            return;
        }
        searchMeals(foodName);
    }
});