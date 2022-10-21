const {trouverEquilibre, getMoyenneCasier} = require("./equilibrage");

describe("équilibrage", () => {
  describe("getMoyenneCasier()", () => {
    it("doit retourner la moyenne de casier sur la période", () => {
      // Given
      const listeCasier = [{
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

      // When
      const moyenneCasier = getMoyenneCasier(listeCasier);

      // Then
      expect(moyenneCasier).toEqual(41);
    });
  });
  describe("trouverEquilibre()", () => {
    describe("Si un casier a plus que la moyenne de casier", () => {
      it("doit retirer la différence et l'envoyer la semaine suivante", () => {
        // Given
        const premierCasier = {
          date: 20220404,
          lockers: 45,
          places: {a: 20, b: 15, c: 10},
        };

        const deuxièmeCasier = {
          date: 20220411,
          lockers: 29,
          places: {a: 10, b: 10, c: 9},
        };

        const listeCasier = [premierCasier, deuxièmeCasier];

        // When
        const listeCasierTrié = trouverEquilibre(listeCasier);
        const premierCasierTrié = listeCasierTrié[0];
        const deuxièmeCasierTrié = listeCasierTrié[1];

        // Then
        expect(premierCasierTrié.lockers).toEqual(37);
        expect(deuxièmeCasierTrié.lockers).toEqual(37);
      });
    });
    describe("Si le casier suivant dépasse la moyenne avec l'équilibrage", () => {
      it("ne doit avancer que le nombre de casier le faisant arriver à l'équilibre", () => {
        // Given
        const premierCasier = {
          date: 20220404,
          lockers: 19,
          places: {a: 20, b: 15, c: 10},
        };

        const deuxièmeCasier = {
          date: 20220411,
          lockers: 10,
          places: {a: 10, b: 10, c: 9},
        };

        const troisièmeCasier = {
          date: 20220418,
          lockers: 13,
          places: {a: 30, b: 20, c: 20},
        };

        const listeCasier = [premierCasier, deuxièmeCasier, troisièmeCasier];

        // When
        const listeCasierTrié = trouverEquilibre(listeCasier);
        const premierCasierTrié = listeCasierTrié[0];
        const deuxièmeCasierTrié = listeCasierTrié[1];
        const troisièmeCasierTrié = listeCasierTrié[2];

        // Then
        expect(premierCasierTrié.lockers).toEqual(15);
        expect(deuxièmeCasierTrié.lockers).toEqual(14);
        expect(troisièmeCasierTrié.lockers).toEqual(13);
      });
    });
    describe("Si le point relais A a trois fois plus de casiers que les autres", () => {
      it("doit faire passer 3 fois plus de casiers à la semaine suivante ", () => {
        // Given
        const premierCasier = {
          date: 20220404,
          lockers: 50,
          places: {a: 30, b: 10, c: 10},
        };

        const deuxièmeCasier = {
          date: 20220411,
          lockers: 30,
          places: {a: 10, b: 10, c: 10},
        };

        const listeCasier = [premierCasier, deuxièmeCasier];

        // When
        const listeCasierTrié = trouverEquilibre(listeCasier);
        const premierCasierTrié = listeCasierTrié[0];
        const deuxièmeCasierTrié = listeCasierTrié[1];

        // Then
        expect(premierCasierTrié.places.a).toEqual(24);
        expect(premierCasierTrié.places.b).toEqual(8);
        expect(premierCasierTrié.places.c).toEqual(8);
        expect(deuxièmeCasierTrié.places.a).toEqual(16);
        expect(deuxièmeCasierTrié.places.b).toEqual(12);
        expect(deuxièmeCasierTrié.places.c).toEqual(12);
      });
    });
    describe("Si une semaine possède chacun 6 points relais", () => {
      it("doit faire passer 3 fois plus de casiers à la semaine suivante ", () => {
        // Given
        const premierCasier = {
          date: 20220404,
          lockers: 120,
          places: {
            a: 70, b: 10, c: 10, d: 10, e: 10, f: 10,
          },
        };

        const deuxièmeCasier = {
          date: 20220411,
          lockers: 60,
          places: {
            a: 10, b: 10, c: 10, d: 10, e: 10, f: 10,
          },
        };

        const listeCasier = [premierCasier, deuxièmeCasier];

        // When
        const listeCasierTrié = trouverEquilibre(listeCasier);
        const premierCasierTrié = listeCasierTrié[0];
        const deuxièmeCasierTrié = listeCasierTrié[1];

        // Then
        expect(premierCasierTrié.places.a).toEqual(52);
        expect(premierCasierTrié.places.b).toEqual(7);
        expect(premierCasierTrié.places.c).toEqual(7);
        expect(premierCasierTrié.places.d).toEqual(8);
        expect(deuxièmeCasierTrié.places.a).toEqual(28);
        expect(deuxièmeCasierTrié.places.b).toEqual(13);
        expect(deuxièmeCasierTrié.places.c).toEqual(13);
        expect(deuxièmeCasierTrié.places.d).toEqual(12);
      });
    });
    describe('Si la période contient 6 semaines', () => {
      it('doit équilibrer les 6 semaines ', () => {
        // Given
        const casierNonEquilibrés = [{
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
        }, {
          date: 20220501,
          lockers: 70,
          places: {a: 30, b: 20, c: 20},
        }, {
          date: 20220508,
          lockers: 20,
          places: {a: 5, b: 10, c: 5},
        }];

        const casierAttendu = [{
          date: 20220404,
          lockers: 42,
          places: {a: 18, b: 14, c: 10},
        }, {
          date: 20220411,
          lockers: 32,
          places: {a: 12, b: 11, c: 9},
        }, {
          date: 20220418,
          lockers: 48,
          places: {a: 20, b: 14, c: 14},
        }, {
          date: 20220425,
          lockers: 42,
          places: {a: 15, b: 16, c: 11},
        }, {
          date: 20220501,
          lockers: 48,
          places: {a: 20, b: 14, c: 14},
        }, {
          date: 20220508,
          lockers: 42,
          places: {a: 15, b: 16, c: 11},
        }];

        // When
        const listeCasierTrié = trouverEquilibre(casierNonEquilibrés);

        // Then
        expect(listeCasierTrié).toEqual(casierAttendu)
      });
    });

    describe("Si tout les casiers n'ont pas été passé", () => {
      it("doit renvoyer les suivants 1 par 1", () => {
        // Given
        const casierNonEquilibrés = [{
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

        const casierAttendu = [{
          date: 20220404,
          lockers: 41,
          places: {a: 18, b: 13, c: 10},
        }, {
          date: 20220411,
          lockers: 33,
          places: {a: 12, b: 12, c: 9},
        }, {
          date: 20220418,
          lockers: 49,
          places: {a: 21, b: 14, c: 14},
        }, {
          date: 20220425,
          lockers: 41,
          places: {a: 14, b: 16, c: 11},
        }];

        // When
        const casierEquilibré = trouverEquilibre(casierNonEquilibrés);

        // Then
        expect(casierEquilibré).toEqual(casierAttendu);
      });
    });
  });
});
