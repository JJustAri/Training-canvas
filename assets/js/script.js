import { drawCloud } from './cloud.js';
import * as cloud from './cloud.js'
import { drawBackGround } from './background.js';
import { drawSun } from './sun.js';

// Récupération du canvas et son context
const canvas = document.getElementById('canvasLight');
const ctx = canvas.getContext('2d');

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
cloud.generateNuage(); // generation des nuages au (re)chargement de page

    function draw() {
    
    drawBackGround(); 
    drawSun();
    drawCloud();

    // Redessiner à chaque frame (les nuages seront dessinés avec une position différente pour donner une impression d'avancer)
    requestAnimationFrame(draw);
}

// Lancer l'animation lorsque l'image est chargée
cloud.nuageImg.onload = function() {
    draw();
};

}
