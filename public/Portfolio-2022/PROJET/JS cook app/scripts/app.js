

const APPLICATION_ID  ="690eba07";
const  APPLICATION_KEY="00609fd2ca282d9ca1ac2f13e249e298";
const PATH = " https://api.edamam.com/api/recipes/v2?type=public&q="
const PATH2 = "&app_key=00609fd2ca282d9ca1ac2f13e249e298&_cont=CHcVQBtNNQphDmgVQntAEX4BYlVtDQYHSmBBBWYXa1x0AAUFUXlSBWERNgElUVEBQzYSUWQRNQR0DVIHQWxCUTcWYwd3DQIVLnlSVSBMPkd5BgMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&cuisineType=French&h&imageSize=REGULAR&type=public&app_id=690eba07&to=15";
const FILTRAGE = " &diet=balanced&health=dairy-free&cuisineType=American&mealType=Dinner&dishType=Biscuits%20and%20cookies&imageSize=REGULAR&random=true";
const imageSize = ["SMALL","REGULAR","LARGE"];
const diet = ["diet-balanced","diet-hight-fiber","diet-hight-protein"];
const mealType = ["Breakfast","Dinner","Lunch"];

const form = document.querySelector('form');
const resultatDiv = document.querySelector('.resultat');
const ingredients = document.getElementById('ingerdient');
var recherche ="";
form.addEventListener('submit' , (e) => {
    e.preventDefault();
    recherche=e.target.querySelector('input').value;
    FetchAPI();
});


async function FetchAPI(){
    var recette = PATH + recherche + PATH2;
    const reponse = await fetch(recette);
    const data = await reponse.json();
    console.log(data);
    generateHTML(data.hits);
}


function generateHTML(resultats){

    var htmlEnvoi = "";

    for(var i=0;i<resultats.length;i++){

        var listeIngre = "";

        for(var j=0;j<resultats[i].recipe.ingredientLines.length;j++){

           listeIngre = listeIngre + resultats[i].recipe.ingredientLines[j] + "<br><br>";

        }

        htmlEnvoi = htmlEnvoi + `<div class="card">
        <div class="itm">
            <img src="` + resultats[i].recipe.image + `" alt="photo de test ">
        </div>
        <div class="container">
            <h3 id="ingredients">Ingrédient : </h3>
            <p class="ingredients">` + listeIngre + `</p>
            <a class="view-button" href="` + resultats[i].recipe.url + `" target="_blank"> voir la recette</a>
        </div>
        <footer>calorie : ` + Math.trunc(resultats[i].recipe.calories) + `</footer>
    </div>`;

    }

    document.getElementById('resultat').innerHTML = htmlEnvoi;

    //ingre = resultat.recipe.ingredientLines

    // for(i=0;i<ingre.length;i++){
    //     console.log(ingre[i]);
    // }

    // $.ajax({
    // type:"GET",
    // url:urldeajax + "?ingre=" + resultat.recipe.ingredientLines[0],
    // success: function(data){
    //     console.log(data);
    //     document.getElementById('resultat').innerHTML = data;
    // }
    // })

}
