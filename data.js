/* Porte ouverte : contenu pédagogique.
   Dossiers fictifs. Chaque correction renvoie à des sources publiques vérifiables.
   Types de réponse :
   ok     = décision conforme
   risk   = risque de transmission (levée prématurée, information manquante) : erreur critique
   excess = précaution injustifiée (maintien trop long, examen inutile, blocage du parcours)
   off    = écart de pratique ou de traçabilité, non critique */

const SOURCES = {
  sf2h_pcc: { name: "SF2H, Prévention de la transmission croisée : précautions complémentaires contact, 2009 (R117, R118, R105)", url: "https://www.sf2h.net/k-stock/data/uploads/2009/01/SF2H_prevention-transmission-croisee-2009.pdf" },
  sf2h_resp: { name: "SF2H, Recommandations pour la prévention de la transmission par voie respiratoire, octobre 2024", url: "https://www.sf2h.net/k-stock/data/uploads/2024/reco_respiratoire/Prevention_transmission_voie_respiratoire_RECOS_SF2H.pdf" },
  sf2h_resp_page: { name: "SF2H, Guide de prévention de la transmission par voie respiratoire (page de présentation)", url: "https://www.sf2h.net/publications/guide-de-prevention-de-la-transmission-par-voie-respiratoire.html" },
  sf2h_covid25: { name: "SF2H, Avis du 6 octobre 2025 relatif à la durée du maintien des précautions respiratoires chez le patient hospitalisé atteint de COVID-19", url: "https://www.cpias-ile-de-france.fr/docprocom/doc/sf2h-avis-duree-maintien-pcresp-covid-061025.pdf" },
  splf_tb: { name: "SPLF, SPILF et partenaires, Recommandations tuberculose, 2025", url: "https://www.santepubliquefrance.fr/sites/default/files/rdd/document/7_JNTB_recommandations_tuberculose_splf_spilf_20250328.pdf" },
  hcsp_bhre: { name: "HCSP, Actualisation des recommandations relatives à la maîtrise de la diffusion des BHRe, décembre 2019", url: "https://www.hcsp.fr/Explore.cgi/Telecharger?NomFichier=hcspr20191211_actualidesrecommarelativauxbhre.pdf" },
  cpias_ge_bhre: { name: "CPias Grand Est, Recommandations 2019 du HCSP sur les BHRe : synthèse, JRPIAS 2025", url: "https://cpias-grand-est.fr/wp-content/files/2025/10/actualisation-recommandations-BHRe-du-HCSP-JRPIAS-2025.pdf" },
  cpias_bzh_bhre: { name: "CPias Bretagne, BHRe : recommandations HCSP 2019 (R28, R38, R39), 2022", url: "https://cpiasbretagne.chu-rennes.fr/CPias-Bretagne/pdf/Journees_thematiques/Journee_ES2022-0504/8_S.OUMARI_BHRE_2022-0504.pdf" },
  instr_bhre: { name: "Ministère de la Santé, Instruction BHRe du 14 janvier 2014 et fiches de conduite à tenir", url: "https://sante.gouv.fr/IMG/pdf/instruction_14012014.pdf" },
  hyg_cdi: { name: "Hygiènes, Diagnostic et prise en charge des diarrhées à Clostridioides difficile, 2024", url: "https://www.hygienes.net/system/files/2024-03/HY_XXXII_1_Labo.pdf" },
  cpias_cdi: { name: "CPias, Référentiel EMS : prévention et gestion d'une infection à Clostridioides difficile", url: "https://www.cpias.fr/EMS/referentiel/fiches/ClostridioidesDifficile.docx" },
  dgs_iim: { name: "Instruction DGS/SP/2018/163 du 27 juillet 2018 relative à la prophylaxie des infections invasives à méningocoque", url: "https://sante.gouv.fr/IMG/pdf/instruction_dgs_sp_2018_163.pdf" },
  inrs_iim: { name: "INRS, EFICATT Infection invasive à méningocoque : que faire en cas d'exposition", url: "https://www.inrs.fr/publications/bdd/eficatt/fiche.html?refINRS=EFICATT_Infection%20invasive%20%C3%A0%20m%C3%A9ningocoque&section=queFaireExposition" },
  hcsp_coq24: { name: "HCSP, Avis du 30 juillet 2024 relatif à la prévention de la transmission de la coqueluche aux personnes à risque de forme grave", url: "https://www.hcsp.fr/Explore.cgi/Telecharger?NomFichier=hcspa20240730_coqprvdelatraperrisdeforgra.pdf" },
  hcsp_coq14: { name: "HCSP, Conduite à tenir devant un ou plusieurs cas de coqueluche, 2014", url: "https://www.hcsp.fr/Explore.cgi/Telecharger?NomFichier=hcspr20140710_conduitenircascoqueluche.pdf" },
  morgan: { name: "Morgan DJ et al., Adverse outcomes associated with contact precautions: a review of the literature, Am J Infect Control 2009", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3557494/" }
};

const KINDS = {
  ok: { label: "Décision juste", short: "Juste" },
  risk: { label: "Risque de transmission", short: "Risque" },
  excess: { label: "Précaution injustifiée", short: "Excès" },
  off: { label: "Écart de pratique", short: "Écart" }
};

const FAMILIES = {
  contact: "Contact",
  cdiff: "Contact C. difficile",
  bhre: "Contact BHRe",
  resp: "Respiratoire",
  mixte: "Respiratoire et contact",
  revue: "Revue d'unité"
};

const MODULES = [
  {
    id: 1, code: "M1", title: "Au lit du patient", audience: "IDE et aides-soignants",
    intro: "Vous êtes en poste dans le service. Le patient, sa famille et vos collègues vous posent la question du jour : est-ce qu'on peut enlever l'affiche ?",
    dossiers: [
      {
        title: "Mme Lemaire, 78 ans", germ: "Clostridioides difficile", family: "cdiff", unit: "Médecine polyvalente",
        facts: ["Diarrhée à C. difficile toxinogène confirmée", "Précautions contact spécifiques C. difficile depuis J0", "Traitement par fidaxomicine, prévu 10 jours"],
        timeline: [["J0", "Diarrhée, recherche de toxine positive, précautions mises en place"], ["J3, 7 h", "Dernière selle liquide"], ["J4, 8 h", "Aujourd'hui. Aucune selle depuis 25 heures"]],
        decisions: [
          { q: "J4, 8 h. La patiente veut prendre son repas en salle à manger avec les autres résidents. Que faites-vous ?",
            opts: [
              { t: "Lever les précautions : plus de diarrhée depuis 24 heures, elle est guérie.", k: "risk", fb: "Trop tôt. L'excrétion de spores et la contamination de l'environnement restent importantes juste après l'épisode. Le repère est de 48 heures après la disparition de la diarrhée." },
              { t: "Maintenir jusqu'à 48 heures après la dernière selle liquide, lui expliquer pourquoi et organiser le repas en chambre.", k: "ok", fb: "Oui. Le critère est clinique : 48 heures (48 à 72 heures selon les protocoles) après la disparition de la diarrhée. L'explication à la patiente fait partie de la mesure." },
              { t: "Maintenir jusqu'à la fin des 10 jours de traitement antibiotique.", k: "excess", fb: "Non. La levée est indépendante de la durée du traitement prescrit. Garder la patiente isolée jusqu'à J10 prolonge les contraintes sans bénéfice démontré." },
              { t: "Maintenir jusqu'à ce qu'une recherche de toxine de contrôle revienne négative.", k: "excess", fb: "Non. Le contrôle microbiologique de guérison n'est pas recommandé : les tests peuvent rester positifs alors que le risque, lié aux symptômes, est maîtrisé." }
            ] },
          { q: "Une collègue propose d'envoyer une selle au laboratoire « pour être sûrs » avant de lever. Votre réponse ?",
            opts: [
              { t: "D'accord, on lèvera si le résultat est négatif.", k: "excess", fb: "Le test de contrôle n'a pas sa place : un résultat positif persistant ferait maintenir à tort des précautions déjà inutiles." },
              { t: "Non : on ne contrôle pas la guérison au laboratoire, la décision repose sur l'arrêt de la diarrhée depuis 48 heures.", k: "ok", fb: "Exact. Pas d'examen de selle chez un patient sans diarrhée. Le critère est clinique et doit être tracé (heure de la dernière selle liquide)." },
              { t: "Envoyer seulement une recherche de GDH, moins coûteuse.", k: "excess", fb: "La GDH détecte la présence de la bactérie, pas la contagiosité. Elle reste souvent positive et n'aide pas à décider la levée." }
            ] },
          { q: "J5, 9 h : 48 heures sans diarrhée, la levée est prescrite. Que faites-vous de la chambre ?",
            opts: [
              { t: "Retirer l'affiche et reprendre le bionettoyage quotidien habituel au détergent-désinfectant.", k: "risk", fb: "Les spores persistent longtemps sur les surfaces et résistent aux produits non sporicides. Sans bionettoyage sporicide de fin d'épisode, la chambre reste un réservoir." },
              { t: "Bionettoyage complet de la chambre et du matériel avec un produit sporicide, puis retrait de la signalétique (porte, dossier, planning) et information de l'équipe.", k: "ok", fb: "Oui. La levée comprend un bionettoyage sporicide des surfaces et du matériel, le retrait de la signalétique et la transmission à l'équipe. Si la diarrhée reprend, les précautions sont remises sans délai." },
              { t: "Laisser la chambre vide 72 heures avant de la réutiliser.", k: "excess", fb: "Le temps ne remplace pas le bionettoyage sporicide. Bloquer la chambre ne réduit pas la contamination des surfaces." }
            ] }
        ],
        rule: { title: "Lever les précautions C. difficile", points: ["Critère clinique : 48 heures (48 à 72 heures selon protocole) après la disparition de la diarrhée.", "Indépendant de la durée du traitement antibiotique.", "Pas de contrôle microbiologique de guérison.", "Bionettoyage sporicide de la chambre et du matériel, puis retrait de la signalétique.", "Remise en place immédiate si la diarrhée reprend (récidive)."] },
        src: ["hyg_cdi", "cpias_cdi", "sf2h_pcc"]
      },
      {
        title: "M. Roussel, 84 ans", germ: "Grippe A", family: "resp", unit: "Court séjour gériatrique",
        facts: ["Grippe A confirmée par PCR", "Précautions complémentaires respiratoires en chambre individuelle", "Non immunodéprimé"],
        timeline: [["Lundi", "Début des symptômes (fièvre, toux) : jour 1"], ["Mercredi", "Hospitalisation, PCR positive"], ["Vendredi", "Jour 5. Apyrétique depuis 48 heures"]],
        decisions: [
          { q: "Vendredi (jour 5). Un patient attend aux urgences. Le bed manager propose d'installer M. Roussel en chambre double avec un autre patient pour libérer un lit. Votre position ?",
            opts: [
              { t: "Accepter : il est apyrétique depuis 48 heures.", k: "risk", fb: "L'apyrexie ne marque pas la fin de la contagiosité. Le voisin, âgé, serait exposé à une grippe en pleine période d'excrétion." },
              { t: "Refuser : précautions respiratoires maintenues jusqu'au 7e jour inclus après le début des symptômes.", k: "ok", fb: "Oui. Pour la grippe, le repère SF2H 2024 est le 7e jour inclus après le début des symptômes. Le jour de début des signes doit figurer dans le dossier." },
              { t: "Refuser tant qu'une PCR de contrôle n'est pas négative.", k: "excess", fb: "La levée ne repose pas sur une PCR de contrôle mais sur le délai depuis le début des symptômes. La PCR peut rester positive au-delà de la contagiosité." }
            ] },
          { q: "Mardi suivant (jour 8). Qui lève les précautions, et comment ?",
            opts: [
              { t: "L'aide-soignant retire l'affiche le matin puisque le délai est passé.", k: "off", fb: "Le délai est atteint, mais la levée doit être confirmée par une prescription médicale et la signalétique retirée partout où elle figure. Sans trace, l'équipe de nuit ou le plateau technique ne sauront pas." },
              { t: "Levée confirmée par prescription médicale, retrait de la signalétique (porte, dossier de soins, planning, demandes d'examens), information du patient et de l'équipe.", k: "ok", fb: "Oui. La SF2H recommande que la mise en œuvre comme l'interruption des précautions soient prescrites et signalées sur tous les supports." },
              { t: "Attendre un avis écrit de l'EOH pour chaque levée de grippe.", k: "excess", fb: "Pour une grippe simple chez un patient non immunodéprimé, le critère est standard. Exiger un avis EOH systématique retarde la levée sans gain de sécurité." }
            ] },
          { q: "Dans la chambre voisine, Mme Thomas, sous chimiothérapie, a aussi une grippe. Au jour 8, elle reste fébrile et tousse beaucoup. Que proposez-vous ?",
            opts: [
              { t: "Lever comme pour M. Roussel : le 7e jour est passé.", k: "risk", fb: "Chez l'immunodéprimé, l'excrétion virale peut être prolongée. Appliquer mécaniquement le délai standard expose les autres patients." },
              { t: "Prolonger les précautions et demander une réévaluation au cas par cas par l'EOH et les cliniciens.", k: "ok", fb: "Oui. La SF2H prévoit une prolongation possible chez l'immunodéprimé, avec réévaluation par l'équipe de prévention et les cliniciens." },
              { t: "Maintenir systématiquement jusqu'à sa sortie d'hospitalisation.", k: "excess", fb: "La prolongation n'est pas automatique jusqu'à la sortie : elle se réévalue régulièrement selon l'évolution clinique." }
            ] }
        ],
        rule: { title: "Lever les précautions grippe", points: ["Jusqu'au 7e jour inclus après le début des symptômes.", "Le jour de début des signes doit être tracé dès l'admission.", "Pas de PCR de contrôle pour lever.", "Prolongation possible chez l'immunodéprimé, avec réévaluation EOH et cliniciens.", "Levée prescrite et signalétique retirée sur tous les supports (R18)."] },
        src: ["sf2h_resp"]
      },
      {
        title: "Léa, 19 ans", germ: "Rougeole", family: "resp", unit: "Médecine adulte",
        facts: ["Rougeole confirmée, non vaccinée", "Précautions complémentaires respiratoires renforcées (APR FFP2 pour les soignants)", "Déclaration obligatoire faite"],
        timeline: [["Samedi", "Début de l'éruption : J0"], ["Mardi", "J3 après le début de l'éruption, fièvre en baisse"], ["Jeudi", "J5"]],
        decisions: [
          { q: "Mardi (J3 de l'éruption). Léa va mieux et veut descendre à la cafétéria du hall. Que lui répondez-vous ?",
            opts: [
              { t: "D'accord, avec un masque chirurgical.", k: "risk", fb: "Elle est encore contagieuse. La rougeole est très transmissible par voie aérienne : une sortie dans un hall fréquenté expose des personnes non immunisées." },
              { t: "Non : les précautions sont maintenues jusqu'à 5 jours après le début de l'éruption. Expliquer la raison et la date de levée prévue.", k: "ok", fb: "Oui. Le repère est de 5 jours après le début de l'éruption. Donner la date prévue aide la patiente à accepter la mesure." },
              { t: "Non : elle restera en chambre jusqu'à disparition complète de l'éruption.", k: "excess", fb: "L'éruption peut persister au-delà de la période de contagiosité. Le critère est le délai depuis son début, pas sa disparition." }
            ] },
          { q: "Mercredi (J4), Léa est transférée dans un autre établissement, encore contagieuse. Sa chambre doit accueillir un patient greffé. Que faites-vous avant de l'installer ?",
            opts: [
              { t: "Bionettoyage habituel puis installation immédiate.", k: "risk", fb: "Le virus peut rester en suspension dans l'air de la chambre. Il faut d'abord aérer ou attendre." },
              { t: "Aérer au moins 10 minutes ; si l'aération ou le traitement d'air sont insuffisants, attendre 2 heures avant réutilisation, puis bionettoyage habituel.", k: "ok", fb: "Oui. C'est la consigne SF2H pour la rougeole après le départ du patient." },
              { t: "Condamner la chambre 24 heures et demander une désinfection des surfaces par voie aérienne.", k: "excess", fb: "Mesure disproportionnée. L'aération (ou 2 heures d'attente) suivie d'un bionettoyage habituel suffit." }
            ] },
          { q: "Pour ce transfert, que transmettez-vous au service d'accueil et au transporteur ?",
            opts: [
              { t: "Rien de particulier : elle sera presque guérie à l'arrivée.", k: "risk", fb: "L'établissement d'accueil et l'équipe de transport doivent connaître les précautions en cours pour protéger leurs personnels et patients." },
              { t: "Le diagnostic, les précautions respiratoires en cours et la date de levée prévue (5 jours après le début de l'éruption, soit jeudi).", k: "ok", fb: "Oui. Une transmission précise évite à la fois l'exposition et le maintien inutile des mesures dans le service d'aval." },
              { t: "Demander au service d'accueil de maintenir l'isolement 2 semaines par sécurité.", k: "excess", fb: "Deux semaines correspondent au repère de la rubéole, pas de la rougeole. Ce maintien serait injustifié." }
            ] }
        ],
        rule: { title: "Lever les précautions rougeole", points: ["5 jours après le début de l'éruption.", "Après le départ d'un patient contagieux : aérer au moins 10 minutes, ou attendre 2 heures si l'aération est impossible.", "Transmettre au service d'aval et au transport le statut et la date de levée prévue.", "Ne pas confondre avec la rubéole (2 semaines après l'éruption)."] },
        src: ["sf2h_resp"]
      },
      {
        title: "M. Bertin, 66 ans", germ: "SARM", family: "contact", unit: "Chirurgie orthopédique puis SMR",
        facts: ["Portage nasal de SARM découvert à l'admission", "Précautions complémentaires contact", "Prothèse de hanche posée à J2"],
        timeline: [["J0", "Dépistage nasal positif à SARM"], ["J6", "Un écouvillon nasal de contrôle revient négatif"], ["J8", "Transfert prévu en SMR"]],
        decisions: [
          { q: "J6. Le dépistage nasal de contrôle est négatif. M. Bertin demande qu'on retire « l'étiquette ». Que décidez-vous avec le médecin ?",
            opts: [
              { t: "Lever les précautions contact : il n'est plus porteur.", k: "risk", fb: "Un prélèvement négatif isolé ne prouve pas la fin du portage. Le portage de SARM est souvent intermittent ou présent sur d'autres sites." },
              { t: "Maintenir les précautions contact pendant tout le séjour en MCO.", k: "ok", fb: "Oui. La SF2H recommande fortement de maintenir les précautions contact tout au long du séjour en MCO. Une levée n'est envisageable qu'après une décontamination dont l'efficacité est démontrée (par exemple au moins deux prélèvements négatifs successifs)." },
              { t: "Lever s'il n'a pas de plaie ouverte.", k: "risk", fb: "L'absence de plaie ne supprime pas le portage nasal ni la transmission manuportée." }
            ] },
          { q: "J8, transfert en SMR. Que transmettez-vous ?",
            opts: [
              { t: "Rien : le SMR fera son propre dépistage à l'entrée.", k: "risk", fb: "Le service d'accueil doit être informé avant l'arrivée pour préparer la chambre et les mesures. Attendre son dépistage laisse une fenêtre de transmission." },
              { t: "Informer le SMR et le transporteur du portage de SARM et des précautions contact en cours.", k: "ok", fb: "Oui. L'information systématique des services d'accueil et des plateaux techniques lors d'un transfert est fortement recommandée." },
              { t: "Demander au SMR de ne l'accepter qu'après une décolonisation complète.", k: "excess", fb: "Le portage d'une BMR ne doit pas retarder le parcours de soins. Les précautions contact permettent un transfert sûr." }
            ] },
          { q: "En SMR, après décontamination, deux prélèvements successifs sont négatifs. Le kiné veut l'emmener sur le plateau de rééducation. Que proposez-vous ?",
            opts: [
              { t: "Lever les précautions contact selon le protocole local, après plusieurs dépistages négatifs (au moins deux pour le SARM).", k: "ok", fb: "Oui. En SSR-SLD, la SF2H recommande de ne lever les précautions qu'après plusieurs dépistages négatifs, par exemple au moins deux pour le SARM. C'est le cas ici." },
              { t: "Maintenir jusqu'à sa sortie et lui interdire le plateau technique.", k: "excess", fb: "Double erreur : les critères de levée sont réunis, et même sous précautions contact la rééducation doit être organisée, pas supprimée." },
              { t: "Lever, mais seulement s'il porte un masque sur le plateau.", k: "off", fb: "Le masque n'est pas le critère. Si les conditions de levée sont réunies, on applique les précautions standard." }
            ] }
        ],
        rule: { title: "Lever les précautions contact BMR (SARM, EBLSE)", points: ["En MCO : maintien tout au long du séjour (R117).", "Si décontamination : levée seulement après preuve d'efficacité (par exemple deux prélèvements négatifs successifs pour le SARM).", "En SSR-SLD : levée après plusieurs dépistages négatifs (R118).", "Informer systématiquement le service d'aval et le transport (R105).", "Les précautions ne doivent pas priver le patient de rééducation."] },
        src: ["sf2h_pcc"]
      },
      {
        title: "M. Kaci, 45 ans", germ: "Varicelle", family: "mixte", unit: "Maladies infectieuses",
        facts: ["Varicelle de l'adulte, pneumopathie varicelleuse modérée", "Précautions respiratoires et contact", "Immunocompétent"],
        timeline: [["J0", "Apparition des premières vésicules"], ["J5", "Lésions majoritairement croûteuses, quelques vésicules au dos"], ["J7", "Toutes les lésions sont sèches et croûteuses"]],
        decisions: [
          { q: "J5. La plupart des lésions sont croûteuses, mais quelques vésicules persistent sur le dos. Que faites-vous ?",
            opts: [
              { t: "Lever les précautions : la majorité des lésions est sèche.", k: "risk", fb: "Tant qu'une vésicule persiste, le liquide vésiculaire reste contaminant. Le critère est l'assèchement de toutes les lésions." },
              { t: "Maintenir les précautions respiratoires et contact jusqu'à l'assèchement de toutes les croûtes.", k: "ok", fb: "Oui. Pour la varicelle, les précautions respiratoires et contact sont maintenues jusqu'à l'assèchement des croûtes." },
              { t: "Lever les précautions respiratoires et garder seulement les précautions contact.", k: "risk", fb: "Tant que des vésicules persistent, la transmission par voie respiratoire reste possible : les deux volets sont maintenus." }
            ] },
          { q: "J7 : toutes les lésions sont sèches et croûteuses. Que décidez-vous ?",
            opts: [
              { t: "Lever les précautions, sur prescription, et retirer la signalétique.", k: "ok", fb: "Oui. Le critère est atteint : la levée est prescrite, tracée et la signalétique retirée." },
              { t: "Attendre la chute des croûtes.", k: "excess", fb: "Les croûtes sèches ne sont plus contagieuses. Attendre leur chute ajoute plusieurs jours de contraintes inutiles." },
              { t: "Attendre une PCR VZV négative sur une lésion.", k: "excess", fb: "La levée ne repose pas sur un test : l'ADN viral peut persister sur une lésion croûteuse non contagieuse." }
            ] },
          { q: "Variante : même tableau chez un patient sous chimiothérapie, chez qui de nouvelles vésicules apparaissent encore à J8. Que faites-vous ?",
            opts: [
              { t: "Lever à J7 comme pour un patient immunocompétent.", k: "risk", fb: "Chez l'immunodéprimé, l'éruption peut durer plus longtemps. La levée suit l'état des lésions, pas un nombre de jours." },
              { t: "Maintenir tant que toutes les lésions ne sont pas sèches et réévaluer avec l'EOH et les cliniciens.", k: "ok", fb: "Oui. La durée peut être prolongée chez l'immunodéprimé, avec réévaluation au cas par cas." },
              { t: "Maintenir jusqu'à la fin de l'hospitalisation, quelle que soit l'évolution.", k: "excess", fb: "Le critère reste l'assèchement des croûtes. Une fois atteint, les précautions peuvent être levées." }
            ] }
        ],
        rule: { title: "Lever les précautions varicelle", points: ["Précautions respiratoires et contact jusqu'à l'assèchement de toutes les croûtes.", "Pas de test de contrôle : critère clinique.", "Chez l'immunodéprimé, durée souvent prolongée, réévaluation au cas par cas.", "Le zona disséminé chez l'immunodéprimé suit les mêmes règles."] },
        src: ["sf2h_resp"]
      }
    ]
  },
  {
    id: 2, code: "M2", title: "La prescription de levée", audience: "Médecins et internes",
    intro: "La levée des précautions est un acte médical tracé. Vous êtes l'interne ou le senior qui signe, ou refuse de signer.",
    dossiers: [
      {
        title: "M. Dubois, 52 ans", germ: "Tuberculose pulmonaire sensible", family: "resp", unit: "Pneumologie",
        facts: ["Examen microscopique des crachats positif, faible charge", "PCR sans mutation de résistance à la rifampicine", "Pas d'excavation à l'imagerie, primo-traitement par quadrithérapie débuté à J0"],
        timeline: [["J0", "Début du traitement antituberculeux, précautions respiratoires renforcées"], ["J10", "Toux nettement diminuée"], ["J14", "Bonne observance et bonne tolérance, imagerie stable"]],
        decisions: [
          { q: "J10. La toux a beaucoup diminué et le patient demande à pouvoir circuler dans le service. Que prescrivez-vous ?",
            opts: [
              { t: "Lever les précautions : l'amélioration clinique est nette.", k: "risk", fb: "Trop tôt. Le minimum est de 14 jours de traitement efficace pour une tuberculose contagieuse, même si la toux diminue." },
              { t: "Maintenir les précautions respiratoires renforcées au minimum jusqu'à J14 révolu.", k: "ok", fb: "Oui. Durée minimale de 14 jours à partir de la mise en route d'un traitement efficace (SF2H 2024, R25)." },
              { t: "Maintenir jusqu'à la négativation des cultures.", k: "excess", fb: "La négativation des cultures prend plusieurs semaines. Elle n'est exigée que pour les tuberculoses multirésistantes, pas pour une souche sensible." }
            ] },
          { q: "J14. Souche sensible, bonne observance et tolérance, toux diminuée, pas d'excavation, imagerie stable, pas de contact avec des personnes vulnérables. L'externe propose trois nouveaux crachats avant de lever. Votre décision ?",
            opts: [
              { t: "Prélever trois crachats et lever seulement si l'examen microscopique est négatif.", k: "excess", fb: "Toutes les conditions de l'algorithme sont réunies : la levée se fait à J14 révolu sans examen microbiologique supplémentaire. L'examen peut rester positif avec des bacilles non viables." },
              { t: "Prescrire la levée à J14 révolu, sans examen microbiologique supplémentaire.", k: "ok", fb: "Oui. C'est l'algorithme SF2H 2024 lorsque toutes les conditions sont remplies." },
              { t: "Maintenir jusqu'à J30 par précaution.", k: "excess", fb: "La prolongation à 30 jours concerne les excavations, les lésions étendues ou une charge bacillaire initiale élevée. Ce n'est pas le cas ici." }
            ] },
          { q: "J16, après levée. Faute de lit, le bed manager propose de l'installer en chambre double avec un patient traité par anti-TNF. Votre position ?",
            opts: [
              { t: "Accepter : les précautions sont levées, il n'est plus contagieux.", k: "risk", fb: "Après levée, la SF2H recommande quand même d'éviter la chambre double avec un patient vulnérable, a fortiori immunodéprimé, en cas d'hospitalisation prolongée." },
              { t: "Refuser la chambre double avec ce patient vulnérable et chercher une autre solution d'hébergement.", k: "ok", fb: "Oui. Lever les précautions ne signifie pas qu'on peut exposer un immunodéprimé (anti-TNF, transplanté, personne vivant avec le VIH) en chambre double." },
              { t: "Remettre les précautions respiratoires renforcées jusqu'à la sortie.", k: "excess", fb: "Inutile pour ce patient : le problème est l'hébergement du voisin vulnérable, pas la reprise des précautions." }
            ] }
        ],
        rule: { title: "Tuberculose sensible : levée à J14", points: ["Minimum 14 jours de traitement efficace.", "À J14, levée sans nouvel examen si : souche sensible, observance et tolérance correctes, amélioration clinique, pas d'excavation ni d'aggravation de l'imagerie, pas de contact avec des personnes vulnérables.", "Si une condition manque : maintien et réévaluation entre J15 et J30.", "Même après levée : pas de chambre double avec un patient immunodéprimé."] },
        src: ["sf2h_resp", "splf_tb"]
      },
      {
        title: "Mme Arnaud, 34 ans", germ: "Tuberculose excavée", family: "resp", unit: "Maladies infectieuses",
        facts: ["Examen microscopique fortement positif", "Excavations bilatérales et lésions étendues", "Traitement de première ligne débuté à J0"],
        timeline: [["J0", "Début du traitement, précautions respiratoires renforcées"], ["J14", "Toux moins fréquente, bonne observance"], ["J18", "Antibiogramme phénotypique reçu"]],
        decisions: [
          { q: "J14. La toux diminue et l'observance est bonne. Le service souhaite lever pour libérer la chambre à pression adaptée. Que décidez-vous ?",
            opts: [
              { t: "Lever à J14, comme pour toute tuberculose traitée.", k: "risk", fb: "Les excavations, les lésions étendues et la forte charge bacillaire initiale font partie des conditions non remplies : la levée à J14 n'est pas possible." },
              { t: "Maintenir et réévaluer régulièrement entre J15 et J30 ; levée après J15 selon l'évolution (jusqu'à 30 jours).", k: "ok", fb: "Oui. La durée est portée jusqu'à 30 jours en présence d'excavation, de charge bacillaire élevée ou de lésions étendues, avec réévaluation régulière." },
              { t: "Maintenir jusqu'à la fin de l'hospitalisation, quelle qu'en soit la durée.", k: "excess", fb: "Pour une souche sensible, la durée est encadrée (réévaluation entre J15 et J30). Le maintien indéfini n'est indiqué que pour les formes multirésistantes." }
            ] },
          { q: "J18. L'antibiogramme montre une résistance à la rifampicine et à l'isoniazide (tuberculose MDR). Que changez-vous ?",
            opts: [
              { t: "Rien : on garde le plan de réévaluation entre J15 et J30.", k: "risk", fb: "La multirésistance change tout : le traitement initial n'était pas efficace et la durée de contagiosité est prolongée." },
              { t: "Passer en précautions respiratoires maximales, maintenues toute l'hospitalisation ou au minimum jusqu'à la négativation des cultures, et solliciter l'EOH et un centre de référence.", k: "ok", fb: "Oui. Pour les tuberculoses MDR ou XDR, le HCSP recommande des précautions maximales pendant toute l'hospitalisation, ou au minimum jusqu'à négativation des cultures." },
              { t: "Lever si le prochain examen microscopique est négatif.", k: "risk", fb: "Un examen microscopique négatif ne suffit pas dans une forme MDR : la levée repose sur la culture." }
            ] },
          { q: "Plus tard, pour documenter la négativation, quels prélèvements prescrivez-vous ?",
            opts: [
              { t: "Un seul crachat avec examen microscopique.", k: "risk", fb: "Un prélèvement isolé, sans culture, ne permet pas de documenter la négativation d'une tuberculose MDR." },
              { t: "Des séries de trois échantillons respiratoires recueillis sur trois jours distincts, avec culture, selon l'algorithme SF2H et les avis HCSP.", k: "ok", fb: "Oui. L'algorithme SF2H 2024 prévoit trois échantillons respiratoires sur trois jours distincts ; la levée intervient sur culture négative." },
              { t: "Attendre la fin du traitement (18 à 24 mois) sans prélèvement intermédiaire.", k: "excess", fb: "La levée n'est pas liée à la fin du traitement. Les prélèvements de suivi permettent de décider dès que les cultures se négativent." }
            ] }
        ],
        rule: { title: "Tuberculose : quand la durée s'allonge", points: ["Excavation, charge bacillaire élevée, lésions étendues : réévaluation entre J15 et J30, jusqu'à 30 jours.", "MDR ou XDR suspectée ou confirmée : précautions maximales.", "MDR : maintien pendant toute l'hospitalisation ou au minimum jusqu'à négativation de la culture.", "Négativation documentée par trois échantillons respiratoires sur trois jours distincts, en culture."] },
        src: ["sf2h_resp", "splf_tb"]
      },
      {
        title: "M. Garnier, 61 ans", germ: "COVID-19 chez un greffé rénal", family: "resp", unit: "Néphrologie",
        facts: ["Greffe rénale il y a 2 ans, immunosuppresseurs", "COVID-19 symptomatique, forme non grave", "Précautions complémentaires respiratoires"],
        timeline: [["J0", "Début des symptômes"], ["J5", "Apyrexie"], ["J8", "Aujourd'hui. PCR de contrôle à Ct élevé (33)"]],
        decisions: [
          { q: "J8. Apyrétique depuis 3 jours, Ct à 33. L'interne veut lever les précautions. Votre décision ?",
            opts: [
              { t: "Lever : le Ct élevé montre qu'il n'est plus contagieux.", k: "risk", fb: "Les critères de levée reposent sur la clinique et le délai depuis les symptômes, pas sur une charge virale. Chez l'immunodéprimé, l'excrétion peut être prolongée." },
              { t: "Maintenir : 24 jours en cas d'immunodépression, avec réévaluation au cas par cas.", k: "ok", fb: "Oui. Le guide SF2H 2024, confirmé par l'avis d'octobre 2025, fixe 24 jours en cas d'immunodépression ou de forme grave symptomatique." },
              { t: "Lever à J14 comme pour un patient non immunodéprimé.", k: "risk", fb: "Le délai de 14 jours concerne les patients non immunodéprimés. Ici, le repère est de 24 jours." }
            ] },
          { q: "En staff, un collègue propose d'aligner la COVID-19 sur la grippe (7 jours) pour fluidifier les lits. Que répondez-vous ?",
            opts: [
              { t: "D'accord : c'est désormais un virus respiratoire comme les autres.", k: "risk", fb: "La SF2H a examiné précisément cette question en octobre 2025 et a conclu qu'aucune donnée nouvelle ne justifie de réduire les durées." },
              { t: "Non : l'avis SF2H du 6 octobre 2025 maintient les délais du guide 2024 (10, 14 ou 24 jours selon la situation).", k: "ok", fb: "Oui. L'excrétion virale semble plus longue avec Omicron qu'avec la grippe, et des contaminations restent possibles jusqu'à 10 jours." },
              { t: "Non, et on attendra désormais une PCR négative pour chaque patient.", k: "excess", fb: "La PCR peut rester positive longtemps après la contagiosité. Ce critère prolongerait les précautions sans justification." }
            ] },
          { q: "Son voisin de couloir, 40 ans, non immunodéprimé, symptomatique, est à J14 et apyrétique depuis 72 heures. Que prescrivez-vous ?",
            opts: [
              { t: "Lever les précautions et retirer la signalétique.", k: "ok", fb: "Oui. Patient non immunodéprimé symptomatique : 14 jours dont 2 jours sans fièvre. Les deux conditions sont remplies." },
              { t: "Maintenir jusqu'à une PCR négative.", k: "excess", fb: "Inutile. La décision repose sur le délai et l'apyrexie." },
              { t: "Maintenir jusqu'à J24 par cohérence avec le greffé.", k: "excess", fb: "Le délai de 24 jours concerne l'immunodépression ou les formes graves. Ce patient relève de 14 jours." }
            ] }
        ],
        rule: { title: "Lever les précautions COVID-19", points: ["Non immunodéprimé symptomatique : 14 jours, dont 2 jours sans fièvre.", "Non immunodéprimé asymptomatique : 10 jours.", "Immunodépression ou forme grave : 24 jours.", "Critères cliniques et de délai, pas de charge virale ni de PCR de contrôle.", "Pas d'alignement sur la grippe : avis SF2H du 6 octobre 2025."] },
        src: ["sf2h_resp", "sf2h_covid25"]
      },
      {
        title: "Tom, 17 ans", germ: "Infection invasive à méningocoque", family: "resp", unit: "Réanimation",
        facts: ["Méningite à méningocoque", "Précautions complémentaires respiratoires", "Signalement à l'ARS fait sans délai"],
        timeline: [["H0", "Première dose de ceftriaxone"], ["H12", "Aujourd'hui. État stabilisé"], ["H24", "Fin de la période de contagiosité attendue"]],
        decisions: [
          { q: "H12 après la première dose de ceftriaxone. L'équipe voudrait lever pour faciliter les soins. Votre décision ?",
            opts: [
              { t: "Lever : le traitement est efficace.", k: "risk", fb: "Trop tôt. Le repère est de 24 heures après le début d'un traitement antibiotique actif sur le portage nasopharyngé." },
              { t: "Maintenir jusqu'à 24 heures après le début de la ceftriaxone, puis prescrire la levée.", k: "ok", fb: "Oui. La ceftriaxone a une action démontrée sur le portage rhinopharyngé : la levée est possible 24 heures après son début." },
              { t: "Maintenir jusqu'à la fin des 7 jours de traitement.", k: "excess", fb: "La contagiosité cesse bien avant la fin du traitement curatif. Prolonger les précautions n'apporte rien." }
            ] },
          { q: "Dans un autre hôpital, un patient similaire a été traité par un antibiotique sans action reconnue sur le portage rhinopharyngé. Peut-on lever à H24 ?",
            opts: [
              { t: "Oui, 24 heures de n'importe quel antibiotique efficace sur la méningite suffisent.", k: "risk", fb: "Le critère précise un traitement actif sur le portage nasopharyngé. Sans cela, le patient peut rester porteur." },
              { t: "Non : administrer un traitement d'éradication du portage dès que l'état le permet ; la levée se fait 24 heures après le début d'un traitement actif sur le portage.", k: "ok", fb: "Oui. L'instruction DGS 2018 prévoit un traitement d'éradication du portage pour le cas index non traité par ceftriaxone." },
              { t: "Non : maintenir jusqu'à un écouvillon pharyngé négatif.", k: "excess", fb: "La levée ne repose pas sur un écouvillon de contrôle." }
            ] },
          { q: "Quels soignants relèvent d'une antibioprophylaxie ?",
            opts: [
              { t: "Toute l'équipe ayant pris en charge Tom.", k: "excess", fb: "En milieu de soins, l'antibioprophylaxie est réservée aux contacts très exposants. L'élargir expose à des effets indésirables et à la sélection de résistances." },
              { t: "Ceux exposés directement aux sécrétions (bouche-à-bouche, intubation, aspiration) sans masque, avant la première dose d'un antibiotique actif sur le portage.", k: "ok", fb: "Oui. C'est la définition retenue par l'instruction DGS 2018 et l'INRS. Elle se donne si possible dans les 24 à 48 heures, et n'a plus d'intérêt au-delà de 10 jours." },
              { t: "Aucun : les soignants ne sont jamais concernés.", k: "risk", fb: "Faux. Les soignants ayant eu des contacts très exposants sans masque relèvent d'une antibioprophylaxie." }
            ] }
        ],
        rule: { title: "Lever les précautions méningocoque", points: ["24 heures après le début d'un antibiotique actif sur le portage nasopharyngé (ceftriaxone).", "Si le traitement initial n'éradique pas le portage : traitement d'éradication, puis levée 24 heures après son début.", "Pas d'écouvillon de contrôle.", "Antibioprophylaxie des soignants : seulement les contacts très exposants sans masque, avant le traitement actif."] },
        src: ["sf2h_resp", "dgs_iim", "inrs_iim"]
      },
      {
        title: "Mme Perrin, 29 ans", germ: "Coqueluche en maternité", family: "resp", unit: "Suites de couches",
        facts: ["Toux depuis 8 jours, PCR coqueluche positive", "Nouveau-né en chambre", "Précautions complémentaires respiratoires"],
        timeline: [["J0", "Azithromycine débutée"], ["J2", "Aujourd'hui"], ["J3", "Fin attendue de la contagiosité sous azithromycine"]],
        decisions: [
          { q: "J2 de l'azithromycine. La mère demande à ne plus porter de masque auprès de son bébé. Votre réponse ?",
            opts: [
              { t: "D'accord : le traitement est commencé.", k: "risk", fb: "Le nouveau-né est le plus exposé aux formes graves. Le repère sous azithromycine est de 3 jours de traitement." },
              { t: "Maintenir les précautions jusqu'à 3 jours révolus d'azithromycine.", k: "ok", fb: "Oui. 3 jours si azithromycine (SF2H 2024, HCSP)." },
              { t: "Maintenir 5 jours, quel que soit l'antibiotique.", k: "excess", fb: "Le délai de 5 jours concerne la clarithromycine et les autres antibiotiques. Sous azithromycine, 3 jours suffisent." }
            ] },
          { q: "Une autre patiente est traitée par clarithromycine. Quand levez-vous ?",
            opts: [
              { t: "Après 3 jours.", k: "risk", fb: "Ce délai est propre à l'azithromycine." },
              { t: "Après 5 jours de clarithromycine.", k: "ok", fb: "Oui. 5 jours de traitement efficace pour la clarithromycine." },
              { t: "Après 21 jours.", k: "excess", fb: "21 jours correspondent à la contagiosité en l'absence de traitement." }
            ] },
          { q: "Une grand-mère hospitalisée tousse depuis 4 semaines ; la PCR revient positive. Aucun antibiotique n'a été donné. Faut-il des précautions ?",
            opts: [
              { t: "Oui, 5 jours après le début d'un antibiotique.", k: "excess", fb: "Au-delà de 21 jours d'évolution, la transmission est considérée comme nulle, y compris en présence d'une toux séquellaire." },
              { t: "Non : après 21 jours d'évolution clinique, les mesures ne sont plus nécessaires. Rechercher plutôt un cas secondaire récent dans l'entourage.", k: "ok", fb: "Oui. Le HCSP (2024) précise que les mesures peuvent être levées après 21 jours d'évolution. Le cas utile est souvent celui qui l'a contaminée, ou contaminé d'autres personnes." },
              { t: "Oui, jusqu'à disparition de la toux.", k: "excess", fb: "La toux séquellaire peut durer des semaines sans contagiosité." }
            ] }
        ],
        rule: { title: "Lever les précautions coqueluche", points: ["3 jours après le début de l'azithromycine.", "5 jours avec la clarithromycine ou un autre antibiotique efficace.", "Sans traitement : 21 jours après le début des signes ; au-delà, transmission nulle même si la toux persiste.", "Vigilance maximale autour des nouveau-nés et nourrissons non protégés."] },
        src: ["sf2h_resp", "hcsp_coq24", "hcsp_coq14"]
      }
    ]
  },
  {
    id: 3, code: "M3", title: "Décider en équipe", audience: "Cadres, EOH et CLIN",
    intro: "Certaines levées engagent l'unité ou l'établissement : BHRe, revues d'isolement, procédures. Vous êtes cadre, praticien hygiéniste ou membre du CLIN.",
    dossiers: [
      {
        title: "M. Hamel, 70 ans", germ: "EPC OXA-48, porteur connu", family: "bhre", unit: "Cardiologie",
        facts: ["Porteur connu d'EPC OXA-48 depuis 8 mois (rapatriement sanitaire)", "Réadmission programmée", "Inscrit sur la liste de repérage de l'établissement"],
        timeline: [["M-8", "Écouvillon rectal positif à EPC"], ["J0", "Réadmission, dépistage rectal négatif (culture et PCR)"], ["J4", "Pneumopathie, antibiothérapie débutée"]],
        decisions: [
          { q: "J0. Le dépistage rectal d'admission est négatif. Le cardiologue demande la levée des précautions contact. Votre avis ?",
            opts: [
              { t: "Lever : il n'est plus porteur.", k: "risk", fb: "Un dépistage négatif ne fait pas de lui un non-porteur. Il reste porteur connu, dit non excréteur, et l'excrétion peut réapparaître, notamment sous antibiotiques." },
              { t: "Maintenir les précautions contact : il reste classé porteur (non excréteur), avec dépistages hebdomadaires.", k: "ok", fb: "Oui. Le HCSP distingue porteur excréteur et porteur non excréteur : ce dernier reste porteur, en précautions contact, et dépisté chaque semaine." },
              { t: "Le placer en secteur dédié avec personnel dédié.", k: "excess", fb: "Les mesures les plus lourdes visent les porteurs excréteurs et les situations épidémiques. Pour un non-excréteur, chambre individuelle et précautions contact suffisent." }
            ] },
          { q: "J4. Une antibiothérapie est débutée pour une pneumopathie. Que faites-vous ?",
            opts: [
              { t: "Rien de particulier : les dépistages précédents sont négatifs.", k: "off", fb: "L'antibiothérapie favorise la réapparition de l'excrétion. Elle doit déclencher une action." },
              { t: "Solliciter le référent antibiotique (pertinence, molécule, durée), informer l'EOH et renouveler le dépistage.", k: "ok", fb: "Oui. C'est la conduite recommandée lorsqu'un porteur de BHRe reçoit des antibiotiques." },
              { t: "Arrêter les dépistages, inutiles sous antibiotiques.", k: "risk", fb: "C'est précisément sous antibiotiques qu'il faut redépister. Une levée décidée sur des dépistages réalisés sous antibiothérapie doit être collégiale avec l'EOH." }
            ] },
          { q: "Le CLIN se demande quand M. Hamel pourra sortir de la liste de repérage. Quel critère retenez-vous ?",
            opts: [
              { t: "Après trois dépistages négatifs consécutifs.", k: "risk", fb: "Trois dépistages hebdomadaires négatifs concernent les patients contact, pas un porteur avéré." },
              { t: "Le considérer décolonisé si, sur au moins un an après le dernier prélèvement positif, au moins 5 dépistages successifs (ou 3 dont au moins un test moléculaire), à au moins une semaine d'intervalle, sont négatifs.", k: "ok", fb: "Oui. C'est le critère de décolonisation des recommandations HCSP 2019. La décision reste prudente : la décolonisation réelle n'est pas formellement démontrée." },
              { t: "Jamais : un porteur de BHRe reste sur la liste à vie.", k: "excess", fb: "Le HCSP prévoit un critère de retrait des listes. Le maintien à vie pénalise inutilement le parcours du patient." }
            ] }
        ],
        rule: { title: "BHRe : le porteur", points: ["Un dépistage négatif ne lève pas le statut : porteur non excréteur, toujours en précautions contact.", "Dépistages hebdomadaires ; redépister dès qu'une antibiothérapie débute.", "Levée sur dépistages réalisés sous antibiotiques : décision collégiale avec l'EOH.", "Décolonisation : au moins un an, au moins 5 dépistages négatifs (ou 3 dont un moléculaire) à au moins une semaine d'intervalle."] },
        src: ["hcsp_bhre", "cpias_ge_bhre", "cpias_bzh_bhre", "instr_bhre"]
      },
      {
        title: "Unité de médecine B", germ: "Épidémie d'EPC, patients contact", family: "bhre", unit: "Médecine interne",
        facts: ["Un cas secondaire identifié : contacts à risque élevé", "9 patients contact en précautions contact, dépistés chaque semaine", "Cellule de crise réunie avec l'EOH"],
        timeline: [["S0", "Découverte du cas index puis d'un cas secondaire"], ["S3", "M. Colin : 3 dépistages hebdomadaires négatifs, épidémie non encore contrôlée"], ["S8", "Épidémie déclarée contrôlée"]],
        decisions: [
          { q: "S3. M. Colin, contact à risque élevé, a 3 dépistages hebdomadaires négatifs. Son état nécessite un transfert en SMR alors que l'épidémie n'est pas encore contrôlée. Que décidez-vous ?",
            opts: [
              { t: "Transférer sans mention particulière, en précautions standard.", k: "risk", fb: "Tant que l'épidémie n'est pas contrôlée, le contact reste à risque. Le service d'accueil doit être informé et appliquer des précautions contact." },
              { t: "Transférer si son état le nécessite, en chambre individuelle et précautions contact dans le service d'accueil informé, avec poursuite des dépistages hebdomadaires.", k: "ok", fb: "Oui. Après 3 dépistages négatifs, les contacts peuvent être transférés si leur état le nécessite, isolés en précautions contact avec poursuite des dépistages." },
              { t: "Refuser tout transfert jusqu'à la fin de l'épidémie.", k: "excess", fb: "Bloquer le parcours n'est pas recommandé lorsque les dépistages sont négatifs et que le service d'aval est informé." }
            ] },
          { q: "S8, épidémie contrôlée. Mme Faure, contact à risque élevé, a 3 écouvillonnages rectaux hebdomadaires négatifs réalisés hors exposition. Que décidez-vous ?",
            opts: [
              { t: "La garder sur la liste de suivi pendant 2 ans par sécurité.", k: "excess", fb: "Le recul de 2 ans concerne les contacts qui n'ont pas eu leurs 3 dépistages hors exposition." },
              { t: "Arrêter les dépistages et la retirer des listes de suivi.", k: "ok", fb: "Oui. Lorsque l'épidémie est contrôlée, un contact à risque élevé avec au moins 3 écouvillonnages négatifs successifs, à une semaine d'intervalle et hors exposition, peut être retiré des listes (R38)." },
              { t: "La retirer dès le premier dépistage négatif.", k: "risk", fb: "Un dépistage isolé est insuffisant pour un contact à risque élevé." }
            ] },
          { q: "M. Jourdain, contact à risque élevé, est rentré à domicile avant d'avoir eu ses 3 dépistages. Il est réhospitalisé 6 mois plus tard. Que faites-vous à l'admission ?",
            opts: [
              { t: "Précautions standard : il est sorti depuis longtemps.", k: "risk", fb: "Six mois ne suffisent pas. Sans ses 3 dépistages hors exposition, il reste un contact à risque élevé." },
              { t: "Précautions contact dès l'admission et dépistage.", k: "ok", fb: "Oui. Les contacts à risque élevé réhospitalisés sont placés en précautions contact et dépistés. Après 2 ans de recul, épidémie contrôlée, il pourrait être retiré des listes même sans ses 3 dépistages (R39)." },
              { t: "Chambre individuelle et équipe paramédicale dédiée pendant tout le séjour.", k: "excess", fb: "Le personnel dédié vise les porteurs excréteurs et les épidémies non contrôlées, pas un contact réadmis dont le statut n'est pas encore connu." }
            ] }
        ],
        rule: { title: "BHRe : les patients contact", points: ["Risque faible, moyen ou élevé selon la prise en charge initiale du porteur et l'existence d'un cas secondaire.", "Après 3 dépistages négatifs : transfert possible si nécessaire, en précautions contact, service d'aval informé.", "Épidémie contrôlée et 3 dépistages hebdomadaires négatifs hors exposition : retrait des listes (R38).", "Sans ces 3 dépistages : retrait possible après 2 ans de recul (R39) ; d'ici là, précautions contact et dépistage à chaque réadmission."] },
        src: ["hcsp_bhre", "cpias_bzh_bhre", "instr_bhre"]
      },
      {
        title: "Lundi, 8 h 30", germ: "Revue des chambres signalées", family: "revue", unit: "Médecine polyvalente, 24 lits",
        facts: ["Le tableau de l'unité affiche 3 chambres sous précautions", "Revue hebdomadaire menée par la cadre de santé et l'hygiéniste", "Objectif : vérifier chaque indication de maintien"],
        timeline: [["Ch. 4", "VRS, 80 ans, guérison clinique depuis hier"], ["Ch. 9", "Grippe, jour 9 depuis les symptômes, affiche toujours en place"], ["Ch. 12", "C. difficile, diarrhée persistante, vancomycine depuis 5 jours"]],
        decisions: [
          { q: "Chambre 4 : infection à VRS chez un patient de 80 ans, non immunodéprimé, cliniquement guéri depuis hier. Que proposez-vous ?",
            opts: [
              { t: "Lever les précautions, sur prescription.", k: "ok", fb: "Oui. Pour le VRS, la levée intervient à la guérison clinique (7 jours en général)." },
              { t: "Maintenir jusqu'au 14e jour par prudence chez un patient âgé.", k: "excess", fb: "Le grand âge seul ne prolonge pas la durée. La prolongation se discute pour l'immunodéprimé." },
              { t: "Maintenir jusqu'à une PCR de contrôle négative.", k: "excess", fb: "La levée ne repose pas sur une PCR de contrôle." }
            ] },
          { q: "Chambre 9 : grippe, jour 9 depuis le début des symptômes, patient non immunodéprimé. L'affiche est toujours là parce que « personne n'a prescrit la levée ». Que faites-vous ?",
            opts: [
              { t: "Laisser en place jusqu'à la sortie, ce sera plus simple.", k: "excess", fb: "C'est un isolement orphelin : le critère est dépassé depuis 2 jours. Ce maintien inutile prive le patient de soins et de circulation." },
              { t: "Demander la prescription de levée au médecin, retirer la signalétique sur tous les supports et informer l'équipe.", k: "ok", fb: "Oui. La revue d'unité sert précisément à repérer ces maintiens injustifiés et à les tracer correctement." },
              { t: "Retirer l'affiche vous-même, sans prescription.", k: "off", fb: "Le critère est atteint, mais la levée doit être prescrite et tracée (R18)." }
            ] },
          { q: "Chambre 12 : C. difficile, diarrhée toujours présente, vancomycine depuis 5 jours. Un collègue suggère de lever puisque « le traitement marche ». Votre position ?",
            opts: [
              { t: "Lever : 5 jours de traitement efficace suffisent.", k: "risk", fb: "Le critère n'est pas la durée de traitement mais l'arrêt de la diarrhée depuis 48 heures." },
              { t: "Maintenir jusqu'à 48 heures après la fin de la diarrhée.", k: "ok", fb: "Oui. Tant que la diarrhée persiste, le patient excrète massivement des spores." },
              { t: "Maintenir jusqu'à la fin du séjour, quelle que soit l'évolution.", k: "excess", fb: "Certains établissements le font en situation épidémique, mais la règle générale reste 48 heures après la fin de la diarrhée." }
            ] }
        ],
        rule: { title: "La revue des isolements", points: ["Une revue régulière repère les isolements orphelins : critère atteint, précautions toujours en place.", "Chaque levée est prescrite et la signalétique retirée partout (porte, dossier, planning, demandes d'examens).", "VRS, métapneumovirus, adénovirus : levée à la guérison clinique.", "Les maintiens injustifiés ont un coût pour le patient : moins de contacts soignants, plus d'événements indésirables non infectieux, anxiété."] },
        src: ["sf2h_resp", "hyg_cdi", "morgan"]
      },
      {
        title: "Mme Noël, 88 ans", germ: "COVID-19, retour en EHPAD", family: "resp", unit: "Médecine gériatrique",
        facts: ["Résidente d'EHPAD, non immunodéprimée", "COVID-19 symptomatique, forme non grave", "L'EHPAD est prêt à la reprendre"],
        timeline: [["J0", "Début des symptômes"], ["J8", "Apyrétique depuis 3 jours, amélioration respiratoire"], ["J10", "Retour envisagé"]],
        decisions: [
          { q: "J10. La résidente est stable et l'EHPAD est prêt à l'accueillir. La cadre demande si le retour est possible. Votre réponse ?",
            opts: [
              { t: "Oui, sans information particulière : elle est guérie.", k: "risk", fb: "Au 10e jour, elle n'a pas atteint les 14 jours. L'EHPAD doit le savoir pour poursuivre les mesures et protéger les autres résidents." },
              { t: "Oui, avec information de l'EHPAD et poursuite des précautions sur place jusqu'au 14e jour (dont 2 jours sans fièvre), selon l'organisation locale.", k: "ok", fb: "Oui. Le transfert ne lève pas les précautions : il les transmet. La date de levée prévue doit figurer dans le courrier." },
              { t: "Non : elle restera hospitalisée jusqu'à J14.", k: "excess", fb: "Prolonger l'hospitalisation d'une résidente stable expose à des complications liées au séjour. Un retour organisé et informé est préférable." }
            ] },
          { q: "Une autre résidente a été dépistée positive sans aucun symptôme. Quand ses précautions peuvent-elles être levées ?",
            opts: [
              { t: "Après 7 jours, comme une grippe.", k: "risk", fb: "Les délais de la grippe ne s'appliquent pas à la COVID-19." },
              { t: "Après 10 jours.", k: "ok", fb: "Oui. 10 jours pour une forme asymptomatique chez un patient non immunodéprimé." },
              { t: "Après 14 jours.", k: "excess", fb: "Le délai de 14 jours concerne les formes symptomatiques." }
            ] },
          { q: "Le directeur des soins propose une règle interne : lever les précautions COVID-19 dès qu'un test antigénique est négatif. Quel avis l'EOH rend-elle ?",
            opts: [
              { t: "Favorable : c'est simple et objectif.", k: "risk", fb: "Un test antigénique négatif précoce ne garantit pas l'absence de contagiosité et conduirait à des levées avant les délais recommandés." },
              { t: "Défavorable : la levée repose sur le délai depuis les symptômes et l'évolution clinique, conformément au guide SF2H 2024 et à l'avis d'octobre 2025.", k: "ok", fb: "Oui. Les critères sont cliniques et temporels ; la SF2H n'a pas retenu de critère virologique pour lever." },
              { t: "Favorable, à condition d'exiger aussi une PCR négative.", k: "excess", fb: "La PCR reste souvent positive bien après la contagiosité : cette règle prolongerait les précautions sans raison." }
            ] }
        ],
        rule: { title: "COVID-19 : transferts et règles internes", points: ["Le transfert transmet les précautions, il ne les lève pas.", "Indiquer au service d'aval la date de levée prévue.", "10 jours (asymptomatique), 14 jours dont 2 sans fièvre (symptomatique), 24 jours (immunodépression ou forme grave).", "Pas de critère virologique de levée (test antigénique ou PCR)."] },
        src: ["sf2h_resp", "sf2h_covid25"]
      },
      {
        title: "Réunion du CLIN", germ: "Procédure de levée", family: "revue", unit: "Établissement",
        facts: ["Audit : plusieurs isolements maintenus au-delà de leur critère", "Le CLIN veut une procédure unique de levée", "L'EOH rédige la proposition"],
        timeline: [["Constat", "Isolements orphelins dans plusieurs unités"], ["Mission", "Rédiger la procédure"], ["Suivi", "Choisir un indicateur"]],
        decisions: [
          { q: "Qui doit décider la levée dans la procédure ?",
            opts: [
              { t: "L'IDE, dès que le délai est atteint.", k: "off", fb: "L'IDE repère et alerte, mais la SF2H recommande que l'interruption des précautions soit confirmée par prescription médicale." },
              { t: "Le médecin, par une prescription tracée, avec retrait de la signalétique sur tous les supports ; l'EOH est sollicitée pour les situations complexes (BHRe, immunodéprimés, tuberculose MDR).", k: "ok", fb: "Oui. La prescription garantit la traçabilité ; l'EOH intervient là où le critère n'est pas standard." },
              { t: "L'EOH, pour chaque patient.", k: "excess", fb: "Centraliser toutes les levées à l'EOH crée un goulot d'étranglement et allonge les isolements simples." }
            ] },
          { q: "Que prévoit la procédure pour l'information ?",
            opts: [
              { t: "Une information orale de l'équipe suffit.", k: "off", fb: "Une information orale se perd au changement d'équipe et ne suit pas le patient lors d'un transfert." },
              { t: "Information du patient (ou de la personne de confiance), de l'équipe, des plateaux techniques et du service d'aval en cas de transfert, avec la date de levée prévue.", k: "ok", fb: "Oui. Information du patient (R19) et des services d'accueil (R105), tracée dans le dossier." },
              { t: "Un courrier systématique au médecin traitant pour chaque levée.", k: "excess", fb: "Utile pour certains statuts (BHRe), mais disproportionné pour chaque levée de grippe." }
            ] },
          { q: "Quel indicateur de suivi proposez-vous au CLIN ?",
            opts: [
              { t: "Le nombre de chambres signalées un jour donné.", k: "off", fb: "Ce chiffre décrit l'activité mais ne dit pas si les précautions sont justifiées." },
              { t: "Lors d'un audit ponctuel : la part des précautions actives dont le critère de levée est déjà atteint, et la part des levées réalisées avant le critère.", k: "ok", fb: "Proposition cohérente avec l'objectif : mesurer les deux erreurs, levée trop tôt et maintien trop long. Cet indicateur n'est pas un indicateur national ; il est à adapter localement." },
              { t: "Le nombre de dépistages de contrôle réalisés avant levée.", k: "excess", fb: "Cet indicateur pousserait à multiplier des examens souvent inutiles (C. difficile, grippe, COVID-19)." }
            ] }
        ],
        rule: { title: "Une procédure de levée", points: ["Levée prescrite et tracée ; signalétique retirée partout (R18).", "Information du patient (R19) et des services d'accueil (R105).", "EOH sollicitée pour les situations non standard.", "Audit des deux erreurs : levées prématurées et maintiens injustifiés (indicateur local proposé, non national)."] },
        src: ["sf2h_resp", "sf2h_pcc", "morgan"]
      }
    ]
  }
];

/* Aide-mémoire des critères de levée (synthèse des sources ci-dessus). */
const MEMO = [
  { group: "Contact", rows: [
    ["SARM, EBLSE (BMR) en MCO", "Maintien tout au long du séjour. Levée seulement après décontamination efficace (par exemple 2 prélèvements négatifs successifs pour le SARM).", ["sf2h_pcc"]],
    ["SARM, EBLSE en SSR-SLD", "Après plusieurs dépistages négatifs (au moins 2 pour le SARM).", ["sf2h_pcc"]],
    ["Clostridioides difficile", "48 heures (48 à 72 heures selon protocole) après la disparition de la diarrhée. Pas de contrôle microbiologique. Bionettoyage sporicide.", ["hyg_cdi", "cpias_cdi"]],
    ["BHRe, porteur", "Reste porteur même si dépistage négatif (non excréteur). Décolonisation : au moins 1 an, au moins 5 dépistages négatifs (ou 3 dont 1 moléculaire) espacés d'au moins 1 semaine.", ["hcsp_bhre", "cpias_ge_bhre"]],
    ["BHRe, contact à risque élevé", "Épidémie contrôlée et 3 écouvillonnages hebdomadaires négatifs hors exposition : retrait des listes. Sinon après 2 ans de recul.", ["hcsp_bhre", "cpias_bzh_bhre"]]
  ] },
  { group: "Respiratoire, virus", rows: [
    ["Grippe", "Jusqu'au 7e jour inclus après le début des symptômes.", ["sf2h_resp"]],
    ["COVID-19", "10 jours (asymptomatique), 14 jours dont 2 sans fièvre (symptomatique), 24 jours (immunodépression ou forme grave). Délais maintenus par l'avis SF2H d'octobre 2025.", ["sf2h_resp", "sf2h_covid25"]],
    ["VRS, métapneumovirus, adénovirus, parainfluenza", "Jusqu'à la guérison clinique.", ["sf2h_resp"]],
    ["Oreillons", "Au 9e jour après le début de la parotidite.", ["sf2h_resp"]],
    ["Rubéole", "2 semaines après le début de l'éruption.", ["sf2h_resp"]],
    ["Rougeole", "5 jours après le début de l'éruption. Après le départ : aérer 10 minutes ou attendre 2 heures.", ["sf2h_resp"]],
    ["Varicelle, zona disséminé de l'immunodéprimé", "Précautions respiratoires et contact jusqu'à l'assèchement des croûtes.", ["sf2h_resp"]]
  ] },
  { group: "Respiratoire, bactéries", rows: [
    ["Méningocoque", "24 heures après le début d'un antibiotique actif sur le portage nasopharyngé.", ["sf2h_resp", "dgs_iim"]],
    ["Streptocoque A, pneumocoque, Haemophilus", "24 heures après le début du traitement antibiotique.", ["sf2h_resp"]],
    ["Coqueluche", "3 jours d'azithromycine, 5 jours de clarithromycine ; sans traitement, 21 jours d'évolution.", ["sf2h_resp", "hcsp_coq24"]],
    ["Mycoplasma, Chlamydia pneumoniae", "Après 72 heures d'antibiothérapie efficace.", ["sf2h_resp"]],
    ["Diphtérie", "2 cultures négatives à 24 heures d'intervalle après l'arrêt du traitement.", ["sf2h_resp"]],
    ["Tuberculose sensible", "Au moins 14 jours de traitement efficace si toutes les conditions sont réunies ; jusqu'à 30 jours si excavation, charge élevée ou lésions étendues.", ["sf2h_resp", "splf_tb"]],
    ["Tuberculose MDR ou XDR", "Précautions maximales pendant toute l'hospitalisation ou au minimum jusqu'à négativation des cultures.", ["sf2h_resp"]]
  ] }
];

const GUIDE_QUESTIONS = {
  1: ["Dans notre service, qui repère que le critère de levée est atteint ?", "Où est tracé le jour de début des symptômes ou de la dernière selle liquide ?", "Comment expliquons-nous la levée, ou son report, au patient et à sa famille ?"],
  2: ["Avons-nous un modèle de prescription de levée dans le dossier patient ?", "Quels examens de contrôle demandons-nous encore alors qu'ils ne sont pas recommandés ?", "Quand appelons-nous l'EOH pour un patient immunodéprimé ?"],
  3: ["Combien d'isolements orphelins trouverions-nous lundi matin ?", "Notre liste de repérage BHRe a-t-elle une règle de sortie ?", "Quel indicateur présenterons-nous au prochain CLIN ?"]
};
