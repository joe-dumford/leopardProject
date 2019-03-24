//temporary ajax for dev purposes, go to SLACK for edamam id and keys
$.ajax({
    url: "https://api.edamam.com/search?q=chicken&app_id={SLACK}&app_key={SLACK}",
    method: "GET"
}).then(function(response){
    console.log (response)
})