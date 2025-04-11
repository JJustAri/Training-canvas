const canvas = document.getElementById('canvasLight');
const ctx = canvas.getContext('2d');

// Background gradient pour imiter le ciel
export function drawBackGround () {
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