import {trouverEquilibre} from "./trouverEquilibre";

const listeSemaine: Semaine[] = [{
    date: 20220404,
    lockers: 45,
    places: {a: 20, b: 15, c: 10},
}, {
    date: 20220411,
    lockers: 29,
    places: {a: 10, b: 10, c: 9},
}, {
    date: 20220418,
    lockers: 70,
    places: {a: 30, b: 20, c: 20},
}, {
    date: 20220425,
    lockers: 20,
    places: {a: 5, b: 10, c: 5},
}];

const semaineEquilibré = trouverEquilibre(listeSemaine);

console.log(semaineEquilibré);
