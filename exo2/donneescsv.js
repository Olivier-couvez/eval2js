// au moment on l'on charge la fenetre
window.onload = function () {
  var f = document.getElementById("file"); // on recupere le composant de selection de fichiers
  var res;
  var decodecsv;
  var dataCharts;
  f.onchange = function () {
    var file = f.files[0]; // on recupere le premier élément de la liste des fichiers sélectionnés
    var fr = new FileReader(); // on instancie un objet FileReader qui va nous permettre de lire le contenu du fichier csv
    fr.readAsText(file); // on lit le contenu du fichier csv

    fr.onprogress = function () {};
    fr.onerror = function () {};
    fr.onload = function () {
      res = fr.result; // on recupère le contenu du fichier csv
      // on transforme le fichier csv en tableau 2d
      decodecsv = parseFichiercsv(res);
      // on transforme le tableau 2d en dataTable
      dataCharts = setDataTable(decodecsv);
      // on trace le graphe correspondant au dataTable
      traceDiagramme(dataCharts);
    };
  };
};
//Cette fonction permet de décoder le contenu du fichier csv et retourne
// un tableau 2d
function parseFichiercsv(fic) {
  var datacsv = new Array();
  var rows = fic.split("\r\n");
  for (let i = 0; i < rows.length - 1; i++) {
    var cells = rows[i].split(",");
    datacsv.push(cells);
  }
  return datacsv;
}
//cette fonction reçoit un tableau 2d et le convertit en dataTable
function setDataTable(data) {
  let somme;
  var donnees = new google.visualization.DataTable();
  // on ajoute deux colonne de type nombre
  donnees.addColumn("string");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");
  donnees.addColumn("number");

  donnees.setColumnLabel(0, "pays");
  donnees.setColumnLabel(1, "2008");
  donnees.setColumnLabel(2, "2009");
  donnees.setColumnLabel(3, "2010");
  donnees.setColumnLabel(4, "2011");
  donnees.setColumnLabel(5, "2012");
  donnees.setColumnLabel(6, "2013");
  donnees.setColumnLabel(7, "2014");
  donnees.setColumnLabel(8, "2015");
  donnees.setColumnLabel(9, "2016");
  donnees.setColumnLabel(10, "2017");
  donnees.setColumnLabel(11, "2018");
  donnees.setColumnLabel(12, "moyenne");
  // on remplit le dataTable avec le contenu du tableau 2d
  // on commence au second élément car le premier correspond au nom des colonnes du csv
  // le tableau 2d est de type [string][number][number][number][number][number][number][number][number]
  // il convient alors de convertir les items de 1 à 8 en entier afin qu'il puisse etre interprété comme un number
  // le neuvième item correspond à la moyenne de la production qu'il conviendra de calculer
  //recupération de l'entete du fichier csv

  for (let i = 1; i < data.length; i++) {
    somme = 0;
    for (let j = 7; j < 12; j++) {
      somme += parseInt(data[i][j]); // permet de calculer la production moyenne d'un pay en fonction des données contenues dans le csv
    }
    donnees.addRow([
      data[i][0],
      parseInt(data[i][1]),
      parseInt(data[i][2]),
      parseInt(data[i][3]),
      parseInt(data[i][4]),
      parseInt(data[i][5]),
      parseInt(data[i][6]),
      parseInt(data[i][7]),
      parseInt(data[i][8]),
      parseInt(data[i][9]),
      parseInt(data[i][10]),
      parseInt(data[i][11]),
      Math.floor(somme / 8),
    ]);
  }
  // on retourne un datatable mis à jour avec les donées du fichier csv
  return donnees;
}
// ici la fonction reçoit directement le dataTable qui sera utilisé pour tracer le graphe
function traceDiagramme(data) {
  // creation du Dashboard
  var tableauDeBord = new google.visualization.Dashboard(
    document.getElementById("dashboard")
  );
  // creation du contole curseur
  var curseurFiltre = new google.visualization.ControlWrapper({
    controlType: "NumberRangeFilter",
    containerId: "curseur",
    options: {
      filterColumnLabel: "moyenne",
      minValue: 1,
      maxValue: 200,
      ui: { orientation: "horizontal", showRangeValues: true },
    },
  });

  var paysFiltre = new google.visualization.ControlWrapper({
    controlType: "CategoryFilter",
    containerId: "categories",
    options: {
      filterColumnLabel: "pays",
      ui: {
        labelStacking: "vertical",
        allowTyping: "false",
        allowMultiple: "true",
      },
    },
  });

  //creation du graphe dynamique
  var progDiag = new google.visualization.ChartWrapper({
    chartType: "ComboChart",
    containerId: "diagramme",
    options: {
      title: "Evolution de la population Européenne entre 2008 et 2018",
      vAxis: { title: "Population" },
      hAxis: { title: "pays" },
      seriesType: "bars",
    },
  });

  tableauDeBord.bind([curseurFiltre, paysFiltre], progDiag);
  tableauDeBord.draw(data);
}
