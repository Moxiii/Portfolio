import { append } from "domutils"
import { searchRecipes } from "../node_modules/marmiton-api/"
import {Scripts} from "./app"
recherche = searching();
function call(){
url= "https://www.marmiton.org/recettes/recherche.aspx?aqt="+recherche.value;

}