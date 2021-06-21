var valeur;
var tabDonn = document.querySelector("#tabDonnees");
var tabComp = document.querySelector("#tabComplet");

AfficheTableau();

function AfficheTableau() {
    for (i = 0; i < localStorage.length; i++) {
        // Création ligne tableau
        let cle = localStorage.key(i);
        let valeur = JSON.parse(localStorage.getItem(cle));

        itemTabLig = document.createElement("tr");

        itemTabCel = document.createElement("td");
        itemTabCel.appendChild(document.createTextNode(valeur.nom));
        itemTabCel.style.fontSize = "larger";
        itemTabCel.style.fontWeight = "bold";
        itemTabLig.appendChild(itemTabCel);

        itemTabCel = document.createElement("td");
        itemTabCel.appendChild(document.createTextNode(valeur.prenom));
        itemTabCel.style.textAlign = "center";
        itemTabLig.appendChild(itemTabCel);

        itemTabCel = document.createElement("td");
        itemTabCel.appendChild(document.createTextNode(valeur.couriel));
        itemTabCel.style.textAlign = "center";
        itemTabLig.appendChild(itemTabCel);

        itemTabCel = document.createElement("td");
        itemTabCel.appendChild(document.createTextNode(valeur.telephone));
        itemTabCel.style.textAlign = "center";
        itemTabLig.appendChild(itemTabCel);

        itemTabCel = document.createElement("td");
        itemTabCel.appendChild(document.createTextNode(valeur.surnom));
        itemTabCel.style.textAlign = "center";
        itemTabLig.appendChild(itemTabCel);

        itemTabLig.appendChild(itemTabCel);
        tabDonn.appendChild(itemTabLig);
    }
    tabComp.appendChild(tabDonn);
}
