# Mesure d'audience

Plausible, sans cookie, chargé uniquement sur `jetpod.github.io/porte-ouverte/` (site Plausible `jetpod.github.io`, partagé avec les autres jeux).

Schéma fermé (`analytics.js`) : URL réduite à origine + chemin, référent supprimé, aucune propriété personnalisée. Aucun score, réponse ou identifiant n'est transmis.

## Objectifs à créer dans Plausible

Settings, puis Goals, puis Add goal, puis Custom event, avec ces noms exacts (les objectifs ne sont pas rétroactifs) :

1. `Levée de précautions · Jeu démarré`
2. `Levée de précautions · Module 1 démarré`
3. `Levée de précautions · Module 1 terminé`
4. `Levée de précautions · Module 2 démarré`
5. `Levée de précautions · Module 2 terminé`
6. `Levée de précautions · Module 3 démarré`
7. `Levée de précautions · Module 3 terminé`
8. `Levée de précautions · Parcours terminé`

Chaque événement est envoyé au plus une fois par chargement de page.

## Attestation de fin de parcours

Le module commun `attestation.js` propose, à la fin d'un module ou d'un parcours complet, une attestation nominative imprimable (A4 paysage, impression ou PDF via le navigateur). Elle n'affiche que le palier atteint, jamais le score :

- **Réussite avec excellence** : au moins 95 % de réponses adaptées, sans erreur critique ;
- **Réussite** : au moins 80 %, sans erreur critique (seuil de réussite) ;
- **Participation** : en dessous du seuil.

Signature : Dr Jean-Etienne Podik, EOH AHNAC. Mention : outil pédagogique à partir de cas fictifs, sans valeur de validation des compétences ni d'action de DPC. Le nom saisi reste sur l'appareil ; seul l'événement de palier est compté par Plausible, commun à tous les jeux du site (filtrer par page pour un jeu donné) :

```
Attestation · Participation
Attestation · Réussite
Attestation · Excellence
```
