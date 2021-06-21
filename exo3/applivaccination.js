var affichage = document.querySelector("#result");
var affichageFr = document.querySelector("#nord");
var affichageDep = document.querySelector("#dep");
var affichageSelect = document.querySelector("#select");
var nBoutonAffDep = document.querySelector("#BoutonDep");
var tabDonn = document.querySelector("#tabDonnees");
var tabComp = document.querySelector("#tabComplet");
var selectCategories = document.querySelector("#listecat");
var selectSexe = document.querySelector("#listesex");

var couvComplet = "";
var couv1 = "";
var choixMessage = "";
var depchoisi = "";

var dateDonneesFr = "";
var objCovidDate = "";
var i, j, y, z;
var nombreDate = new Array();
var nombreHospi = new Array();
var nombreRea = new Array();
var nombreNewHospi = new Array();
var nombreNewRea = new Array();
var nombredeces = new Array();
var nombregueris = new Array();
var dejaFait = false;

var urlcovidselect = "";

var departements = [
  "Ain",
  "Aisne",
  "Allier",
  "Alpes-de-Haute-Provence",
  "Hautes-Alpes",
  "Alpes-Maritimes",
  "Ardèche",
  "Ardennes",
  "Ariège",
  "Aube",
  "Aude",
  "Aveyron",
  "Bouches-du-Rhône",
  "Calvados",
  "Cantal",
  "Charente",
  "Charente-Maritime",
  "Cher",
  "Corrèze",
  "Corse-du-Sud",
  "Haute-Corse",
  "Côte-d'Or",
  "Côtes d'Armor",
  "Creuse",
  "Dordogne",
  "Doubs",
  "Drôme",
  "Eure",
  "Eure-et-Loir",
  "Finistère",
  "Gard",
  "Haute-Garonne",
  "Gers",
  "Gironde",
  "Hérault",
  "Ille-et-Vilaine",
  "Indre",
  "Indre-et-Loire",
  "Isère",
  "Jura",
  "Landes",
  "Loir-et-Cher",
  "Loire",
  "Haute-Loire",
  "Loire-Atlantique",
  "Loiret",
  "Lot",
  "Lot-et-Garonne",
  "Lozère",
  "Maine-et-Loire",
  "Manche",
  "Marne",
  "Haute-Marne",
  "Mayenne",
  "Meurthe-et-Moselle",
  "Meuse",
  "Morbihan",
  "Moselle",
  "Nièvre",
  "Nord",
  "Oise",
  "Orne",
  "Pas-de-Calais",
  "Puy-de-Dôme",
  "Pyrénées-Atlantiques",
  "Hautes-Pyrénées",
  "Pyrénées-Orientales",
  "Bas-Rhin",
  "Haut-Rhin",
  "Rhône",
  "Haute-Saône",
  "Saône-et-Loire",
  "Sarthe",
  "Savoie",
  "Haute-Savoie",
  "Paris",
  "Seine-Maritime",
  "Seine-et-Marne",
  "Yvelines",
  "Deux-Sèvres",
  "Somme",
  "Tarn",
  "Tarn-et-Garonne",
  "Var",
  "Vaucluse",
  "Vandée",
  "Vienne",
  "Haute-Vienne",
  "Vosges",
  "Yonne",
  "Territoire de Belfort",
  "Essonne",
  "Hauts-de-Seine",
  "Seine-St-Denis",
  "Val-de-Marne",
  "Val-D'Oise",
  "Guadeloupe",
  "Martinique",
  "Guyane",
  "La Réunion",
  "Mayotte",
];

var sexe = [
  "Hommes et femmes",
  "Femmes",
  "Hommes",
];

var ages = [
  "Tous âges",
  "18-24",
  "25-29",
  "30-39",
  "40-49",
  "50-59",
  "60-64",
  "65-69",
  "70-74",
  "75-79",
  "80 et +",
];

for (i = 0; i < departements.length; i++) {
  // remplissage de la liste des départements
  optionItemDep = document.createElement("option");
  optionItemDep.appendChild(document.createTextNode(departements[i]));
  listedep.appendChild(optionItemDep);
}
for (i = 0; i < sexe.length; i++) {
  // remplissage de la liste des départements
  optionItemDep = document.createElement("option");
  optionItemDep.appendChild(document.createTextNode(sexe[i]));
  listesex.appendChild(optionItemDep);
}
for (i = 0; i < ages.length; i++) {
  // remplissage de la liste des départements
  optionItemDep = document.createElement("option");
  optionItemDep.appendChild(document.createTextNode(ages[i]));
  listecat.appendChild(optionItemDep);
}



var urlcovidFr =
  
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.dep_name=Nord&refine.date=2021%2F06&refine.variable_label=Tous+%C3%A2ges"
fetch(urlcovidFr)
  .then(function (response) {
    response
      .text()
      .then(function (covidFr) {
        var objCovidFr = JSON.parse(covidFr);

        console.log(objCovidFr.records[0].fields.couv_complet);

        couvComplet = objCovidFr.records[0].fields.couv_complet;
        couv1 = objCovidFr.records[0].fields.couv_dose1;
        dateDonneesFr = objCovidFr.records[0].fields.date;
        var date1Fr = new Date(dateDonneesFr);
        affichageFr.innerHTML =
          date1Fr.toLocaleDateString("fr-FR") +
          " : Dans le nord il y a : " +
          couv1 +
          " % de la population qui ont reçu une première dose de vaccin et " +
          couvComplet +
          " % a une couverture complète. ";
      })
      .catch((error) => alert("Erreur : " + error));
  })
  .catch((error) => alert("Erreur : " + error));

nBoutonAffDep.addEventListener("click", AfficheDep);
selectCategories.addEventListener("change", modifSelecteurCat);
selectSexe.addEventListener("change", modifSlecteurSex )

async function AfficheDep() {
  depChoisi = departements[listedep.selectedIndex];
  var urlcovidDep =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.dep_name="+
  depChoisi+"&refine.date=2021%2F06&refine.variable_label=Tous+%C3%A2ges"
    
  console.log(urlcovidDep);
  fetch(urlcovidDep)
    .then(function (response) {
      response
        .text()
        .then(function (covidDep) {
          var objCovidDep = JSON.parse(covidDep);

          console.log(objCovidDep.records[0].fields.couv_complet);

          couvComplet = objCovidDep.records[0].fields.couv_complet;
          couv1 = objCovidDep.records[0].fields.couv_dose1;
          dateDonneesFr = objCovidDep.records[0].fields.date;
          var date1Fr = new Date(dateDonneesFr);
          affichageDep.innerHTML =
            date1Fr.toLocaleDateString("fr-FR") +
            " : Dans le " +
            depChoisi +
            " il y a : " +
            couv1 +
            " % de la population qui ont reçu une première dose de vaccin et " +
            couvComplet +
            " % a une couverture complète. ";
        })
        .catch((error) => alert("Erreur : " + error));
    })
    .catch((error) => alert("Erreur : " + error));
}
//remplissage du tableau
function modifSelecteurCat() {
  selectSexe.selectedIndex = 0;
  depChoisi = departements[listedep.selectedIndex];
  var catChoisi = ages[listecat.selectedIndex];
  choixMessage = catChoisi;
  
  if (listecat.selectedIndex == 0)
  {
    urlcovidselect =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.dep_name="+
    depChoisi+"&refine.date=2021%2F06&refine.variable_label=Tous+%C3%A2ges";
  }else{
    choixMessage = catChoisi + " ans";
    if (listecat.selectedIndex == 10){
      catChoisi = "80+et+%2B";
    }
    urlcovidselect =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.dep_name="+
    depChoisi+"&refine.date=2021%2F06&refine.variable_label="+ catChoisi;
  }
  affichageDonnees();
}

function modifSlecteurSex() {
selectCategories.selectedIndex = 0;
depChoisi = departements[listedep.selectedIndex];
var sexChoisi = sexe[listesex.selectedIndex];
choixMessage = sexChoisi;
if (listesex.selectedIndex == 0){
  urlcovidselect =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.dep_name="+
  depChoisi+"&refine.date=2021%2F06&refine.variable_label=Hommes+et+femmes";
}else{
  urlcovidselect =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.dep_name="+
  depChoisi+"&refine.date=2021%2F06&refine.variable_label="+ sexChoisi;
}
affichageDonnees();
}














function affichageDonnees()
{
  fetch(urlcovidselect)
    .then(function (response) {
      response
        .text()
        .then(function (covidSelect) {
          var objCovidSelect = JSON.parse(covidSelect);

          console.log(objCovidSelect.records[0].fields.couv_complet);

          couvComplet = objCovidSelect.records[0].fields.couv_complet;
          couv1 = objCovidSelect.records[0].fields.couv_dose1;
          dateDonneesFr = objCovidSelect.records[0].fields.date;
          var date1Fr = new Date(dateDonneesFr);
          affichageSelect.innerHTML =
            date1Fr.toLocaleDateString("fr-FR") +
            " : Dans le " +
            depChoisi +
            ", pour la population de "+ choixMessage +", il y a : " +
            couv1 +
            " % de la population qui ont reçu une première dose de vaccin et " +
            couvComplet +
            " % a une couverture complète. ";
        })
        .catch((error) => alert("Erreur : " + error));
    })
    .catch((error) => alert("Erreur : " + error));
}




function RemplirTableau() {
  if (dejaFait === true) {
    var tbl = document.getElementById("tabDonnees");
    for (var bcl = 0; bcl < 14; bcl++) {
      tbl.deleteRow(-1);
    }
  }
  dejaFait = true;
  tabDonn.remove();
  tabDonn.style.border = "thick solid #0000FF";
  console.log("rea");
  console.table(nombreRea);
  console.log("date");
  console.table(nombreDate);
  for (z = 0; z < 14; z++) {
    itemTabLig = document.createElement("tr");

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombreDate[z]));
    itemTabCel.style.fontSize = "larger";
    itemTabCel.style.fontWeight = "bold";
    itemTabLig.appendChild(itemTabCel);

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombreHospi[z]));
    itemTabCel.style.textAlign = "center";
    itemTabLig.appendChild(itemTabCel);

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombreRea[z]));
    itemTabCel.style.textAlign = "center";
    itemTabLig.appendChild(itemTabCel);

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombreNewHospi[z]));
    itemTabCel.style.textAlign = "center";
    itemTabLig.appendChild(itemTabCel);

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombreNewRea[z]));
    itemTabCel.style.textAlign = "center";
    itemTabLig.appendChild(itemTabCel);

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombredeces[z]));
    itemTabCel.style.textAlign = "center";
    itemTabLig.appendChild(itemTabCel);

    itemTabCel = document.createElement("td");
    itemTabCel.appendChild(document.createTextNode(nombregueris[z]));
    itemTabCel.style.textAlign = "center";
    itemTabLig.appendChild(itemTabCel);

    itemTabLig.appendChild(itemTabCel);
    tabDonn.appendChild(itemTabLig);
  }
  tabComp.appendChild(tabDonn);

  // Load the Visualization API and the corechart package.
  google.charts.load("current", { packages: ["corechart"] });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);
  google.charts.setOnLoadCallback(drawChart1);
  google.charts.setOnLoadCallback(drawChart2);
  google.charts.setOnLoadCallback(drawChart3);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Date");
    data.addColumn("number", "En Réanimations");
    data.addRows([
      [nombreDate[13], nombreRea[13]],
      [nombreDate[12], nombreRea[12]],
      [nombreDate[11], nombreRea[11]],
      [nombreDate[10], nombreRea[10]],
      [nombreDate[9], nombreRea[9]],
      [nombreDate[8], nombreRea[8]],
      [nombreDate[7], nombreRea[7]],
      [nombreDate[6], nombreRea[6]],
      [nombreDate[5], nombreRea[5]],
      [nombreDate[4], nombreRea[4]],
      [nombreDate[3], nombreRea[3]],
      [nombreDate[2], nombreRea[2]],
      [nombreDate[1], nombreRea[1]],
      [nombreDate[0], nombreRea[0]],
    ]);

    // Set chart options
    var options = { title: "En Réanimations", width: 600, height: 300 };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }

  function drawChart1() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Date");
    data.addColumn("number", "Nouvelles Réanimations");
    data.addRows([
      [nombreDate[13], nombreNewRea[13]],
      [nombreDate[12], nombreNewRea[12]],
      [nombreDate[11], nombreNewRea[11]],
      [nombreDate[10], nombreNewRea[10]],
      [nombreDate[9], nombreNewRea[9]],
      [nombreDate[8], nombreNewRea[8]],
      [nombreDate[7], nombreNewRea[7]],
      [nombreDate[6], nombreNewRea[6]],
      [nombreDate[5], nombreNewRea[5]],
      [nombreDate[4], nombreNewRea[4]],
      [nombreDate[3], nombreNewRea[3]],
      [nombreDate[2], nombreNewRea[2]],
      [nombreDate[1], nombreNewRea[1]],
      [nombreDate[0], nombreNewRea[0]],
    ]);

    // Set chart options
    var options = { title: "Nouvelles Réanimations", width: 600, height: 300 };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(
      document.getElementById("chart_div1")
    );
    chart.draw(data, options);
  }

  function drawChart2() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Date");
    data.addColumn("number", "Hospitalisation");
    data.addRows([
      [nombreDate[6], nombreHospi[13]],
      [nombreDate[13], nombreHospi[12]],
      [nombreDate[12], nombreHospi[11]],
      [nombreDate[11], nombreHospi[10]],
      [nombreDate[9], nombreHospi[9]],
      [nombreDate[8], nombreHospi[8]],
      [nombreDate[7], nombreHospi[7]],
      [nombreDate[6], nombreHospi[6]],
      [nombreDate[5], nombreHospi[5]],
      [nombreDate[4], nombreHospi[4]],
      [nombreDate[3], nombreHospi[3]],
      [nombreDate[2], nombreHospi[2]],
      [nombreDate[1], nombreHospi[1]],
      [nombreDate[0], nombreHospi[0]],
    ]);

    // Set chart options
    var options = {
      title: "Nombre de personnes Hospitalisés",
      width: 600,
      height: 300,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(
      document.getElementById("chart_div2")
    );
    chart.draw(data, options);
  }

  function drawChart3() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Date");
    data.addColumn("number", "Nouvelles hopitalisations");
    data.addRows([
      [nombreDate[6], nombreNewHospi[13]],
      [nombreDate[12], nombreNewHospi[12]],
      [nombreDate[11], nombreNewHospi[11]],
      [nombreDate[10], nombreNewHospi[10]],
      [nombreDate[9], nombreNewHospi[9]],
      [nombreDate[8], nombreNewHospi[8]],
      [nombreDate[7], nombreNewHospi[7]],
      [nombreDate[6], nombreNewHospi[6]],
      [nombreDate[5], nombreNewHospi[5]],
      [nombreDate[4], nombreNewHospi[4]],
      [nombreDate[3], nombreNewHospi[3]],
      [nombreDate[2], nombreNewHospi[2]],
      [nombreDate[1], nombreNewHospi[1]],
      [nombreDate[0], nombreNewHospi[0]],
    ]);

    // Set chart options
    var options = {
      title: "Nouvelles hopitalisations",
      width: 600,
      height: 300,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(
      document.getElementById("chart_div3")
    );
    chart.draw(data, options);
  }
}
