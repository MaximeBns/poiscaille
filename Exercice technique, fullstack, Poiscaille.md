# Création d'un service d'équilibrage

Les clients de l'entreprise peuvent s'abonner au casier de la mer (un panier de poisson au contenu variable) à la semaine, la quinzaine ou au mois (ex. le mardi une semaine sur deux) dans un point relais. Cela occasionne parfois des déséquilibres entre une semaine ou 1000 commandes sont à préparer et la suivante ou c'est le double. L'illustration jointe présente 4 mercredis en mai avec respectivement 45, 29, 70 et 20 casiers. Trois étapes détaillent ensuite le processus d'équilibrage (qui repousse une partie des casiers vers le futur, et répartit les casiers proportionnellement entre les points relais).

# On va dire aux gens que leur casier sera livré la semaine prochaine ?

L'objectif de cet exercice est de réaliser cet équilibrage en javascript.

## Contraintes fonctionnelles

1. L'algorithme doit permettre d'équilibrer 2 à 6 semaines entre elles
2. Le nombre de points relais peut être supérieur à 10
3. _Optionnel_ : Réfléchir à un algorithme qui en plus de repousser les casiers dans le futur, serait en mesure de rapprocher les lointains plus proche du présent
4. _Optionnel_ : Proposer une interface simple avec [react](https://fr.reactjs.org/) pour interagir avec ce service

## Contraintes temporelles

Une semaine, et deux weekends. Le process de recrutement reprend dès le rendu de l'exercice.

## Structure de données

L'algorithme prendra en entrée (pour l'exemple illustré) :

```javascript
[{
    date: 20220404,
    lockers: 45,
    places: {a: 20, b: 15, c: 10}
},{
    date: 20220411,
    lockers: 29,
    places: {a: 10, b: 10, c: 9}
},{
    date: 20220418,
    lockers: 70,
    places: {a: 30, b: 20, c: 20}
},{
    date: 20220425,
    lockers: 20,
    places: {a: 5, b: 10, c: 5}
}]
```

Et produira en sortie :

```javascript
[{
    date: 20220404,
    lockers: 41,
    places: {a: 18, b: 13, c: 10}
},{
    date: 20220411,
    lockers: 33,
    places: {a: 12, b: 12, c: 9}
},{
    date: 20220418,
    lockers: 49,
    places: {a: 21, b: 14, c: 14}
},{
    date: 20220425,
    lockers: 41,
    places: {a: 14, b: 16, c: 11}
}]
```
