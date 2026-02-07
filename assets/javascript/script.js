const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.search-button');
const recipeContainer = document.querySelector('.recipe-container');
const preprationDetailsInfo = document.querySelector('.prepration-details-info');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');



async function fetchData (input){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        const recipies = await response.json();
        return recipies
    } catch(e){
        console.log(e)
    }
}

// Function to display recipe
async function displayRecipe(){
    const recipeSearch = searchBox.value.trim();
    recipeContainer.innerHTML = "";

    const recipe = await fetchData(recipeSearch)

    recipe.meals.forEach(meal => {
         const recipeDiv = document.createElement('div')
         recipeDiv.classList.add('recipe');
         const recipeDiv2 = document.createElement('div')
        recipeDiv2.classList.add('recipeShadow');
        recipeDiv.innerHTML = `
            <div class="img-container">
                <img src="${meal.strMealThumb}">
            </div>
             <div class="recipe-details">
                    <h3 id="meal-name">${meal.strMeal}</h3>
                    <p id="meal-details">${meal.strArea} recipe | ${meal.strCategory}</p>
             </div>
             `
         const button = document.createElement("button") ;
         button.classList.add("recipeButton");
         button.textContent = "recipe";

          //  adding event listener to recipe button 
        button.addEventListener('click', () => {
            Popup(meal)
        })

         const detailsContainer = document.createElement('div');
         detailsContainer.classList.add('detailsContainer')

         detailsContainer.appendChild(recipeDiv)
         detailsContainer.appendChild(button);
         detailsContainer.appendChild(recipeDiv2)
        recipeContainer.appendChild(detailsContainer);  

     });

}

function getIngredients(meal) {
    let ingredientsList = '';
    for(let i = 1; 1 <= 20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li> ${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList
}



function Popup(meal) {
    preprationDetailsInfo.innerHTML = `
        <h1 recName>${meal.strMeal}</h1>
        <h3>Ingredients</h3>
        <ul class="ingredientsList">${getIngredients(meal)}</ul>
        <div>
            <h3>Preparation Instructions</h3>
            <p class="instructions">${meal.strInstructions}</p>
        </div>

    `
    preprationDetailsInfo.parentElement.style.display = 'block';
    
}



searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    displayRecipe();
})

searchBox.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        displayRecipe();
    }
})

recipeCloseBtn.addEventListener('click', () => {
    preprationDetailsInfo.parentElement.style.display = 'none'
})