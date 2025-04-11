const canvas = document.getElementById('canvasLight');
const ctx = canvas.getContext('2d');

// Soleil
let blur = 0; // on déclare une variable blur pour gerer l'animation
let blurDirection = 0;

export function drawSun() {

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