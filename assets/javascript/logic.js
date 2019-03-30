// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxZJiwa3gxIx4LOWtTkzOYmqDWim1rzk8",
    authDomain: "recipeme-f7d59.firebaseapp.com",
    databaseURL: "https://recipeme-f7d59.firebaseio.com",
    projectId: "recipeme-f7d59",
    storageBucket: "recipeme-f7d59.appspot.com",
    messagingSenderId: "381672219285"
};
firebase.initializeApp(config);
let database = firebase.database();




const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
// const btnLogout = document.getElementById(“btnLogout”);


// Add Login Event
btnLogin.addEventListener("click", e => {
    // Get Email and Pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign In
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

});

// // Add SignUp Event
btnSignUp.addEventListener("click", e => {
    // Get Email and Pass
    // validate email!
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign In
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

});

// Realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log("not logged in");
    }
});



//declare global objects for search results
let objects = [
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    },
    {
        name: "",
        imgURL: "",
        extURL: "",
        ytURL: "",
        ingredients: []
    }
];
//search event listener
$("#search-bar").on("submit", function (event) {
    event.preventDefault();
    //prep page for search results
    $("#content").empty();
    $("#resultscontainer").attr("style", "");
    $("#results").empty();
    //API call for search
    let query = $("#search").val().trim();
    $("#search").val("");
    let queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //for loop to display each search result
        for (i = 0; i < Math.min(10, response.meals.length); i++) {
            let istr = String(i);
            let name = response.meals[i].strMeal;
            let imgURL = response.meals[i].strMealThumb;
            let extURL = response.meals[i].strSource;
            let ytURL = response.meals[i].strYoutube;
            //ingredient array needs to be constructed manually 
            let ingredients = [];
            ingredients.push(response.meals[i].strIngredient1);
            ingredients.push(response.meals[i].strIngredient2);
            ingredients.push(response.meals[i].strIngredient3);
            ingredients.push(response.meals[i].strIngredient4);
            ingredients.push(response.meals[i].strIngredient5);
            ingredients.push(response.meals[i].strIngredient6);
            ingredients.push(response.meals[i].strIngredient7);
            ingredients.push(response.meals[i].strIngredient8);
            ingredients.push(response.meals[i].strIngredient9);
            ingredients.push(response.meals[i].strIngredient10);
            ingredients.push(response.meals[i].strIngredient11);
            ingredients.push(response.meals[i].strIngredient12);
            ingredients.push(response.meals[i].strIngredient13);
            ingredients.push(response.meals[i].strIngredient14);
            ingredients.push(response.meals[i].strIngredient15);
            ingredients.push(response.meals[i].strIngredient16);
            ingredients.push(response.meals[i].strIngredient17);
            ingredients.push(response.meals[i].strIngredient18);
            ingredients.push(response.meals[i].strIngredient19);
            ingredients.push(response.meals[i].strIngredient20);
            //removes empty strings from ingredients array
            for (j = 0; j < ingredients.length; j++) {
                let index = 19 - j;
                if (ingredients[index] == "") {
                    ingredients.pop();
                };
            };
            for (j = 0; j < ingredients.length; j++) {
                let index = 9 - j;
                if (ingredients[index] == "") {
                    ingredients.pop();
                };
            };
            //set global objects to search values
            objects[i].name = name;
            objects[i].imgURL = imgURL;
            objects[i].extURL = extURL;
            objects[i].ytURL = ytURL;
            objects[i].ingredients = ingredients;
            //add new card
            let newcard = $("<div>").addClass("col s6").append(
                $("<div>").addClass("card medium")
                    .append($("<div>").addClass("card-image waves-effect waves-block waves-light").append(
                        $("<img>").addClass("activator").attr("id", "recipeimg").attr("src", imgURL)
                    ))
                    .append($("<div>").addClass("card-content").append(
                        $("<span>").addClass("card-title activator grey-text text-darken-4").text(name).append(
                            $("<i>").addClass("material-icons right").html("more_vert")
                        )))
                    .append($("<div>").addClass("card-action").append(
                        $("<a>").text("Link").attr("href", extURL)).append(
                            $("<a>").text("Youtube").attr("href", ytURL)).append(
                                $("<a>").addClass("secondary-content").attr("href", "#").append(
                                    $("<i>").addClass("material-icons").html("favorite")
                                    //Target value for pushing to Firebase
                                ).attr("ifav", istr)
                            ))
                    .append($("<div>").addClass("card-reveal").append($("<span>").addClass("card-title grey-text text-darken-4").text("Ingredients").append(
                        $("<i>").addClass("material-icons right").html("close"))).append(
                            $("<div>").addClass("collection").attr("id", istr))
                    )
            );
            $("#results").append(newcard);
            //populate ingredients list
            for (k = 0; k < objects[i].ingredients.length; k++) {
                let newdiv = $("<li>").addClass("collection-item")
                    .text(ingredients[k]);
                $("#" + istr).append(newdiv);
            };
            //add-to-favorites event listener
            $("[ifav=" + istr + "]").on("click", function (event) {
                event.preventDefault();
                let UID = "12345";
                database.ref("/" + UID).push(objects[parseInt(istr)]);
            });
        };
    });
});

