//abonnements au gestionnaire d'evenements
var Nom = document.querySelector("#nom");
var Prenom = document.querySelector("#prenom");
var Couriel = document.querySelector("#couriel");
var Telephone = document.querySelector("#telephone");
var Surnom = document.querySelector("#surnom");

// Bouton écriture dans le web storage
var evtEcriture = document.querySelector("#BoutonVal");
var evtAnnuler = document.querySelector("#BoutonAnn");

evtEcriture.addEventListener("click", ecrireLocalStorage);
evtAnnuler.addEventListener("click", annulationContact);

// fonction d ecriture dans le storage

function ecrireLocalStorage() {
    cle = "";
    // test de la possiblite d'utiliser le localstorage

    if (typeof localStorage != "undefined" && JSON) {
        /* Déficnition d'un objet Javasript coordonnees personnes */

        if (
            Nom.value != "" &&
            Prenom.value != "" &&
            Couriel.value != "" &&
            Telephone.value != "" &&
            Surnom.value != ""
        ) {
            var coordonneesPersonne = {
                nom: Nom.value,
                prenom: Prenom.value,
                couriel: Couriel.value,
                telephone: Telephone.value,
                surnom: Surnom.value,
            };
            // création cle
            cle = document.getElementById("couriel").value;
            // Sérialisation des donnees en objet JSON de nom  identite
            localStorage.setItem(cle, JSON.stringify(coordonneesPersonne));

            Nom.value = "";
            Prenom.value = "";
            Couriel.value = "";
            Telephone.value = "";
            Surnom.value = "";

            // affichage de contrôle
            alert("Enregistrement dans le localstorage effectués");
        } else {
            alert("Vous n'avez pas saisi tous les champs");
        }
    } else {
        // message erreur impossible d'utiliser le local storage
        alert("Enregistrement dans le localstorage impossible");
    }
}
function annulationContact() {
    Nom.value = "";
    Prenom.value = "";
    Couriel.value = "";
    Telephone.value = "";
    Surnom.value = "";
}
