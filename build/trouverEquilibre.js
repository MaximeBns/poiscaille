import { calculerDifferenceAReporter, equilibrerPointRelais, getMoyenneCasier, équilibrerSemaine } from "./equilibrage.js";
export function trouverEquilibre(listeSemaine) {
    const moyenneCasier = getMoyenneCasier(listeSemaine);
    const listeSemaineAyantTropDeCommande = listeSemaine.filter((commande) => commande.lockers > moyenneCasier);
    listeSemaineAyantTropDeCommande.map((semaineAyantTropDeCommande) => {
        const semaineSuivante = listeSemaine[listeSemaine.indexOf(semaineAyantTropDeCommande) + 1];
        const differenceAReporter = calculerDifferenceAReporter(semaineAyantTropDeCommande, semaineSuivante, moyenneCasier);
        equilibrerPointRelais(differenceAReporter, semaineAyantTropDeCommande, semaineSuivante);
        équilibrerSemaine(semaineAyantTropDeCommande, differenceAReporter, semaineSuivante);
        return listeSemaine;
    });
    return listeSemaine;
}
