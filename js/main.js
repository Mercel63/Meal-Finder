$(document).ready(function(){
    console.log("hello");

    //when looking for main ingredient

    $("#searchMeal").click(function(){
        var meal = $('#meal').val();
        $.getJSON("https://www.themealdb.com/api/json/v1/1/filter.php?i="+meal, function(data){
        // $.getJSON("https://www.themealdb.com/api/json/v1/1/search.php?s="+meal, function(data){
            // console.log(data.meals[1].strMealThumb);

            // $('<div id="'+data.meals[0].idMeal+'" class="carousel-item">').insertBefore('#here');
            // $('#'+data.meals[0].idMeal).append('<img src="'+data.meals[0].strMealThumb+'" class="d-block w-100" alt="first">');
            // $('</div>').insertBefore('#here');
            // $('<div id="'+data.meals[1].idMeal+'" class="carousel-item">').insertBefore('#here');
            // $('#'+data.meals[1].idMeal).append('<img src="'+data.meals[1].strMealThumb+'" class="d-block w-100" alt="second">');
            // $('</div>').insertBefore('#here');
            
            $(data.meals).each(function(){
                if(data.meals == [0]){
                    console.log(this);
                };
                
                // $('#here').append('<div id="'+this.idMeal+'" class="carousel-item">');
                // $('#'+this.idMeal).append('<img src="'+this.strMealThumb+'" class="d-block w-100">');
                // // $('#'+this.idMeal).append('<h5 class="card-title">'+this.strMeal+'</h5></div>');
                // $('#here').append('</div>');
            });
            
            
            // console.log(data.meals[0]);
        });
    });

    //this is for random meals
    
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