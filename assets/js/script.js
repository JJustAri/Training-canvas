const canvas = document.getElementById('canvasLight');
ctx = canvas.getContext('2d');

let height;
let width;

// on ajoute un ecouteur d'evenement sur le redimenssionnement 
window.addEventListener('resize', resize);

// fonction pour changer la taille du canvas lorsque l'ecran est redimensionné
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

resize();

ctx.beginPath();

ctx.arc(100, 100, 10, 0, Math.PI * 2);
ctx.fillStyle = "yellow"
ctx.strokeStyle = 'black';
ctx.fill();
ctx.stroke();
ctx.closePath();