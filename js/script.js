let resetBtn = document.getElementById("reset");
let scorePlayer = document.getElementById("score-player");
let scoreOrdinateur = document.getElementById("score-ordinateur");
// recupération des bouton joueur et avec ... ont mais les btn dans un tableau
let btnPlayer = [...document.getElementsByClassName("btn-player")];
// btn ordinateur
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");
//
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

const jouerManche = (e) => {
  // choix va permettre de recupérer uniquement la div ou ce situe .btn-player
  let choix = e.target.closest(".btn-player");

  btnPlayer.forEach((btn) => {
    // ajout d'une classe desactivated une fois qu'un choix est effectué
    btn.classList.add("desactivated");
    // supprimer les eventlistener puisque on a deja clicker sur un btn
    btn.removeEventListener("click", jouerManche);
  });
  // supprimer la class desactivated pour ajouter la classe active sur le btn choisi par le joeurs
  choix.classList.remove("desactivated");
  choix.classList.add("active");
  //
  let choixPlayer = choix.id;

  let choixOrdi = faireChoixOrdinateur();

  verifierGagnant(choixPlayer, choixOrdi);

  nextBtn.style.visibility = "visible";
};
const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const faireChoixOrdinateur = () => {
  // 0 = pierre
  // 1 = feuille
  // 2 = ciseaux

  // genérer un nombre aléatoires entre 0 et 2
  let nbAleatoire = Math.floor(Math.random() * 3);
  switch (nbAleatoire) {
    case 0:
      opierreBtn.classList.add("active");
      return PIERRE;
    case 1:
      ofeuilleBtn.classList.add("active");
      return FEUILLE;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};
const verifierGagnant = (choixPlayer, choixOrdi) => {
  if (choixPlayer === choixOrdi) {
    message.textContent = "égalité !";
    return;
  }
  if (choixPlayer == PIERRE) {
    if (choixOrdi == FEUILLE) {
      return victoireOrdinateur();
    } else if (choixOrdi == CISEAUX) {
      return victoirePlayer();
    }
  }
  if (choixPlayer == FEUILLE) {
    if (choixOrdi == CISEAUX) {
      return victoireOrdinateur();
    } else if (choixOrdi == PIERRE) {
      return victoirePlayer();
    }
  }
  if (choixPlayer == CISEAUX) {
    if (choixOrdi == PIERRE) {
      return victoireOrdinateur();
    } else if (choixOrdi == FEUILLE) {
      return victoirePlayer();
    }
  }
};
const victoireOrdinateur = () => {
  message.textContent = "L'ordinateur gagne...";
  scoreOrdinateur.textContent++;
};
const victoirePlayer = () => {
  message.textContent = "Vous avez gagné !";
  scorePlayer.textContent++;
};
const preparerNouvelleManche = () => {
  btnPlayer.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");
    btn.addEventListener("click", jouerManche);
  });
  nextBtn.style.visibility = "hidden";

  opierreBtn.classList.remove("active");
  ofeuilleBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");

  message.textContent = "A vous de jouer !";
};
nextBtn.addEventListener("click", preparerNouvelleManche);
// on ecoute tous les btn du joueur si il y'a un click alors fonction jouerManche s'enclench
//
btnPlayer.forEach((btn) => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
  scorePlayer.textContent = 0;
  scoreOrdinateur.textContent = 0;
  preparerNouvelleManche();
});
