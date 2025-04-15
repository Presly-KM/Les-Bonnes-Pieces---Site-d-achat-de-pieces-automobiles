import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis } from "./avis.js";                              // Pour que l’ajout de cette fonction ne génère pas d’erreur dans notre code, nous devons l’importer avant de l’utiliser. Cet import doit être réalisé à la première ligne du fichier pieces.js :


// Récupération des pièces éventuellement stockées dans le localStorage                                // L’extrait de code suivant se place juste avant l’appel à la fonction fetch, tout au début du fichier pieces.js :   ATTENTION  --->  Si notre page s’exécute pour la première fois, alors le localStorage sera vide et la fonction retournera null. Dans ce cas-là, nous reprenons le code précédent qui envoyait une requête à l’API HTTP.
let pieces = window.localStorage.getItem("pieces");

if (pieces === null) {                                                                                 // Concernant "null" Si notre page s’exécute pour la première fois, alors le localStorage sera vide et la fonction retournera null. Dans ce cas-là, nous reprenons le code précédent qui envoyait une requête à l’API HTTP.
    // Récupération des pièces depuis le fichier JSON. MODIFICATION : Désormais récupérées depuis l'API HTTP.
    const reponse = await fetch('http://localhost:8081/pieces/');                                      // Avant on puisait les données dans le fichier "pieces-autos.json". Désormais ils sont puisés dans l'API HTTP : "http://localhost:8081/"
    pieces = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);                                                       // Le localStorage stocke uniquement des “valeurs” de type chaînes de caractères. Cela nous oblige à utiliser la sérialisation JSON pour stocker des données plus complexes. Ainsi on utilise JSON.stringify.
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);                                               // La fonction setItem permet d’écrire une valeur dans le localStorage. Elle prend deux arguments : la clé : une chaîne de caractères ET la valeur à enregistrer : une chaîne de caractères.
} else {
    pieces = JSON.parse(pieces);                                                                       // Dans le cas où la valeur est différente de null, il ne me reste plus qu’à désérialiser la chaîne de caractères obtenue, pour reconstruire le contenu du JSON en mémoire. A SAVOIR : Json.parse() prends une chaine de caractère JSON (suite mots horizontales) et la transforme en un objet (suite de mots cette fois-ci rangée verticalement). Le JSON.Stringify fait l'inverse.
}

// on appel la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis()
// Suppression des pièces auto du localStorage grâce à la fonction removeltem                          // Maintenant que nous utilisons en priorité les données du localStorage lorsqu’elles sont présentes, il nous faut un moyen pour rafraîchir ces données. Pour y parvenir, nous devons supprimer les données déjà présentes dans le localStorage. Nous allons donc ajouter un bouton sur la page web “Mettre à jour les pièces” dans le fichier HTML.
// cf. HTML pour le code à ajoutée afin d'exécuter l'action (la supression du local storage)


/* Récupération des pièces depuis le fichier JSON. MODIFICATION : Désormais récupérées depuis l'API HTTP.
const reponse = await fetch('http://localhost:8081/pieces/');                                           // Avant on puisait les données dans le fichier "pieces-autos.json". Désormais ils sont puisés dans l'API HTTP : "http://localhost:8081/"
const pieces = await reponse.json();                                                                 // Cette ligne veut dire qu'aprés qu'avec la syntaxe "await" on a récupéré la réponse de l’API HTTP, on la transforme maintenant en JSON

// Transformation des pièces en JSON
const valeurPieces = JSON.stringify(pieces);
 
// Stockage des informations dans le localStorage (ou enregistrement de la réponse de l'API grace à la fonction setItem)
window.localStorage.setItem("pieces", valeurPieces);                                                    // La fonction setItem permet d’écrire une valeur dans le localStorage. Elle prend deux arguments : la clé : une chaîne de caractères ET la valeur à enregistrer : une chaîne de caractères.
window.localStorage.setItem("nom", "Les Bonnes Pièces !");                                              // Pour stocker la phrase “Les Bonnes Pièces !” avec la clé “nom”, on écrira donc :
// Suppression des informations dans le localStorage 
window.localStorage.removeItem("nom");                                                                  // Pour supprimer le nom de l’entreprise Les Bonnes Pièces avec la clé “nom”, on écrira donc le code ci contre. Lors du prochain appel à getItem pour cette clé, nous obtiendrons la valeur null, indiquant qu’il n’y a pas de valeur stockée pour cette clé.
// Récupération des donnes des pieces auto grace a la fonction getItem                                  // Maintenant que les données sont stockées, on voudrait y avoir accès. La fonction getItem permet de lire une valeur depuis le localStorage. Elle ne prend qu’un argument : la clé (une chaîne de caractères).
const nomEntreprise = window.localStorage.getItem("nom");                                               // Ainsi, pour récupérer le nom de mon entreprise avec la clé “nom”, on écrira :
// Récupération des pièces éventuellement stockées dans le localStorage
/*const pieces = window.localStorage.getItem("pieces");*/                                               // Nous ajoutons la tentative de récupération des pièces dans le localStorage. ATTENTION : L’extrait de code suivant se place juste avant l’appel à la fonction fetch, tout au début du fichier pieces.js :

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];                                                                       // Ici "article" =  la piece ou l'article n°1 car "pieces" = les différents articles récupérés par "fetch" dans pieces-autos.json (cf les deux premières lignes à la différence que cette fois-ci il est précisé "[0] ce qui fait que concerne pas tous les articles mais bien seulement le 1er à savoir l'ampoule led")             NB: [0] = 1 , [1] = 2 ,  [2] = 3 , [3] = 4, [4] = 5   DONC toujours supérieur au chiffre auquel il se réfère. Ainsi pieces[0] = "id":1 qui correspond à l'article ampoule LED  / pieces[1] = "id":2 qui corresponds à l'article plaquettes de frein 
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        pieceElement.dataset.id = pieces[i].id
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;                                                                // "article.image" veut dire qu'on récupère l'élément, ici l'image, qui est dans article 1er (Ampoule led) de pieces-autos.json. D'ou l'utilité du const articles = pièces[i] en haut du code. Car on avait besoin de puiser dans "pieces".
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;          // On utilise ici l'opérateur ternaire . Si un article vaut moins de 35 euros, alors on considère qu’il est abordable, et on affichera un seul symbole euro "€". À l’inverse, si l’on considère que le prix est élevé, on affichera trois symboles euro "€€€". La syntaxe générale de l’opérateur ternaire est formulée ainsi : expression à tester ? valeur si vrai : valeur si faux.
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";                          // L’opérateur nullish s’utilise lorsque vous pensez avoir une information dans une variable mais que finalement, il n’y en a pas. Ça peut arriver quand, concrètement ? Eh bien, quand une valeur est null, et donc qu’elle n’a pas de valeur, ou bien lorsqu’elle est undefined, et donc qu’elle n’est pas définie. Dans notre cas, la pièce automobile “Balai d’essuie-glace” n’appartient à aucune catégorie. On aimerait le préciser entre parenthèses lorsque c’est le cas. L’opérateur s’écrit avec deux "??"" sous la forme suivante : expression à tester ?? valeur de substitution
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");                                             // Ajout d'un bouton sur chaque fiche produit, intitulé “Afficher les avis”
        avisBouton.dataset.id = article.id;                                                              // Chaque bouton est créé avec un attribut “data-id” qui contient l’identifiant de la pièce automobile. Cet attribut permettra de faire le lien entre un bouton sur la page web et une pièce automobile lorsque l’on réagira au clic de ce bouton. // Cela nous permettra de recuperer l'élément parent auquel ajouter les avis plu tard
        avisBouton.textContent = "Afficher les avis";                                                    // Le bouton est intitulé "Afficher les avis"


        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        //Ajout des éléments au DOM pour l'exercice
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);
    }
    // Appel de la fonction ajoutListenersAvis
    ajoutListenersAvis();                                                                               // Dans un deuxième temps, nous appelons la fonction ajoutListenersAvis dans le fichier pieces.js après la boucle for de génération des éléments du DOM qui se trouve dans la fonction genererPieces.

}

genererPieces(pieces);

for (let i = 0; i < pieces.length; i++) {                                                                 // Par une bocule on parcourt les pieces.
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);                                   // Ici pour chaque pièce on récupère l'éventuelle valeur stockée dans le localstorage
    const avis = JSON.parse(avisJSON);                                                                  // Comme plus haut dans le code getItem et toujours suivi d'un JSON.parse afin de transformer le code en format objet quand il est en chainde de caractère.

    if (avis !== null) {                                                                                  // Si cette valeur est présente... 
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);                        // ...on récupère l'élement parent grâce à l'attibue "data-id" que l'on a ajouté précédement
        afficherAvis(pieceElement, avis)                                                                // Enfin, on appelle la fonction afficherAvis.
    }
}


//gestion des boutons

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);                                                 // La fonction sort modifie la liste qu’elle réordonne “en place” (in-place, en anglais). Cela veut dire que les éléments de la liste changent de place. Cela pose un problème car la liste d’origine avec l’ordre d’origine est aussi modifiée. Pour résoudre ce problème, nous pouvons créer une copie de la liste avec la fonction Array.from.
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});


const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {                                   // Premiere apparition de "piece" sans le "s" : chercher à savoir d'ou il sort et si c'est juste pur invention 
        return piece.prix <= 35;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees)
});


/* Exercice A VOUS DE JOUER (CORRIGE)

   Editez les fichiers pieces.js et index.html pour y ajouter les fonctionnalités suivantes :

       - filtrer la liste des pièces pour n’afficher que celles qui ont une description, 
         à l’aide d’un bouton que vous ajouterez dans le HTML.

       - ordonner les listes selon le prix en ordre décroissant, 
         à l’aide d’un bouton que vous ajouterez dans le HTML.*/


const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function (a, b) {                                                     // Dans le cas d'un ordre décroissant function(a, b) devient function(b, a)  
        return b.prix - a.prix;                                                             // Ici alors que plus haut pour les pieces ordonnées de manière croissante on avait mis : a.prix - b.prix cette fois-ci comme les pieces sont ordonnées de manière décroissante on met : b.prix - a.prix
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});



const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description                                                           // Ici si la description est absente alors l'élément ne sera pas dans la liste des pièces et si la description est présente alors la piece sera bien présente dans la liste filtrée. AUTRE REMARQUE : Pas de true or false necessaire.
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});



/* MAPPEZ UNE LISTE


Une première étape consiste à extraire le nom de toutes nos pièces à partir du fichier JSON. 
Problème : les noms des pièces ne sont pas facilement accessibles. Ils se situent dans les objets des pièces, qui eux-mêmes se situent dans la liste de toutes les pièces.
La fonction map va nous aider à récupérer le nom des pièces automobiles. Grâce à elle, nous allons transformer notre liste de pièces d’origine en une liste contenant uniquement le nom des pièces. Magique ! 

Voici le code qui nous permet de récupérer le nom de toutes les pièces :

     const noms = pieces.map(piece => piece.nom);                                          // La syntaxe “piece => piece.nom” Il s’agit d’une fonction JavaScript à l’écriture grandement simplifiée. On l’appelle fonction lambda. Elle correspond à l’écriture suivante : // Fonction lambda : piece => piece.nom // Fonction normale :  function (piece) {              Cette façon d’écrire les fonctions simplifie et fluidifie la lecture du code.      
                                                                                                                                                                                                                                                                                                            //                         return piece.nom;
                                                                                                                                                                                                                                                                                                            //                     }
 

/* AJOUEZ ET SUPPRIMEZ LES ELEMENTS D'UNE LISTE 


Nous avons réussi à générer une liste avec tous les noms des pièces. Mais certaines ne sont pas abordables. Nous voulons donc supprimer le nom de toutes les pièces non abordables

Pour cela, nous procéderons en deux étapes :

    - Parcourir la liste des pièces avec une boucle for.

    - Supprimer les noms avec la fonction splice.

Lorsque l’on souhaite chercher des éléments dans une liste pour les supprimer, on doit parcourir la liste de la fin vers le début. Sans cela, certains éléments ne seraient pas testés à cause du décalage que provoquerait la suppression des éléments indésirables.

Pour supprimer les éléments indésirables, nous allons utiliser la fonction "splice". Elle prend en argument deux valeurs :

    - l’indice à partir duquel supprimer des éléments ;

    - la quantité d’éléments à supprimer. 

Ici, nous nous servirons de l’indice i comme premier argument, et nous supprimerons toujours un seul élément à la fois.*/

const noms = pieces.map(piece => piece.nom);                           // Nous allons générer une liste contenant uniquement les nom des pièces. Pour cela nous utilisons la fonction map sur la liste "piece". Dans les parenthèses nous écrivons une fonction lambda avec le symbole ""=>"" qui signifie "retournez la valeur de la propriété nom. de l'objet pièces". Notre liste contient tous les noms mais nous voulons désormais retirer tous les noms des pièces qui ne sont pas abordables.
for (let i = pieces.length - 1; i >= 0; i--) {                           // On écrit alors une boucle qui aura pour rôle de parcourir tous les noms. On fait commencer la boucle au dernier indice, à savoir "piece.length -1; i >= 0;){". La condition de la boucle est : i supérieur ou égal à 0; en effet à chaque tour de boucle nous diminueront de 1 la valeur de i . IL ne faudra donc pas descendre en dessous de 0. 
    if (pieces[i].prix > 35) {                                            // Dans cette boucle nous écrivons la condition qui vérifie si le prix de la piece est suppérieur à 35. Si c'est le cas nous supprimons le nom de la piece dans la liste nom à l'aide de la fonction splice et à l'issue de la boucle nous n'aurons donc que les noms des pièces dont les prix est inférieur ou égal à 35; 
        noms.splice(i, 1);                                                // NE PAS OUBLIER : "splice(i,1)" signifie "splice(indice à partir duquel supprimer des éléments, la quantité des éléments à supprimer)"
    }
}
console.log(noms)


/* AFFICHEZ LA LISTE DES PIECES ABORDABLES 

Grâce à cette liste de noms, nous pouvons générer les éléments du DOM pour afficher une liste à puces sur notre site. 
Pour cela, nous reprenons les fonctions createElement et appendChild que nous avons rencontrées dans les chapitres précédents.*/

//Création de l'en-tête

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";

//Création de la liste                                                 // Nous avons ajouté une balise div dans LE HTLM et nous venons de filtrer les noms des pièces a afficher, créons maintenant les éléments du DOM qui formeront la liste à l'écran :
const abordablesElements = document.createElement('ul');              //  Tout d'abord créons l'élément ul avec la fonction createelement
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {                                   // Ensuite, parcourons la liste des noms avec une boucle for classique. Dans cette boucle on retrouve les trois étapes de generation : la création de l'element, le remplisage de son contenu textuel et l'ajout au parent. Cependant, rien ne s'affichera à l'écran car l'élément ul n'est lui même pas rattaché a un élément déja présent dans la page.
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')                                 // Faisons donc cela on appelant la fonction appendchild sur le parent;
    .appendChild(pElement)
    .appendChild(abordablesElements)


/* EXERCICE A VOUS DE JOUER (CORRIG2)

Depuis la branche P2C2-Exercice, affichez une description des pièces disponibles à côté de la description des pièces abordables. 
L’intitulé de la pièce devra aussi contenir son prix. Par exemple :

Pièces disponibles :
    Ampoule LED – 60 €.
    Plaquette de frein (x4) – 40 €.
    Liquide de frein – 9,6 €.                       */

const nomsDisponibles = pieces.map(piece => piece.nom)                                           // ATTENTION : GARDER EN TETE que c'est simplement le nom et le prix qui disparaitrons de la page web (ils disparaitrons en fait de la liste de noms des pieces disponibles que nous aurons ajouté à proximité des fiches produits) mais pas l'image ne l'article indisponible ni sa description, prix, disponibilité etc.
const prixDisponibles = pieces.map(piece => piece.prix)

for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

const disponiblesElement = document.createElement('ul');

for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;                  // Ca donnera par exemple sur la page web au sein de la liste des Pièces disponibles, cet aspect : " Ampoule LED - 60€ "
    disponiblesElement.appendChild(nomElement);
}

const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement);



/* DECOUVREZ LA PROPRIETE INNERHTML 

Différent de InnerText qui modifier le texte de la balise ex : remplir la description ou la catégorie dans la balise p
InnerHTML est beaucoup plus puissante. Avec InnerHTML la chaine de caractère assignée est analysée par le navigateur. Celui-ci détecte les balises HTML et il crée lui-même un élément coorespondant dans le DOM. Et si les balises sont imbriquées, le navigateur se charge tout seul d'appeler la fonction appendChild. Elle est pratique et plus courte  écrire mais pas trés lisible, car elle oblige à utiliser beaucoup de concaténation de chaines de caractère, Mais on peu combiner innerhtlm et la technique de génération qu'on a vu tout à l'heure.
Par exemple, si j'affecte une chaine de caractres vide à la propriété, le contenu de la balise ciblée disparait. Et ainsi grace à ça on peut effacer l'écran. Il suffit ensuite de rappeler le code de génération des éléments du DOM. Le navigateur fait alors les deux opérations suffismanet rapidement pour donner l'impression d'avoir modifié l'affichage.


Efface le contenu de la balise body et donc l’écran
document.querySelector(".fiches").innerHTML = '';*/


/*EXERCICE A VOUS DE JOUER (CORRIGE)

Depuis les fichiers index.html et pieces.js de la branche P2C3-Exercice :

    ajoutez une balise input de type range dans la page web, représentant le prix maximum pour filtrer les pièces :
        valeur min : 0
        valeur max : 60
        step: 5.

    La balise input de type range en HTML permet de fournir un nombre à l’aide d’une barre horizontale avec une poignée que l’on peut glisser de droite à gauche. 
    En définissant les valeurs minimale et maximale sur la balise, la position de la poignée nous donne la valeur correspondante sous forme de nombre.    */


const inputPrixMax = document.querySelector('#prix-max')                                     // Cf la balise input que nous que nous venons d'ajouter dans la pageHTML
inputPrixMax.addEventListener('input', function () {                                           // Ici, on utilise l'événement "input" qui est déclenché à chaque fois que la valeur de l'élément change sans avoir besoin de cliquer sur un bouton de validation
    const piecesFiltrees = pieces.filter(function (piece) {                                    // A L'intérieur de la focntion callback on filtre la liste de spièces par l'intermediaire de la focntion filter
        return piece.prix <= inputPrixMax.value;                                               // "<=" veut dire "inférieur ou égale à"
    });
    document.querySelector(".fiches").innerHTML = "";                                        // On efface d'abord l'écran avant de le remplir des pièces filtrées à l'aide de genererPieces(piecesFiltrées) générer les pièces filtrées.
    genererPieces(piecesFiltrees);
})



/* SAUVEGARDEZ LES DONNEES GRACE A UNE API HTTP */

/* EXERCICE : A VOUS DE JOUER (CORRIGE)

Dans le fichier index.html de la branche P3C3-Exercice :

    Ajoutez une balise input type=”number” qui servira à spécifier le nombre d’étoiles que l’utilisateur attribue à la pièce avec son commentaire.

    Modifiez en conséquence le fichier avis.js pour prendre en compte cette nouvelle information dans la charge utile. Vous utiliserez la propriété “nbEtoiles” dans l’objet de la charge utile.
*/

/* REMARQUE : Pour voir le résultat du corrigé cf avis.js et index.html*/




/* SAUVEGARDEZ LES DONNEES DANS LE LOCALSTORAGE 

Votre page web est pleinement opérationnelle. Elle permet d’afficher les pièces automobiles, leurs avis, et de déposer de nouveaux avis.
Pour l’instant, tout cela fonctionne tant que votre navigateur est connecté à internet. Mais dans certaines situations, vous pouvez perdre cet accès à internet. Notamment, lorsque vous ne disposez pas d’une connexion stable.
Dans ce chapitre, nous allons découvrir comment garder notre page web interactive même lorsque vous n’êtes pas connecté à internet. Tout cela, grâce au localStorage. C’est parti ! 

(ATTENTION) Le localStorage stocke uniquement des “valeurs” de type chaînes de caractères. 
Cela nous oblige à utiliser la sérialisation JSON pour stocker des données plus complexes. (ATTENTION)

Chaque chaîne de caractères est identifiée par une “clé”. On parle ainsi de stockage clé-valeur.

Les données du localStorage sont sauvegardées, y compris à la fermeture du navigateur. Ainsi, lorsque vous ouvrez à nouveau la page, les données du localStorage sont toujours présentes. Vous pouvez donc vous servir du localStorage pour sauvegarder des informations entre deux sessions d’un utilisateur. Cela est souvent utilisé pour stocker, par exemple, les préférences de langue de l’interface, ou de mode sombre ou de mode clair.

Il existe trois opérations principales pour interagir avec le localStorage : enregistrer, récupérer et supprimer. 
L’API propose une fonction pour chacune de ces opérations. On accède à ces fonctions grâce à l’objet window.localStorage.

  Enregistrer la réponse de l'API grâce à la fonction setItem

La fonction setItem permet d’écrire une valeur dans le localStorage. Elle prend deux arguments :

            -  la clé : une chaîne de caractères ;

            -  la valeur à enregistrer : une chaîne de caractères. 

      Pour stocker la phrase "Les Bonnes Pièces !" avec la clé "nom", on écrira donc : 

               window.localStorage.setItem("nom", "Les Bonnes Pièces !");

Dans le cas de notre site web, nous devons rajouter un appel à cette fonction juste après la fonction fetch, qui récupère les pièces auprès de l’API HTTP :

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("http://localhost:8081/pieces");
const pieces = await reponse.json();
 
// Transformation des pièces en JSON                                                 // OUI CAR ON RAPPELLE QUE LE LOCALESTORAGE STOCKE UNIQUEMENT DES "VALEURS" DE TYPE CHAINES DE CARACTERES
const valeurPieces = JSON.stringify(pieces);                                         // AINSI ON UTILISE JSON.stringify POUR QUE LES DONNES COMPLEXES SOIENT (Objets ?) DESORMAIS DES CHAINES DE CARACTERES EN JSON
 
// Stockage des informations dans le localStorage
window.localStorage.setItem("pieces", valeurPieces);


Récupérez les données des pièces auto grâce à la fonction getltem


Maintenant que les données sont stockées, on voudrait y avoir accès. 
La fonction getItem permet de lire une valeur depuis le localStorage. 
Elle ne prend qu’un argument : la clé (une chaîne de caractères).

    Ainsi, pour récupérer le nom de mon entreprise avec la clé “nom”, on écrira :

       const nomEntreprise = window.localStorage.getItem("nom");

    S’il n’y a pas de valeur correspondant à la clé, la fonction getItem retourne la valeur null.


Ajoutons la tentative de récupération des pièces dans le localStorage. 
L’extrait de code suivant se place juste avant l’appel à la fonction fetch, tout au début du fichier pieces.js :

// Récupération des pièces éventuellement stockées dans le localStorage
   const pieces = window.localStorage.getItem("pieces");

   Si notre page s’exécute pour la première fois, alors le localStorage sera vide et la fonction retournera null. Dans ce cas-là, nous reprenons le code précédent qui envoyait une requête à l’API HTTP.

// Récupération des pièces éventuellement stockées dans le localStorage
    let pieces = window.localStorage.getItem("pieces");
    if (pieces === null) {
  // Code de récupération des pièces depuis l’API HTTP//
         const reponse = await fetch('http://localhost:8081/pieces/');                                 // Avant on puisait les données dans le fichier "pieces-autos.json". Désormais ils sont puisés dans l'API HTTP : "http://localhost:8081/"
    pieces = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);                                                       // Le localStorage stocke uniquement des “valeurs” de type chaînes de caractères. Cela nous oblige à utiliser la sérialisation JSON pour stocker des données plus complexes. Ainsi on utilise JSON.stringify.
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);                                               // La fonction setItem permet d’écrire une valeur dans le localStorage. Elle prend deux arguments : la clé : une chaîne de caractères ET la valeur à enregistrer : une chaîne de caractères.
} else {
    pieces = JSON.parse(pieces);                                                                       // Dans le cas où la valeur est différente de null, il ne me reste plus qu’à désérialiser la chaîne de caractères obtenue, pour reconstruire le contenu du JSON en mémoire. A SAVOIR : Json.parse() prends une chaine de caractère JSON (suite mots horizontales) et la transforme en un objet (suite de mots cette fois-ci rangée verticalement). Le JSON.Stringify fait l'inverse.
}



Supprimez les pièces auto du localStorage grace à la fonction removeItem


Maintenant que nous utilisons en priorité les données du localStorage lorsqu’elles sont présentes, il nous faut un moyen pour rafraîchir ces données. 
Pour y parvenir, nous devons supprimer les données déjà présentes dans le localStorage.

Nous allons donc ajouter un bouton sur la page web “Mettre à jour les pièces” dans le fichier HTML.

Lors du clic sur ce bouton, nous supprimerons les données du localStorage. Lors du prochain chargement de la page, l’API HTTP sera à nouveau appelée pour obtenir la toute dernière version des pièces auto.

La fonction removeItem permet de retirer une valeur depuis le localStorage. Elle ne prend, elle aussi, qu’un argument : la clé (une chaîne de caractères).

Pour supprimer le nom de l’entreprise Les Bonnes Pièces avec la clé “nom”, on écrira donc :

      window.localStorage.removeItem("nom");


Lors du prochain appel à getItem pour cette clé, nous obtiendrons la valeur null, indiquant qu’il n’y a pas de valeur stockée pour cette clé.

Dans le cas de notre site web, nous rajoutons un event listener à la fin du fichier pieces.js, 
sur le bouton “Mettre à jour les pièces”, et nous appelons la fonction removeItem dans la fonction anonyme : */

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {                                   // <!-- Lors du clic sur ce bouton, nous supprimerons les données du localStorage. Lors du prochain chargement de la page, l’API HTTP sera à nouveau appelée pour obtenir la toute dernière version des pièces auto-->
    window.localStorage.removeItem("pieces");
});

/*Exercice A VOUS DE JOUER

Dans le fichier avis.js de la branche P3C4-Exercice :

    - sauvegardez les avis quand vous recevez la réponse de l’API HTTP à votre requête pour récupérer les avis d’une pièce auto ;

    - affichez automatiquement les avis enregistrés lors du chargement de la page web.*/




/* CHOISISSEZ UNE LIBRAIRIE ADAPTEE AUX BESOINS DE VOTRE PROJET 


Une librairie est un ensemble de code informatique et de fonctionnalités logicielles réutilisables. 
Cela vous évite de dupliquer le code source, tout en garantissant une qualité de code optimale. 
Une librairie est également partageable sur des sites open source comme GitHub.

La plus connue d’entre elles est sans doute jQuery. 
Cette librairie offre une solution clé en main pour écrire le code de manipulation du DOM de manière plus concise.

    Ainsi, pour récupérer un élément du DOM et changer son contenu textuel en version standard, on écrirait :

            document.querySelector("button").innerText = "Rejoignez l’entreprise Les Bonnes Pièces !";

    Alors qu’avec jQuery cela donnerait :

            $("button").text("Rejoignez l’entreprise Les Bonnes Pièces !");

La librairie ajoute la variable $ comme alias de la fonction document.querySelector. 
On peut changer le texte de l’élément sélectionné avec la fonction text plutôt qu’avec la propriété innerText.


/*Arbitrez entre développement interne et utilisation d’une librairie

Quand vous développez une fonctionnalité sur une application, vous avez donc deux possibilités : la développer vous-même, ou utiliser une librairie. 
Explorons ensemble les critères de décision qui vous permettront de choisir entre les deux.


Dans quels cas utiliser une librairie ?


Quand vous disposez d’un temps limité pour développer votre application
 Dans cette situation, vous devez aller vite. Une librairie vous offrira une solution clé en main, et vous permettra de gagner du temps. Petit bémol cependant : vous devrez personnaliser la librairie pour obtenir un résultat optimal.

Quand vous ne pouvez pas faire mieux vous-même
 Inutile de réinventer la roue ! Certaines librairies contiennent des tests automatisés qui garantissent la justesse, la robustesse et la stabilité du code. Il serait dommage de ne pas utiliser ces librairies de haute qualité dans un projet.

Quand le code à développer nécessite un expertise poussée
 C’est le cas, par exemple, pour les librairies de modélisation et de rendu en 3D pour créer des images de synthèse. 
 Ce genre de code fait appel à des connaissances très pointues en mathématiques. Autre domaine concerné : la cryptographie et le chiffrement. 
 Dans ce cas, développer son propre code de chiffrement est même une faute professionnelle. Il faut toujours utiliser une librairie.



Dans quels cas développer votre propre code ?

Quand la licence logicielle de la librairie est trop restrictive
 Une licence logicielle est un contrat qui oblige l’utilisateur du logiciel à se conformer aux exigences de l’auteur. On retrouve des licences toutes faites et bien connues comme MIT, Apache ou GPL.
 Il arrive aussi que l’auteur d’une librairie écrive son propre contrat : en interdisant l’utilisation de sa librairie pour des utilisations militaires, par exemple. 
 Si votre projet concerne cette industrie, vous devrez trouver une alternative ou développer le code vous-même.

Quand vous avez absolument besoin d’un support technique
 Certaines librairies peuvent répondre à votre besoin, mais ne proposent pas de support technique. 
 C’est souvent le cas avec les projets open source maintenus par des bénévoles sur leur temps libre. Ils ne pourront pas vous répondre en priorité, ni apporter des changements ou des corrections selon vos besoins. 
 Si la librairie vous intéresse vraiment, vous pouvez toujours créer un fork et apporter vos propres modifications (à condition que la licence logicielle vous le permette).

Euh… c’est quoi un fork ?

Pour faire simple, on peut dire que c’est une copie d’un dépôt GitHub/GitLab. 
Je vous invite à jeter un œil à ce chapitre du cours Devenez un expert de Git et GitHub pour en savoir plus. 

Quand votre besoin est trop spécifique ou innovant
 Il se peut que personne n’ait eu le même besoin que vous. 
 Dans ce cas, il vous faudra développer vous-même la solution. Vous pourrez alors publier votre code en ligne et créer votre propre librairie. 
 Cependant, cela reste un cas de figure assez rare.


Trouvez des librairies sur internet

Utilisez des sites de référence

Dans le domaine du développement web en JavaScript, le site web NPM est LA référence.

Le site https://github.com vous permet également de trouver des librairies. 
Cependant, restez vigilant dans votre recherche : le site propose des librairies écrites dans d’autres langages informatiques que le JavaScript, qui ne pourront pas s’exécuter dans votre navigateur.

Enfin, sachez que vous pouvez aussi faire une recherche sur votre moteur de recherche favori. 
La petite astuce que je vous conseille est de faire précéder votre recherche par le mot clé “awesome” (génial, en anglais). 
Par exemple “awesome javascript graph”. Vous tomberez sur des collections ressources géniales rassemblées par d’autres développeurs passionnés. 


Choisissez votre librairie de graphiques

Rendez-vous sur le site de NPM et faites la recherche “graph” (graphique, en anglais).

Nous pouvons déjà écarter les deux premiers résultats :

    Le premier n’a pas été mis à jour depuis 8 ans.

    Le deuxième concerne la théorie des graphes en mathématiques.

Continuons tout de même notre recherche. 
Plus loin dans la liste, on trouve un résultat avec une description intéressante : 
    “Simple HTML5 charts using the canvas element”. En français : Graphiques simples en HTML 5 avec l’élément canvas.

La dernière publication date d’il y a trois mois, et on y parle de l’élément canvas et d’HTML. 
C’est plutôt positif ! En cliquant sur ce résultat de recherche pour afficher la page de description de cette librairie, on peut voir des informations intéressantes sur la droite :

Plus de deux millions de téléchargements hebdomadaires, cette librairie est donc populaire. 
Elle est à sa version 3 avec 7 mises à jour, elle semble donc mature. 
La licence MIT est très permissive : elle offre la possibilité de  réutiliser très facilement le code en cas de modification, ou lorsque l’on forke le projet. 
Bingo ! Nous avons trouvé notre librairie. 


/*INSTALLEZ LA LIBRAIRIE GRACE AU GESTIONNAIRE DE PAQUETS

Votre choix est fait, vous allez utiliser la librairie Chart.js pour faciliter l’affichage de graphiques sur votre page web de gestion. 
Cependant, les fichiers de la librairie ne sont pas encore installés sur votre ordinateur. 
Voyons ensemble comment faire, avec le gestionnaire de paquets NPM et la ligne de commande.


Utilisez un gestionnaire de paquets

La plupart du temps, en JavaScript, les développeurs gèrent le téléchargement des librairies avec un gestionnaire de paquets.

Mais… Pourquoi on parle de gestionnaire de “paquets” alors que je veux juste télécharger une librairie ?

Parce que les librairies doivent être empaquetées pour être distribuées au monde entier.
C’est un peu la même idée que d’emballer votre colis et de le mettre dans un carton avant de l’envoyer par la poste.

Découvrez le rôle d’un gestionnaire de paquets

Pour notre site web, nous utiliserons le gestionnaire de paquets le plus répandu dans le monde du développement web en JavaScript. Il s’agit de NPM : Node Package Manager. Ce gestionnaire est composé de deux parties :

    le site web public qui référence tous les paquets publiés ;

    l’outil en ligne de commande sur votre ordinateur.

Le site web NPM est accessible à cette adresse, et l’outil en ligne de commande est installé en même temps que vous installez Node.js sur votre ordinateur.

Un gestionnaire de paquets, et NPM en particulier, a plusieurs fonctions au sein d’un projet :

    documenter le nom et la version des librairies dont votre projet dépend. C’est pour cela qu’on les appelle parfois des dépendances ;

    automatiser le téléchargement de ces dépendances auprès du site web public qui référence tous les paquets ;

    orchestrer les tâches de maintenance du projet telles que la construction du site web (build), la réalisation de tests ou la vérification du code.

   
/*Initialisez NPM dans votre projet

Pour documenter les librairies dont nous avons besoin, nous devons initialiser un nouveau projet avec NPM.

Si ce n’est pas déjà fait, créez un répertoire pour votre projet, puis lancez la commande  npm init  :

# Création d’un répertoire (optionnel)
mkdir mon-projet
# Changement de répertoire
cd mon-projet
# Initialisation du projet NPM
npm init

La commande d’initialisation vous demande de saisir un certain nombre d’informations, comme le nom de votre projet, la version, une description, l’auteur ou bien la licence logicielle. Elle affiche un aperçu du fichier package.json qui va être généré, et vous demande de confirmer.

Une fois confirmé, vous obtiendrez donc le fichier suivant :

{

   "name": "site-web",

   "version": "1.0.0",

   "description": "",

   "main": "index.js",

   "scripts": {

     "dev": "http-server"

   },

   "author": "Thomas Kerbrat",

   "license": "ISC",

   "dependencies": {

     "http-server": "^14.1.0"

   }

 }

Ce fichier utilise le format JSON. On y retrouve un objet avec des propriétés correspondant aux informations demandées précédemment.


Maintenant que vous avez initialisé votre projet avec NPM, il ne vous reste plus qu’à installer la librairie Chart.js.

Pour y parvenir, nous devons trouver le nom exact du paquet tel que npmjs.com le connaît. 

On peut facilement trouver ce nom sur la page de description du paquet Chart.js. Il se situe en haut à gauche, au-dessus des onglets “Readme”, “Explore”, etc. :


Muni de cette information, placez-vous maintenant dans le répertoire de votre projet, et avec l’interface textuelle, tapez la commande suivante :

     npm install chart.js

NPM vous affiche des informations concernant sa progression de téléchargement et d’installation du paquet demandé.

La commande NPM crée un répertoire node_modules (s’il n’est pas déjà présent) dans lequel elle place tous les fichiers de la librairie. 
Ce répertoire contient un sous-dossier par librairie installée dans votre projet.

  Si vous utilisez Git pour versionner votre projet, il détectera la présence du dossier node_modules et de son contenu. 
  Je vous conseille de ne pas ajouter ce dossier dans l’historique Git. 
  Les librairies sont volumineuses, et peuvent être mises à jour plusieurs fois dans la vie d’un projet. 
  En stockant ce genre de dossier dans votre historique, vous risquez de l’alourdir inutilement. 
  En revanche, vous devez versionner le fichier package.json, car c’est lui qui indiquera quelles librairies installer.

En dehors du répertoire node_modules, la commande NPM mémorise que la librairie a été installée en ajoutant son nom dans le fichier package.json. 
Vous devrez versionner ce fichier dans l’historique Git afin de documenter les librairies utilisées dans votre projet.
*/

/* Utilisez la librairie pour enrichir votre projet

La librairie Chart.js est installée sur votre ordinateur, mais vous ne savez pas encore comment l’utiliser. 



Ajoutez un graphique sur le site des Bonnes Pièces

Placez les balises script et canvas dans le fichier HTML

La documentation nous indique qu’il faut ajouter une balise script dans notre fichier HTML pour importer la librairie dans notre page. Comme nous l’avons vu au chapitre précédent, les paquets téléchargés avec la commande NPM s’installent dans le répertoire node_modules. En explorant ce répertoire, on peut trouver l’emplacement du fichier à importer : node_modules/chart.js/dist/chart.umd.js.

Nous ajoutons donc la balise script avec le bon chemin, dans le fichier "index.html" :

   <head>
      ...
      <script src="node_modules/chart.js/dist/chart.umd.js" defer></script>
   </head>

L’attribut defer de la balise script permet de retarder le chargement de ce fichier à plus tard, lorsque le fichier index.html aura, lui-même, fini de se charger.

Continuons de suivre la documentation. Sur la page Get Started, on nous indique qu’il faut ajouter une balise canvas. Cette balise permet de dessiner librement à l’écran, en utilisant des lignes et des formes géométriques.

Ajoutons la balise canvas dans la balise section, après le bouton de mise à jour des pièces :

<h3>Aperçu des avis</h3>

<canvas id="graphique-avis" width="300" height="300"></canvas>


Calculez les données à afficher

Il faut maintenant trouver un type de graphique adapté à notre besoin. 
La documentation de Chart.js en propose déjà plusieurs sous le titre “Chart Types”. 
Parmi les liens proposés, l’option “Bar Chart” est probablement celle qui nous correspond.



Cependant, les barres sont verticales, alors que nous les voudrions à l’horizontale. 
Heureusement, en bas de la page, la documentation nous explique quelle option utiliser pour passer en mode horizontal. 
C’est parfait ! Nous avons trouvé le graphique adapté, et nous avons des exemples pour nous aider.

Avant d’afficher le graphique à l’écran, nous avons besoin de calculer les données qui seront affichées. 
La réponse de l’API HTTP à la requête GET /avis contient tous les avis, avec le nombre d’étoiles attribuées par chaque commentaire. 
Nous utilisons donc les données des avis pour calculer une liste de nombres correspondant à la quantité de commentaires avec une étoile, avec deux étoiles, et ainsi de suite.

On rajoute ce code de calcul à la fin du fichier avis.js dans une fonction asynchrone afficherGraphiqueAvis() :



Configurez la librairie pour afficher le graphique

Dans un premier temps, on configure une liste qui servira de légende aux barres horizontales. 
Le premier élément de la liste sera la barre la plus haute sur le graphique.

// Légende qui s'affichera sur la gauche à côté de la barre horizontale
const labels = ["5", "4", "3", "2", "1"];

Dans un deuxième temps, on rassemble toutes les données visibles sur le graphique dans un objet data. 
On y retrouve deux propriétés : "labels" et "datasets". 
La première a comme valeur la liste labels que l’on a définie juste avant, et la deuxième est une liste d’objets.

Chaque objet dans cette liste représente une série de données à afficher sur le graphique. 
En plaçant deux objets dans cette liste, on pourra avoir deux séries de données affichées, avec des couleurs différentes. 
Pour afficher le nombre d’étoiles, nous utiliserons un seul objet dans cette liste.

// Données et personnalisation du graphique
const data = {
   labels: labels,
   datasets: [{
    label: "Étoiles attribuées",
    data: nb_commentaires.reverse(),
     backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
   }],
};

Revenons ensemble sur la propriété datasets. Un objet de cette liste peut contenir, à son tour, plusieurs propriétés :

    label : le nom de la série de données. Elle s'affiche en haut du graphique avec la couleur correspondante utilisée pour les barres ;

    data : les données à mettre en forme ;

    backgroundColor : une chaîne de caractères spécifiant le code couleur pour la série de données.

Pour le moment, la liste nb_commentaires présente le nombre de commentaires par ordre croissant d’étoiles (de 1 à 5 étoiles). Nous devons donc inverser l’ordre de la liste, de manière à afficher les données par ordre décroissant, de 5 à 1 étoiles.

La couleur choisie correspond à un jaune doré. La valeur de la propriété backgroundColor est une chaîne de caractères qui reprend le format de la fonction CSS  rgba(rouge, vert, bleu, transparence)  .


Dans un troisième temps, on crée un objet de configuration qui indique le type de graphique, les données et une option pour rendre les barres horizontales.

// Objet de configuration final
const config = {
   type: "bar",
   data: data,
   options: {
      indexAxis: "y",
   },
};

Et enfin, il ne nous reste plus qu’à déclencher le rendu du graphique dans l’élément canvas.

// Rendu du graphique dans l'élément canvas
const graphiqueAvis = new Chart(
   document.querySelector("#graphique-avis"),
   config,
);

Il ne nous reste plus qu’à importer la fonction afficherGraphique avis dans pieces.js et à l’appeler à la fin du fichier.

Et voilà ! Notre joli graphique s’affiche sur notre page web !
*/

await afficherGraphiqueAvis();                                      // Nous importons notre fonction, puis à la fin de ce fichier, nous faisons appel à la fonction afficherGraphiqueAvis*/