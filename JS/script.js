
async function fetchCategories() {
    try {
        showLoading();

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        console.log("API DATA:", data);

        // Store API data
        state.categories = data.categories || [];

        // Using map()
        const html = state.categories.map((category) => {
            return `
                <div class="category-card">
                    <img 
                        src="${category.strCategoryThumb}" 
                        alt="${category.strCategory}"
                    >

                    <h3>${category.strCategory}</h3>
                </div>
            `;
        }).join("");

        document.getElementById("categoryContainer").innerHTML = html;

    } catch (error) {
        console.error("API Error:", error);
    } finally {
        hideLoading();
    }
}

fetchCategories();




















