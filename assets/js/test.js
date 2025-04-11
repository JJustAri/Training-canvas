nuages.forEach(nuage => {
    function draw() {
    
        drawBackGround();
        drawSun();
    
        ctx.drawImage(nuageImg, nuage.x, nuage.y, nuage.Size, nuage.Size);
         // 
         x += nuageVitesse;
       
    
        // Si les nuages dépassent la largeur du canvas, les ramener à gauche
        if (x > canvas.width && nuageVitesse > 0) {
            x = -150;
            ramdomY = y[Math.floor(Math.random() * y.length)];
            ramdomSize = nuageSize[Math.floor(Math.random() * nuageSize.length)];
        }
    
        
    
    
        // Redessiner à chaque frame (le nuage sera dessiné avec une position différente pour donner une impression d'avancer)
        requestAnimationFrame(draw);
    }
    

     // Faire bouger les nuages

})


function drawNuage () {
    nuages.forEach(nuage => {
        
            ctx.drawImage(nuageImg, nuage.x, nuage.y, nuage.Size, nuage.Size);
             // 
            x += nuageVitesse;

})

}