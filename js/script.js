//trigger submit button when pressing enter key
var input = document.getElementById('meal');
input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById('mealBtn').click();
    }
});

//toggle visisbility of carousel prev and next button
function hideButton(){
    document.getElementById('prev').style.visibility = "hidden"; 
    document.getElementById('next').style.visibility = "hidden";
}

function showButton(){
    document.getElementById('prev').style.visibility = "visible"; 
    document.getElementById('next').style.visibility = "visible";
}

//clear specific nodes within div
function clearContent(data){
    while(data.firstChild) {
        data.removeChild(data.firstChild);
    }
}

//function to search for meals with user given ingredient
function searchMeal(){
    
    var meal = document.getElementById('meal').value;
    
    //fetch json query
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+meal)
    .then((res) => res.json())
    .then((data) => {
     
        var existingList = document.getElementById('mealCarousel').children[0];
        var existingMeal = document.getElementById('mealCarousel').children[1];
        var refreshImg = document.getElementById('imgHere');
        var refreshDetail = document.getElementById('detailHere');
        //clearing any previous queries
        clearContent(existingList);
        clearContent(existingMeal);
        clearContent(refreshImg);
        clearContent(refreshDetail)

        //display meals to carousel
        for(var x = 0; x < data.meals.length; x++){
            var meals = data.meals;
            if(meals[x].idMeal == meals[0].idMeal){
                document.getElementById('mealCarousel').children[0].innerHTML += '<li data-target="#mealCarousel" data-slide-to="'+x+'" class="active"></li>';
                document.getElementById('mealCarousel').children[1].innerHTML += `
                    <div class="carousel-item active">
                        <img id="${meals[x].idMeal}" src="${meals[x].strMealThumb}" class="d-block w-100" alt="${meals.strMeals}" onclick="searchMealId(this.id)">
                        <div class="carousel-caption d-none d-md-block caption-background">
                            <h5>${meals[x].strMeal}</h5>
                            <p>Click to know more!</p>
                        </div>
                    </div> 
                `;
            } else {
                document.getElementById('mealCarousel').children[0].innerHTML += '<li data-target="#mealCarousel" data-slide-to="'+x+'"></li>';
                document.getElementById('mealCarousel').children[1].innerHTML += `
                    <div class="carousel-item">
                        <img id="${meals[x].idMeal}" src="${meals[x].strMealThumb}" class="d-block w-100" alt="${meals.strMeals}" onclick="searchMealId(this.id)">
                        <div class="carousel-caption d-none d-md-block caption-background">
                            <h5>${meals[x].strMeal}</h5>
                            <p>Click to know more!</p>
                        </div>
                    </div> 
                `; 
            }
        }
        showButton();
    })
    .catch(err => {
        document.getElementById('mealCarousel').children[1].innerHTML += "<p>Sorry. We do not have any recipes with the main ingredient you have given.</p>"
        hideButton();
    }); 
}

//function to search meal by id. Triggered when clicking on any image from the carousel
function searchMealId(id){
    var refreshImg = document.getElementById('imgHere');
    var refreshDetail = document.getElementById('detailHere');
    clearContent(refreshImg);
    clearContent(refreshDetail)

    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    .then((res) => res.json())
    .then((data) => {
        var meals = data.meals[0];
        document.getElementById('imgHere').innerHTML += `
        <img src="${meals.strMealThumb}">
        `;
        document.getElementById('detailHere').innerHTML += `
            <h4>${meals.strMeal}</h4>
            <p>Category: ${meals.strCategory}<br>
            Area: ${meals.strArea}<br>
            Youtube: <a href="${meals.strYoutube}">${meals.strYoutube}</a><br>
            Ingredients: <span id="ingredientHere"> </span></p>
        `;
        for(var x=1; x<=20; x++){
            var name = 'strIngredient'+x;
            if(meals[name] != ""){
                document.getElementById('ingredientHere').innerHTML += '-'+meals[name]+' ';
            }else{
                break;
            }   
        }
        scrollTo(0, 600);    
    });
}

//this is for the "suprise me" button
function randomMeal(){
    hideButton();

    var existingList = document.getElementById('mealCarousel').children[0];
    var existingMeal = document.getElementById('mealCarousel').children[1];
    var refreshImg = document.getElementById('imgHere');
    var refreshDetail = document.getElementById('detailHere');
    clearContent(existingList);
    clearContent(existingMeal);
    clearContent(refreshImg);
    clearContent(refreshDetail);

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        var meals = data.meals[0];
        document.getElementById('imgHere').innerHTML += `
            <img src="${meals.strMealThumb}">
        `;
        document.getElementById('detailHere').innerHTML += `
            <h4>${meals.strMeal}</h4>
            <p>Category: ${meals.strCategory}<br>
            Area: ${meals.strArea}<br>
            Youtube: <a href="${meals.strYoutube}">${meals.strYoutube}</a><br>
            Ingredients: <span id="ingredientHere"> </span></p>
        `;
        for(var x=1; x<=20; x++){
            var name = 'strIngredient'+x;
            if(meals[name] != ""){
                document.getElementById('ingredientHere').innerHTML += '-'+meals[name]+' ';
            }else{
                break;
            }
        }
    });
}