/* Schéma fermé : aucun texte libre, score, réponse ou identifiant d'apprenant.
   Ce fichier doit précéder l'initialisation de Plausible. */
(() => {
  const allowed=/^(pageview|engagement|Porte ouverte · (Jeu démarré|Parcours terminé|Module [1-3] (démarré|terminé)))$/;
  window.poAnalytics={
    transformRequest(payload){
      if(!allowed.test(payload.n))return null;
      payload.u=location.origin+location.pathname;
      payload.r=null;
      delete payload.p;
      delete payload.$;
      return payload;
    },
    track(name){
      const full=`Porte ouverte · ${name}`;
      if(!allowed.test(full))return;
      try { if(typeof window.plausible==="function")window.plausible(full); } catch { /* Ne jamais bloquer le jeu. */ }
    }
  };
})();
