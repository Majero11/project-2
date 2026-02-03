const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.search-button');
const recipeContainer = document.querySelector('.recipe-container');


async function fetchData (input){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        const recipies = await response.json();
        // return recipies
        recipies.meals.forEach(meal => {
            const recipeDiv = document.createElement('div')
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">`

            
            recipeContainer.appendChild(recipeDiv);  
        });
    } catch(e){
        console.log(e)
    }
}


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const recipeSearch = searchBox.value.trim()
    fetchData(recipeSearch);
    // console.log("button clicked")

})