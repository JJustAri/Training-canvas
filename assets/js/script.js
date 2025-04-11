// Récupération du canvas et son context
const canvas = document.getElementById('canvasLight');
ctx = canvas.getContext('2d');

// Initialisation des variables hauteur et largeur
if(ctx) {
let height;
let width;

// on ajoute un écouteur d'évènement sur le redimenssionnement 
window.addEventListener('resize', resize);

// fonction pour changer la taille du canvas lorsque l'écran est redimensionné
function resize() {

    height = window.innerHeight;
    width = window.innerWidth;

    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(scale, scale);
}

// on lance la fonction a chaque rechargement de page
resize();

const nuageCount = Math.floor(window.innerWidth / 120); // on va creer un nombre de nuage proportionnel a la taille de la fenêttre
const nuageImg = new Image(); // création d'une nouvelle image
nuageImg.src = '/assets/image/nuage.png'; // on ajoute le lien de notre image
let nuages = [];


// CREATION DES NUAGES
let times = 15;     // le nombre de fois que l'on va diviser l'axe X (pour avoir des positions différentes)
let x = []          // initialisation d'un tableau vide qui va stocker les différentes positions
let divide = 0;     // Variable que l'on va incrémenter 

for (i = 0; i < times; i++) {
    divide += canvas.width / times;
    x.push(divide); // on ajoute au tableau la valeur incrémenté
}
console.log(x)

let y =  [10, 25, 50, 75, 100, 125, 140, 150, 160]; // un tableau contenant différente hauteur 
let nuageSize = [100, 115, 125, 135, 150, 160, 175]; // différente taille de nuage
vitesse = [0.5, -0.5, 0.6, -0.6, 0.7, -0.7] // différente vitesse

// Fonction pour creer nos nuages 
function generateNuage () {
for (i = 0; i < nuageCount; i++) { // creation d'un objet pour chaque nuage avec des caracteristique aléatoire
    nuages.push({
        x : x[Math.floor(Math.random()*x.length)],                      //position x de départ
        y : y[Math.floor(Math.random()*y.length)],                      // position y
        Size : nuageSize[Math.floor(Math.random()*nuageSize.length)],   // taile du nuage
        vitesse : vitesse[Math.floor(Math.random()*vitesse.length)] // vitesse et direction du nuage
    })
}
}
generateNuage(); // generation des nuages au (re)chargement de page

console.log(nuages)

    function draw() {
    
    drawBackGround();
    drawSun();
    drawCloud();


    // Redessiner à chaque frame (le nuage sera dessiné avec une position différente pour donner une impression d'avancer)
    requestAnimationFrame(draw);
}

// Background gradient pour imiter le ciel
function drawBackGround () {
let linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    linearGradient.addColorStop(0.1, 'rgba(58, 113, 231, 0.6)');
    linearGradient.addColorStop(0.5, 'rgba(177, 222, 247, 1)');
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Effet radial lumineux
    let radialGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 6, canvas.height / 2, canvas.width / 2);
    radialGradient.addColorStop(0, 'rgba(41, 196, 255, 0.2)');
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

// Soleil

let blur = 0; // on déclare une variable blur pour gerer l'animation
let blurDirection = 0;

function drawSun() {

if (blur < 15) { //si le blur est en dessous de 15 on met la direction en positive
    blurDirection = 0.05;
}

if(blur > 45) {
        blurDirection = -0.05; // pareil mais négatif, cela va servir a alterner le gain et la perte de blur
}

blur += blurDirection; // on ajoute a blur 0.05 ou -0.05 a chaque frame 

ctx.beginPath();        
ctx.arc(180, 100, 50, 0, Math.PI * 2);  // déssin du soleil
ctx.fillStyle = "rgb(255, 253, 128)";
ctx.strokeStyle = 'rgb(255, 254, 171)';
ctx.shadowColor = 'rgb(255, 254, 171)';
ctx.shadowBlur = blur; // on défini a le shadowblur avec la valeur de blur qui se met a jour a chaque frame

ctx.fill();
ctx.closePath();

ctx.shadowBlur = 0; // on reinitialise le shadowblur pour eviter qu'il aille sur d'autre éléments
    ctx.shadowColor = "transparent";

}
// Lancer l'animation lorsque l'image est chargée
nuageImg.onload = function() {
    draw();
};


function drawCloud() {

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

}
