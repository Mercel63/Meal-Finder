$(document).ready(function(){
    console.log("hello");
    
    $("#searchMeal").click(function(){
        var meal = $('#meal').val();
        $.getJSON("https://www.themealdb.com/api/json/v1/1/search.php?s="+meal, function(data){
            console.log(data.meals[0].strMealThumb);
            $('#here').html('<img src="'+data.meals[0].strMealThumb+'" class="card-image-top">');
            // console.log(meal);
        });
    });

    //This is for random meals
    
    $("#randMeal").click(function(){
        $.getJSON("https://www.themealdb.com/api/json/v1/1/random.php", function(data){
            console.log(data.meals[0].strMeal);
            $('#here').html('<img src="'+data.meals[0].strMealThumb+'" class="card-img-top">');
            $('#here').append('<h5 class="card-title">'+data.meals[0].strMeal+'</h5>');
            $('#here').append('<p class="card-text">Category: '+data.meals[0].strCategory+'</p>');
            $('#here').append('<p class="card-text">Area: '+data.meals[0].strArea+'</p>');
        });
    });
});