const NOMBRE_DE_JOURS_ENTRE_DEUX_COMMANDES = 7;

function ventilerResteDesCasiers(commandeTropGrande, commandeSuivante, resteDesCasiers, pointRelais) {
  for (let i = 0; i < resteDesCasiers; i += 1) {
    commandeTropGrande.places[pointRelais[i]] -= 1;
    commandeSuivante.places[pointRelais[i]] += 1;
  }
}

function equilibrerPointRelais(differenceAReporter, commandeTropGrande, commandeSuivante) {
  const pointRelais = Object.keys(commandeTropGrande.places);
  const nombreDePointsRelais = pointRelais.length;
  let nombreDeCasierDéplacé = 0;

  for (let i = 0; i < nombreDePointsRelais; i += 1) {
    const nombreDeCasierADeplacer = Math.floor((differenceAReporter / commandeTropGrande.lockers) * commandeTropGrande.places[pointRelais[i]]);
    commandeTropGrande.places[pointRelais[i]] -= nombreDeCasierADeplacer;
    commandeSuivante.places[pointRelais[i]] += nombreDeCasierADeplacer;
    nombreDeCasierDéplacé += nombreDeCasierADeplacer;
  }
  const resteDesCasiers = differenceAReporter - nombreDeCasierDéplacé;

  if (resteDesCasiers > 0) {
    ventilerResteDesCasiers(commandeTropGrande, commandeSuivante, resteDesCasiers, pointRelais);
  }
}

function getCommandeSuivante(commande, commandeTropGrande) {
  return commande.date === commandeTropGrande.date + NOMBRE_DE_JOURS_ENTRE_DEUX_COMMANDES;
}

function getMoyenneCasier(listeCommande) {
  const listCasier = listeCommande.map((commande) => commande.lockers);
  const total = listCasier.reduce((result, casier) => result + casier);
  return total / listeCommande.length;
}

function calculerDifferenceAReporter(commandeTropGrande, commandeSuivante, moyenneCasier) {
  let differenceAReporter = commandeTropGrande.lockers - moyenneCasier;

  if (commandeSuivante.lockers + differenceAReporter > moyenneCasier) {
    differenceAReporter = moyenneCasier - commandeSuivante.lockers;
  }
  return differenceAReporter;
}

function trouverEquilibre(listeCommande) {
  const moyenneCasier = getMoyenneCasier(listeCommande);

  const listeCommandeTropGrande = listeCommande.filter((commande) => commande.lockers > moyenneCasier);

  listeCommandeTropGrande.map((commandeTropGrande) => {
    const commandeSuivante = listeCommande.find((commande) => getCommandeSuivante(commande, commandeTropGrande));
    const differenceAReporter = calculerDifferenceAReporter(commandeTropGrande, commandeSuivante, moyenneCasier);
    equilibrerPointRelais(differenceAReporter, commandeTropGrande, commandeSuivante);
    commandeTropGrande.lockers -= differenceAReporter;
    commandeSuivante.lockers += differenceAReporter;
    return listeCommande;
  });

  return listeCommande;
}

module.exports = { trouverEquilibre, getMoyenneCasier };
