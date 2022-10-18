const NOMBRE_DE_JOURS_ENTRE_DEUX_COMMANDES = 7;


function trouverEquilibre(listeCommande) {

    const moyenneCasier = getMoyenneCasier(listeCommande);

    const listeCommandeTropGrande = listeCommande.filter(commande => commande.lockers > moyenneCasier);

    listeCommandeTropGrande.map(commandeTropGrande => {
        const commandeSuivante = listeCommande.find(commande => getCommandeSuivante(commande, commandeTropGrande));
        const differenceAReporter = calculerDifferenceAReporter(commandeTropGrande, commandeSuivante, moyenneCasier);



        const nombreDeCasierADeplacer = differenceAReporter / commandeTropGrande.lockers * commandeTropGrande.places.a;

        commandeTropGrande.places.a -= nombreDeCasierADeplacer;
        commandeSuivante.places.a += nombreDeCasierADeplacer;

        const nombreDeCasierADeplacerB = differenceAReporter / commandeTropGrande.lockers * commandeTropGrande.places.b;

        commandeTropGrande.places.b -= nombreDeCasierADeplacerB;
        commandeSuivante.places.b += nombreDeCasierADeplacerB;

        const nombreDeCasierADeplacerC = differenceAReporter / commandeTropGrande.lockers * commandeTropGrande.places.c;

        commandeTropGrande.places.c -= nombreDeCasierADeplacerC;
        commandeSuivante.places.c += nombreDeCasierADeplacerC;

        commandeTropGrande.lockers -= differenceAReporter;
        commandeSuivante.lockers += differenceAReporter;

    })

    return listeCommande;
}

function getCommandeSuivante(commande, commandeTropGrande) {
    return commande.date === commandeTropGrande.date + NOMBRE_DE_JOURS_ENTRE_DEUX_COMMANDES;
}

function getMoyenneCasier(listeCommande) {
    const listCasier = listeCommande.map((commande) =>
        commande.lockers
    );
    const total = listCasier.reduce((result, casier) => result + casier)
    return total / listeCommande.length;
}

function calculerDifferenceAReporter(commandeTropGrande, commandeSuivante, moyenneCasier) {
    let differenceAReporter = commandeTropGrande.lockers - moyenneCasier;

    if (commandeSuivante.lockers + differenceAReporter > moyenneCasier) {
        differenceAReporter = moyenneCasier - commandeSuivante.lockers;
    }
    return differenceAReporter;
}


module.exports = {trouverEquilibre, getMoyenneCasier};
