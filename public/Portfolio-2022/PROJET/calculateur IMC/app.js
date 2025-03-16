const btn = document.getElementById("btn");
const taille = document.getElementById("taille");
const poid = document.getElementById("poid");
const resultat = document.getElementById("imc");
const WARNING = document.getElementById("warning");
btn.addEventListener("click", function () {
  KG = poid.value;
  mètre = taille.value;
  IMC = KG / mètre ** 2;
  if (IMC < 18.5) {
    imc.innerHTML = `trop maigre`;
  }
  if (IMC > 18.5 && IMC < 24.9) {
    imc.innerHTML = `normal bg`;
  }
  if (IMC > 25 && IMC < 29.9) {
    imc.innerHTML = `attention bg`;
  }
  if (IMC > 30 && IMC < 34.9) {
    imc.innerHTML = `un peu gros la `;
  }
  if (IMC > 35 && IMC < 39.9) {
    imc.innerHTML = `calme les mac do mon reuf`;
  } else if (IMC > 40) {
    imc.innerHTML = `incrit toi a la salle de sport au plus vite ! `;
  }

  if (IMC < 18,5 && IMC >40){
    warn.innerHTML=`<ion-icon name="alert-circle-outline"></ion-icon>`
  }
  console.log(KG + "/ " + mètre + "²" + " " + ":" + IMC);
});
