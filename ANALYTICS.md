# Mesure d'audience

Plausible, sans cookie, chargé uniquement sur `jetpod.github.io/porte-ouverte/` (site Plausible `jetpod.github.io`, partagé avec les autres jeux).

Schéma fermé (`analytics.js`) : URL réduite à origine + chemin, référent supprimé, aucune propriété personnalisée. Aucun score, réponse ou identifiant n'est transmis.

## Objectifs à créer dans Plausible

Settings, puis Goals, puis Add goal, puis Custom event, avec ces noms exacts (les objectifs ne sont pas rétroactifs) :

1. `Porte ouverte · Jeu démarré`
2. `Porte ouverte · Module 1 démarré`
3. `Porte ouverte · Module 1 terminé`
4. `Porte ouverte · Module 2 démarré`
5. `Porte ouverte · Module 2 terminé`
6. `Porte ouverte · Module 3 démarré`
7. `Porte ouverte · Module 3 terminé`
8. `Porte ouverte · Parcours terminé`

Chaque événement est envoyé au plus une fois par chargement de page.
