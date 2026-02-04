const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.search-button');
const recipeContainer = document.querySelector('.recipe-container');


async function fetchData (input){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        const recipies = await response.json();
        return recipies
    } catch(e){
        console.log(e)
    }
}

async function displayRecipe(){
    const recipeSearch = searchBox.value.trim();
    recipeContainer.innerHTML = "";

    const recipe = await fetchData(recipeSearch)

    recipe.meals.forEach(meal => {
         const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <div class="img-container">
                <img src="${meal.strMealThumb}">
            </div>
             <div class="recipe-details">
                    <h3 id="meal-name">${meal.strMeal}</h3>
                    <p id="meal-detaisl">${meal.strArea} recipe | ${meal.strCategory}</p>
             </div>
             `
         const button = document.createElement("button") 
         button.classList.add("more")   
         button.textContent = "recipe";
         recipeDiv.appendChild(button)
        recipeContainer.appendChild(recipeDiv);  
     });

}

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    displayRecipe();

})