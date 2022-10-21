// @ts-nocheck
export function ventilerResteDesCasiers(semaineTropGrande, semaineSuivante, resteDesCasiers, pointRelais) {
    for (let i = 0; i < resteDesCasiers; i += 1) {
        semaineTropGrande.places[pointRelais[i]] -= 1;
        semaineSuivante.places[pointRelais[i]] += 1;
    }
}
export function equilibrerPointRelais(differenceAReporter, semaineAyantTropDeCommande, semaineSuivante) {
    const pointRelais = Object.keys(semaineAyantTropDeCommande.places);
    const nombreDePointsRelais = pointRelais.length;
    let nombreDeCasierDéplacé = 0;
    for (let i = 0; i < nombreDePointsRelais; i += 1) {
        const nombreDeCasierADeplacer = Math.floor((differenceAReporter / semaineAyantTropDeCommande.lockers) * semaineAyantTropDeCommande.places[pointRelais[i]]);
        semaineAyantTropDeCommande.places[pointRelais[i]] -= nombreDeCasierADeplacer;
        semaineSuivante.places[pointRelais[i]] += nombreDeCasierADeplacer;
        nombreDeCasierDéplacé += nombreDeCasierADeplacer;
    }
    const resteDesCasiers = differenceAReporter - nombreDeCasierDéplacé;
    if (resteDesCasiers > 0) {
        ventilerResteDesCasiers(semaineAyantTropDeCommande, semaineSuivante, resteDesCasiers, pointRelais);
    }
}
export function getMoyenneCasier(listeSemaine) {
    const listeCasier = listeSemaine.map((commande) => commande.lockers);
    const nombreDeCasierTotal = listeCasier.reduce((total, casier) => total + casier);
    return Math.floor(nombreDeCasierTotal / listeSemaine.length);
}
export function calculerDifferenceAReporter(semaineAyantTropDeCommande, semaineSuivante, moyenneCasier) {
    let differenceAReporter = semaineAyantTropDeCommande.lockers - moyenneCasier;
    if (semaineSuivante.lockers + differenceAReporter > moyenneCasier) {
        differenceAReporter = Math.max(moyenneCasier - semaineSuivante.lockers, 0);
    }
    return differenceAReporter;
}
export function équilibrerSemaine(semaineAyantTropDeCommande, differenceAReporter, semaineSuivante) {
    semaineAyantTropDeCommande.lockers -= differenceAReporter;
    semaineSuivante.lockers += differenceAReporter;
}
