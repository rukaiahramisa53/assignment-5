const search=document.getElementById('search');
const submit=document.getElementById('submit');
const mealsElement=document.getElementById('meals');
const singleMeal=document.getElementById("single-meal");



//search meal

function searchMeal(e){
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.meals===null){
                alert("No matching element found. Try something else");
            }
            else{
                mealsElement.innerHTML=data.meals.map(meal=>`
                <div class="meal">
                   <img src="${meal.strMealThumb}"/>
                   <div class="meal-info" data-mealID="${meal.idMeal}">
                      <h6>${meal.strMeal}</h6>
                      <p class="Id-meal">${meal.idMeal}</p>
                    </div>
                </div>      

                `)
                .join("");
            }})


    }
    else{
        alert("Please enter an item");
    }
}
//get clicked meal

function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res=>res.json())
    .then(data=>{
    
        const meal=data.meals[0];
        displayMealDetails(meal);
    })

}
//Show single meal ingredients
function displayMealDetails(meal){
    const ingredients=[];
    for(let i=1;i<20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`);
        }
        else{
            break;
        }
    }
    singleMeal.innerHTML=`
    <div class="meal-details">
  
    <img src="${meal.strMealThumb}"/>
    <h4>${meal.strMeal}</h4>
    <div class="meal-ingredients">
    <h5>Ingredients</h5>
    <ul>
    ${ingredients.map(ing=>`<li>${ing}</li>`).join("")}
    </ul>

    </div>
    
    </div>`

}

//event listeners

submit.addEventListener("submit",searchMeal);
mealsElement.addEventListener("click",e=>{
    const mealInfo=e.path.find(item=>{
        if(item.classList){
            return item.classList.contains("meal-info");
        }
        else{
            return false;

        }
    })
if(mealInfo){
    const mealID=mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
}

})