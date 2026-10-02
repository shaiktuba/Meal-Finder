let mealId = location.search.split("=")[1];
let crumbName = document.getElementById("crumbName");
let mealImg = document.getElementById("mealImg");
let mealTitle = document.getElementById("mealTitle");
let mealCategory = document.getElementById("mealCategory");
let mealSource = document.getElementById("mealSource");
let mealTags = document.getElementById("mealTags");
let ingredientsList = document.getElementById("ingredientsList");
let measuresGrid = document.getElementById("measuresGrid");
let instructionsList = document.getElementById("instructionsList");
let categoriesGrid = document.getElementById("categoriesGrid");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
// serach
function goSearch() {
    let foodName = searchInput.value.trim();
    if (foodName === "") {
        return;
    }
    window.location.href = `index.html?s=${foodName}`;
}
    searchBtn.addEventListener("click", goSearch);
    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            goSearch();
        }
    });
    // load meal details

async function loadMeal() {
    try {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        let data = await response.json();
        let meal = data.meals[0];
        // meal is not fond
        if (!meal) {
            mealTitle.innerHTML = "Meal not found";
            return;
        }

        // meal info
        mealImg.src = meal.strMealThumb;
        mealImg.alt = meal.strMeal;
        mealTitle.innerHTML = meal.strMeal;
        crumbName.innerHTML = meal.strMeal;
        mealCategory.innerHTML = meal.strCategory;
        // source
        if (meal.strSource) {
            mealSource.href = meal.strSource;
            mealSource.innerHTML = meal.strSource;
        }
        else {
            mealSource.parentElement.hidden = true;
        }

        // ingredients and measures
        let ingredientOutput = "";
        let measureOutput = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {
                ingredientOutput += `
                    <li>
                    <span class="num">${i}</span>
                        ${ingredient}
                    </li>
                `;
                measureOutput += `
                    <span>
                        ${measure || "-"}
                    </span>
                `;}}
        // display ingredieants
        ingredientsList.innerHTML = ingredientOutput;
        // display measurements
        measuresGrid.innerHTML = measureOutput;
// taggs
        
        if (meal.strTags) {
            let tags = meal.strTags.split(",");
            let tagOutput = "";
            tags.map(function(tag){
                tagOutput += `<span>${tag.trim()}</span>`;
            });
           
            mealTags.innerHTML = tagOutput;
        }
        // instruction
        let instructions = meal.strInstructions;
        let instructionArray = instructions.split("\r\n");
        let instructionOutput = "";
         instructionArray.map(function(step) {
            if (step.trim() !== "") {
                instructionOutput += `
                    <li>${step}</li>
                `;}
        });
        instructionsList.innerHTML = instructionOutput;
    }
    catch (error) {
        console.log("Error loading meal:", error);
        mealTitle.innerHTML = "Something went wrong.";
    }
}
async function loadCategories(){
    try{
        let response=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let data=await response.json();
        let categories=data.categories;
        let output="";
        categories.map(function(category) { 
            output += 
            ` <a href="category.html?c=${category.strCategory}" 
             class="card" > 
             <img src="${category.strCategoryThumb}" 
             alt="${category.strCategory}" >
             <span class="cate-name"> 
             <h3> ${category.strCategory} </h3></span>
              </a> `; }); 
              categoriesGrid.innerHTML = output;
             } catch (error) { 
             console.log( "Error loading categories:", error );
             
    }
}
// calling functions
if (mealId) {
    loadMeal();
}
else {
    mealTitle.innerHTML = "No meal selected.";
}
loadCategories()