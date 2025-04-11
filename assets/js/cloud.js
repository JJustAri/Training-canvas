const canvas = document.getElementById('canvasLight');
const ctx = canvas.getContext('2d');

const nuageCount = Math.floor(window.innerWidth / 120); // on va creer un nombre de nuage proportionnel a la taille de la fenêttre
const nuageImg = new Image(); // création d'une nouvelle image
nuageImg.src = '/assets/image/nuage.png'; // on ajoute le lien de notre image
let nuages = [];


export function drawCloud() {

    nuages.forEach(nuage => {
    
        ctx.drawImage(nuageImg, nuage.x, nuage.y, nuage.Size, nuage.Size);
    
        nuage.x += nuage.vitesse;
         // Faire bouger les nuages
        
        //  Si les nuages dépassent la largeur droite du canvas, les ramener à gauche
    if (nuage.x > canvas.width && nuage.vitesse > 0) {
        nuage.x = -150;
    
    }
        // et vice-versa
    if (nuage.x < -canvas.width && nuage.vitesse < 0) {
        nuage.x = window.innerWidth;
    
    }
    
    })
    }
    
    // CREATION DES NUAGES
    let times = 15;     // le nombre de fois que l'on va diviser l'axe X (pour avoir des positions différentes)
    let x = []          // initialisation d'un tableau vide qui va stocker les différentes positions
    let divide = 0;     // Variable que l'on va incrémenter 
    
    for (let i = 0; i < times; i++) {
        divide += canvas.width / times;
        x.push(divide); // on ajoute au tableau la valeur incrémenté
    }
    
    let y =  [10, 25, 50, 75, 100, 125, 140, 150, 160]; // un tableau contenant différente hauteur 
    let nuageSize = [100, 115, 125, 135, 150, 160, 175]; // différente taille de nuage
    let vitesse = [0.5, -0.5, 0.6, -0.6, 0.7, -0.7] // différente vitesse

    // Fonction pour creer nos nuages 
export function generateNuage () {

    for (let i = 0; i < nuageCount; i++) { // creation d'un objet pour chaque nuage avec des caracteristique aléatoire
        nuages.push({
            x : x[Math.floor(Math.random()*x.length)],                      //position x de départ
            y : y[Math.floor(Math.random()*y.length)],                      // position y
            Size : nuageSize[Math.floor(Math.random()*nuageSize.length)],   // taile du nuage
            vitesse : vitesse[Math.floor(Math.random()*vitesse.length)] // vitesse et direction du nuage
        })
    }
    }

    export {nuageImg}