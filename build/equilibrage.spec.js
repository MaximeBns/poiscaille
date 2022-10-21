import { trouverEquilibre } from "./trouverEquilibre";
const { getMoyenneCasier } = require("./equilibrage");
describe("équilibrage", () => {
    describe("getMoyenneCasier()", () => {
        it("doit retourner la moyenne de casier sur la période", () => {
            // Given
            const listeSemaine = [{
                    date: 20220404,
                    lockers: 45,
                    places: { a: 20, b: 15, c: 10 },
                }, {
                    date: 20220411,
                    lockers: 29,
                    places: { a: 10, b: 10, c: 9 },
                }, {
                    date: 20220418,
                    lockers: 70,
                    places: { a: 30, b: 20, c: 20 },
                }, {
                    date: 20220425,
                    lockers: 20,
                    places: { a: 5, b: 10, c: 5 },
                }];
            // When
            const moyenneCasier = getMoyenneCasier(listeSemaine);
            // Then
            expect(moyenneCasier).toEqual(41);
        });
    });
    describe("trouverEquilibre()", () => {
        describe("Si une semaine possède plus de casier que la moyenne", () => {
            it("doit retirer la différence et la reporter la semaine suivante", () => {
                // Given
                const premièreSemaine = {
                    date: 20220404,
                    lockers: 45,
                    places: { a: 20, b: 15, c: 10 },
                };
                const deuxièmeSemaine = {
                    date: 20220411,
                    lockers: 29,
                    places: { a: 10, b: 10, c: 9 },
                };
                const listeSemaine = [premièreSemaine, deuxièmeSemaine];
                // When
                const listeSemaineÉquilibré = trouverEquilibre(listeSemaine);
                const premierCasierTrié = listeSemaineÉquilibré[0];
                const deuxièmeCasierTrié = listeSemaineÉquilibré[1];
                // Then
                expect(premierCasierTrié.lockers).toEqual(37);
                expect(deuxièmeCasierTrié.lockers).toEqual(37);
            });
        });
        describe("Si la semaine suivante a plus de casiers que la moyenne après l'équilibrage", () => {
            it("ne doit avancer que le nombre de casier le faisant arriver à l'équilibre", () => {
                // Given
                const premièreSemaine = {
                    date: 20220404,
                    lockers: 19,
                    places: { a: 20, b: 15, c: 10 },
                };
                const deuxièmeSemaine = {
                    date: 20220411,
                    lockers: 10,
                    places: { a: 10, b: 10, c: 9 },
                };
                const troisièmeSemaine = {
                    date: 20220418,
                    lockers: 13,
                    places: { a: 30, b: 20, c: 20 },
                };
                const listeSemaine = [premièreSemaine, deuxièmeSemaine, troisièmeSemaine];
                // When
                const listeSemaineÉquilibré = trouverEquilibre(listeSemaine);
                const premièreSemaineÉquilibré = listeSemaineÉquilibré[0];
                const deuxièmeSemaineÉquilibré = listeSemaineÉquilibré[1];
                const troisièmeSemaineÉquilibré = listeSemaineÉquilibré[2];
                // Then
                expect(premièreSemaineÉquilibré.lockers).toEqual(15);
                expect(deuxièmeSemaineÉquilibré.lockers).toEqual(14);
                expect(troisièmeSemaineÉquilibré.lockers).toEqual(13);
            });
        });
        describe("Si le point relais A a trois fois plus de casiers que les autres", () => {
            it("doit faire passer 3 fois plus de casiers à la semaine suivante ", () => {
                // Given
                const premièreSemaine = {
                    date: 20220404,
                    lockers: 50,
                    places: { a: 30, b: 10, c: 10 },
                };
                const deuxièmeSemaine = {
                    date: 20220411,
                    lockers: 30,
                    places: { a: 10, b: 10, c: 10 },
                };
                const listeSemaine = [premièreSemaine, deuxièmeSemaine];
                // When
                const listeSemaineTrié = trouverEquilibre(listeSemaine);
                const premièreSemaineÉquilibré = listeSemaineTrié[0];
                const deuxièmeSemaineÉquilibré = listeSemaineTrié[1];
                // Then
                expect(premièreSemaineÉquilibré.places.a).toEqual(24);
                expect(premièreSemaineÉquilibré.places.b).toEqual(8);
                expect(premièreSemaineÉquilibré.places.c).toEqual(8);
                expect(deuxièmeSemaineÉquilibré.places.a).toEqual(16);
                expect(deuxièmeSemaineÉquilibré.places.b).toEqual(12);
                expect(deuxièmeSemaineÉquilibré.places.c).toEqual(12);
            });
        });
        describe("Si une semaine a 6 points relais", () => {
            it("doit faire passer à l'équilibre", () => {
                // Given
                const premièreSemaine = {
                    date: 20220404,
                    lockers: 120,
                    places: {
                        a: 70, b: 10, c: 10, d: 10, e: 10, f: 10,
                    },
                };
                const deuxièmeSemaine = {
                    date: 20220411,
                    lockers: 60,
                    places: {
                        a: 10, b: 10, c: 10, d: 10, e: 10, f: 10,
                    },
                };
                const listeSemaine = [premièreSemaine, deuxièmeSemaine];
                // When
                const listeSemaineÉquilibré = trouverEquilibre(listeSemaine);
                const premièreSemaineÉquilibré = listeSemaineÉquilibré[0];
                const deuxièmeSemaineÉquilibré = listeSemaineÉquilibré[1];
                // Then
                expect(premièreSemaineÉquilibré.places.a).toEqual(52);
                expect(premièreSemaineÉquilibré.places.b).toEqual(7);
                expect(premièreSemaineÉquilibré.places.c).toEqual(7);
                expect(premièreSemaineÉquilibré.places.d).toEqual(8);
                expect(deuxièmeSemaineÉquilibré.places.a).toEqual(28);
                expect(deuxièmeSemaineÉquilibré.places.b).toEqual(13);
                expect(deuxièmeSemaineÉquilibré.places.c).toEqual(13);
                expect(deuxièmeSemaineÉquilibré.places.d).toEqual(12);
            });
        });
        describe('Si la période contient 6 semaines', () => {
            it('doit équilibrer les 6 semaines ', () => {
                // Given
                const listeSemaine = [{
                        date: 20220404,
                        lockers: 45,
                        places: { a: 20, b: 15, c: 10 },
                    }, {
                        date: 20220411,
                        lockers: 29,
                        places: { a: 10, b: 10, c: 9 },
                    }, {
                        date: 20220418,
                        lockers: 70,
                        places: { a: 30, b: 20, c: 20 },
                    }, {
                        date: 20220425,
                        lockers: 20,
                        places: { a: 5, b: 10, c: 5 },
                    }, {
                        date: 20220501,
                        lockers: 70,
                        places: { a: 30, b: 20, c: 20 },
                    }, {
                        date: 20220508,
                        lockers: 20,
                        places: { a: 5, b: 10, c: 5 },
                    }];
                const listeSemaineAttendu = [{
                        date: 20220404,
                        lockers: 42,
                        places: { a: 18, b: 14, c: 10 },
                    }, {
                        date: 20220411,
                        lockers: 32,
                        places: { a: 12, b: 11, c: 9 },
                    }, {
                        date: 20220418,
                        lockers: 48,
                        places: { a: 20, b: 14, c: 14 },
                    }, {
                        date: 20220425,
                        lockers: 42,
                        places: { a: 15, b: 16, c: 11 },
                    }, {
                        date: 20220501,
                        lockers: 48,
                        places: { a: 20, b: 14, c: 14 },
                    }, {
                        date: 20220508,
                        lockers: 42,
                        places: { a: 15, b: 16, c: 11 },
                    }];
                // When
                const listeSemaineÉquilibrée = trouverEquilibre(listeSemaine);
                // Then
                expect(listeSemaineÉquilibrée).toEqual(listeSemaineAttendu);
            });
        });
        describe('Si la période contient deux semaines consécutives au dessus de la moyenne', () => {
            it('doit renvoyer la première semaine identique ', () => {
                // Given
                const listeAyantDeuxSemainesConsécutivesAuDessusDeLaMoyenne = [{
                        date: 20220404,
                        lockers: 45,
                        places: { a: 20, b: 15, c: 10 },
                    }, {
                        date: 20220411,
                        lockers: 45,
                        places: { a: 20, b: 15, c: 10 },
                    }, {
                        date: 20220411,
                        lockers: 10,
                        places: { a: 10, b: 0, c: 0 },
                    }];
                // When
                const listeSemaineÉquilibrée = trouverEquilibre(listeAyantDeuxSemainesConsécutivesAuDessusDeLaMoyenne);
                // Then
                expect(listeSemaineÉquilibrée[0].lockers).toEqual(45);
            });
        });
        describe("Si tout les casiers n'ont pas été passé", () => {
            it("doit renvoyer les suivants 1 par 1", () => {
                // Given
                const listeSemaine = [{
                        date: 20220404,
                        lockers: 45,
                        places: { a: 20, b: 15, c: 10 },
                    }, {
                        date: 20220411,
                        lockers: 29,
                        places: { a: 10, b: 10, c: 9 },
                    }, {
                        date: 20220418,
                        lockers: 70,
                        places: { a: 30, b: 20, c: 20 },
                    }, {
                        date: 20220425,
                        lockers: 20,
                        places: { a: 5, b: 10, c: 5 },
                    }];
                const listeSemaineAttendu = [{
                        date: 20220404,
                        lockers: 41,
                        places: { a: 18, b: 13, c: 10 },
                    }, {
                        date: 20220411,
                        lockers: 33,
                        places: { a: 12, b: 12, c: 9 },
                    }, {
                        date: 20220418,
                        lockers: 49,
                        places: { a: 21, b: 14, c: 14 },
                    }, {
                        date: 20220425,
                        lockers: 41,
                        places: { a: 14, b: 16, c: 11 },
                    }];
                // When
                const listeSemaineÉquilibrée = trouverEquilibre(listeSemaine);
                // Then
                expect(listeSemaineÉquilibrée).toEqual(listeSemaineAttendu);
            });
        });
    });
});
