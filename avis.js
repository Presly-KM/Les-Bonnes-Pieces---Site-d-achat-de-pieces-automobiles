export function ajoutListenersAvis() {                                                                // le mot clé "export" va rendre la fonction disponible et utilisable en dehors du fichier.
    const piecesElements = document.querySelectorAll(".fiches article button");                       // Au sein de la fonction, nous récupérons (par la const piecesElements et plus précisément querySelectorAll) toutes les balises "button" présentes sur nos fiches produits.

    for (let i = 0; i < piecesElements.length; i++) {                                                 // A l'aide de la boucle for nous parcourons tous ces boutons pour leur ajouter un eventListener. Dans notre cas nous écouterons un évènement "click" sur le bouton.
        piecesElements[i].addEventListener("click", async function (event) {                          // Enfin, dans l’event listener du fichier avis.js, nous récupérons l’identifiant de la pièce automobile pour laquelle l’utilisateur a cliqué sur le bouton “Afficher les avis”.(cf directement ci-dessous)

            const id = event.target.dataset.id;                                                       // Nous récupérons la valeur de l’attribut "data-id" (qui se trouve d'ailleurs dans le index.html au niveau des balises "button") grâce à la propriété “dataset.id”. 
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");              // Pour traiter la réponse du serveur, commençons par stocker le résultat de la fonction dans une constante.   Maintenant que nous pouvons attendre le retour de la réponse, il nous faut traiter cette réponse pour en extraire les informations demandées. Dans l’extrait de code ci-dessus, nous récupérons les avis pour une pièce automobile, au format JSON.                                  
            const avis = await reponse.json();                                                        // La réponse de l’API prend la forme d’une chaîne de caractères au format JSON. Nous devons donc désérialiser ce JSON, c’est-à-dire reconstruire les données décrites par la chaîne de caractères dans la mémoire de l’ordinateur.Pour y parvenir, nous rajoutons un appel à la fonction JSON sur l’objet reponse. Il faut également utiliser le mot clé await, car cette opération est aussi asynchrone. La constante avis contient désormais une liste d’objets de tous les avis pour une pièce en particulier. Il ne nous reste plus qu’à générer des éléments grâce aux fonctions createElement et appendChild.
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))                     // Exercice A VOUS DE JOUER sur la sauvergarde en localstorage CONSIGNE --> sauvegardez les avis quand vous recevez la réponse de l’API HTTP à votre requête pour récupérer les avis d’une pièce auto ; Ici setItem va nous permettre de sauvegarder les avis dans le localstorage. Ensuite (`avis-piece-${id}`, JSON.stringify(avis)) signifie que d'abord on calcule le nom de la clé du localStorage a l'aide de l'identifiant de la pièce et on converti les avis recus en JSON (car on rapelle que le localStorage stocke uniquement des “valeurs” de type chaînes de caractères.) afin de fournir une valeur à cette entrée du local strorage. REMARQUE : Dans pieces.js on remarque que dans la fonction " window.localStorage.setItem("pieces", valeurPieces), "valeurPieces" est une variable de JSON.stringify(pieces).
            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis)                                                          // On appelle la fonction afficherAvis la ou se trouvait le code précedemment 
        });
    }
}

//  Exercice A VOUS DE JOUER sur la sauvergarde en localstorage CONSIGNE --> affichez automatiquement les avis enregistrés lors du chargement de la page web. ICI On refactorise le code de génération du DOM des avis. On crée une nouvelle fonction qui prend deux parametres : l'élément du DOM auquel rattacher les balises "p" et la liste des avis à ajouter; Ne pas oublier d'exporter cette fonction a l'aide du mot clé "export" afin de la rendre disponible a l'extérieur du fichier
export function afficherAvis(pieceElement, avis) {
    const avisElement = document.createElement("p");                                               // Ce bloc de code se trouvait auparavant au dessus( ou plutot dans la focntion du dessus) on le déplace dans la fonction présente.
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire}<br>`;  // "si on regarde les données de l'api http présentes dans db.json ou encore dans db-172786510.. on voit en plus de "pièces" la partie "avis" qui intégre la propriété "utilisateur" et "commentaire". C'est de ces deux propriétés qu'il s'agit dans le code ci-contre.
    }
    pieceElement.appendChild(avisElement);
}


/*SAUVEGARDEZ LES DONNES GRACE A UNE API HTTP*/

/*Nous souhaitons maintenant permettre aux utilisateurs de déposer leurs avis sur le site. 
Pour y parvenir, nous allons devoir sauvegarder ces avis grâce à l’API HTTP et au verbe POST.*/

// Cf. le formulaire que nous avons ajouté dans le fichier index.html permettant d'écrire un nouvel avis. Le addEventlistener ci-dessous en découle. 
export function ajoutListenerEnvoyerAvis() {                                                          // En premier lieu, dans le fichier avis.js, nous rajoutons un event listener sur l’événement “submit” de la balise form. Cet événement est déclenché lorsque le formulaire est validé.
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const avis = {                                                                                // Nous allons maintenant construire la charge utile de la requête qui permettra d’ajouter l’avis dans l’API. La charge utile prend la forme d’une chaîne de caractères au format JSON, contenant un objet. Cet objet reprend les champs du formulaire, et crée une propriété pour chacun d’entre eux. Nous construisons donc un objet en reprenant les valeurs des balises input du formulaire 
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),                   // Ici au lieu de mettre document.querySelector on met plutot event.target.querySelector (plus précis ?)
            utilisateur: event.target.querySelector("[name=utilisateur").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);                                                     // Cet objet avis doit être converti en une chaîne de caractères au format JSON pour être transmis dans le body de la requête. Car la valeur du body au sein de ce qu'on appelle l'objet de configuration est toujours une chaine de caractères. Nous appelons donc la fonction JSON.stringify : En effet, JSON.stringify transforme un objet Javascript (en l'ocurrence "avis") en chaine de caractère JSON. Rendant par ce fait "avis" incorporable dans "body" qui rappelons le n'accepte que des chaines de caractères.
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {                                                         // Premièrement nous appelons la fonction fetch qui aura pour premier argument le chemein de la ressource (ici le chemin vers "avis" donc les avis des utilisateurs qui y sont stockés). Mais la sauvegarde de nouvelles données dans l’API HTTP nécessite de renseigner trois nouvelles informations en plus du chemin de la ressource : le verbe HTTP, la charge utile et les en-têtes. Pour y parvenir, il faut utiliser le deuxième argument de la fonction fetch. Ce deuxième argument accepte un objet. Nous devons renseigner trois propriétés dans cet objet pour configurer les trois nouvelles informations. La première propriété concerne le protocole HTTP. Ce dernier utilise les verbes (GET, POST…) pour désigner l’opération demandée par la requête.     
            method: "POST",                                                                           // Pour créer des avis, nous utiliserons le verbe HTTP "POST", et nous le renseignons grâce à la propriété method de l’objet de configuration. Sa valeur sera une chaîne de caractères contenant le verbe HTTP.
            headers: { "Content-Type": "application/json" },                                          // La troisième propriété concerne le format de la charge utile avec les en-têtes. Dans la majeure partie des cas, elle doit être spécifiée pour que le serveur l'interprète correctement. L’en-tête que nous utiliserons pour faire cela est “Content-Type”. La propriété headers aura comme valeur un objet contenant lui-même une propriété "Content-Type" et une valeur indiquant le type MIME du format de la charge utile.
            body: chargeUtile                                                                         // La deuxième propriété concerne la charge utile de la requête, c’est-à-dire l’ensemble de données que le serveur utilisera pour réaliser l’opération demandée par la requête. La charge utile est renseignée avec la propriété body de l’objet de configuration. (IMPORTANT)Sa valeur sera une chaîne de caractères(IMPORTANT). Pour envoyer les informations d’un nouvel avis, nous utiliserons le format JSON. ICI la valeur "ChargeUtile" est la variable de "avis" qui a été stringifé (par l'intermediaire de JSON.Stringify)
        });
    });                                                                                               // Ainsi, l’appel à la fonction fetch ci-contre permettra de configurer une requête pour qu’elle soit envoyée avec le verbe POST et un objet au format JSON comme charge utile
}




                                                       //          GRAPHIQUE AVIS       //
                                      
                                      

export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());                // Nous récupérons tous les avis de la plateforme en faisant une requete à l'api HTTP sur le hemin /avis
    const nb_commentaires = [0, 0, 0, 0, 0];                                                         // Nous calculons le nb de commentaires pour chaque niveau d'étoiles de 1 à 5; Nous créons alors un tableau de 5 éléments initilaisés à 0

    for (let commentaire of avis) {                                                                  // Nous parcouronS les vais a l'aide d'une boucle for 
        nb_commentaires[commentaire.nbEtoiles - 1]++;                                                  // Nous incrémentons les élements de la liste correspondant au nb d'étoiles attribués. Comme les indices commencent à 0 mais que le nb d'étoile commence à 1, on rectifie ce décalage en soustrayant le nombre 1 au nombre d'étoiles
    }

    // Légende qui s'affichera sur la gauche à côté de la barre horizontale 
    const labels = ["5", "4", "3", "2", "1"];                                                        // Nous préparons la configuration du graphique en commencant par les labels (c'est à dire le nom qui sera affiché à gauche pour décrire les barres du graphique)

    // Données et personnalisation du graphique
    const data = {                                                                                   // Nous configurons les données avec l'objet data, ses propriétés labels et datasets.
        labels: labels,
        datasets: [{                                                                                 // Celle-ci contient une liste d'objets et les trois propriétés labels, data et backgroundColor
            label: "Étoiles attribuées",
            data: nb_commentaires.reverse(),                                                         // Nous inversons la liste nb_commentaires, car nous voulons d'abord afficher le nombre de commentaires pour cinq étoiles, puis quatre, puis trois, et ainsi de suite.
            backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
        }],
    };

    // Objet de configuration final                                                                 // Par l'objet de configuration final il s'agit de déterminer le type de graphique que l'on souhaite, les données et l'axe principal 
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    };

    // Rendu du graphique dans l'élément canvas                                                    // Il ne nous reste plus qu'a créer le graphique pour de vrai en spécifiant l'élemnet du DOM auquel le rattacher et l'objet de configuration 
        new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );



/* A VOUS DE JOUER !

Retrouvez le code développé dans ce chapitre sur la branche P4C3-Exercice.

Rajoutez un deuxième graphique sur votre site web. Ce graphique devra afficher deux barres verticales représentant chacune la quantité de commentaires déposés sur :

   - les pièces disponibles ;
   - les pièces non disponibles. */


// Récupération des pièces depuis le localStorage
const piecesJSON = window.localStorage.getItem("pieces");                      // On récupère d'abord les pièces a l'aide du localstorage
//const pieces = piecesJSON ? JSON.parse(piecesJSON) : [];
const pieces = JSON.parse(piecesJSON)                                          // 
// Calcul du nombre de commentaires
let nbCommentairesDispo = 0;                                                   // On calcule le nb de commentaires en créant deux variables. 
let nbCommentairesNonDispo = 0;
//if(pieces.length > 0){
for (let i = 0; i < avis.length; i++) {                                        // Parcourez ensuite la liste des pièces 
    const piece = pieces.find(p => p.id === avis[i].pieceId);

    if (piece) {                                                               // et a l'aide d'une condition if else incrémentez la bonne variable 
        if (piece.disponibilite) {
            nbCommentairesDispo++;
        } else {
            nbCommentairesNonDispo++;
        }
    }
}

// Légende qui s'affichera sur la gauche à côté de la barre horizontale
const labelsDispo = ["Disponibles", "Non dispo."];                           //  Creez une liste pour les labels de notre graphique

// Données et personnalisation du graphique                                  //  Creez un objet de configuration pour les données
const dataDispo = {
    labels: labelsDispo,
    datasets: [{                                                             // Spécifiez les valeurs de la propriété data en créeant une liste...
        label: "Nombre de commentaires",
        data: [nbCommentairesDispo, nbCommentairesNonDispo],                 // ...Dans laquelle vous placerez deux valeurs, les variables nbcommentiaredispo, et nbCommentaireNonDispo
        backgroundColor: "rgba(0, 230, 255, 1)", // turquoise
    }],
};

// Objet de configuration final                                              // Creez un objet de configuration pour tout le graphique 
const configDispo = {
    type: "bar",
    data: dataDispo,
};
console.log(dataDispo);          
                                            
// Rendu du graphique dans l'élément canvas
new Chart(                                                                   // A l'inverse du graphique pour les étoiles ne specifiez pas l'axe principal horizontal puique par défaut c'est laxe vertical qui sera utilisé 
    document.querySelector("#graphique-dispo"),
    configDispo,
);

}                                                                           // Enfin créez le graphique en appellant new Chart

