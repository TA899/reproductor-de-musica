const tituloCancion = document.querySelector('.reproductor-musica h1'); 
const artista = document.querySelector('.reproductor-musica p');
const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');
const anterior = document.querySelector('.boton-anterior');
const iconoInicioPausa = document.getElementById('icono-inicio-pausa');
const botonInicioPausa = document.querySelector('.boton-iniciar-pausa');
const siguiente = document.querySelector('.boton-siguiente');

const canciones = [
    {
        titulo: 'Death',
        artista: 'Avenged Sevenfold',
        fuente: 'music/Avenged_Sevenfold_-_Death.mp3'
    },
    {
        titulo: 'Interstate Love Song',
        artista: 'Stone Temple Pilots',
        fuente: 'music/Stone_Temple_Pilots_-_Interstate_Love_Song.mp3'
    },
    {
        titulo: 'Before I Forget',
        artista: 'Slipknot',
        fuente: 'music/Slipknot_-_Before_I_Forget.mp3'
    }
];


let indiceCancion = 0;

function ActualizarInfoCancion() {
tituloCancion.textContent = canciones[indiceCancion].titulo;
artista.textContent = canciones[indiceCancion].artista;
cancion.src = canciones[indiceCancion].fuente;
cancion.addEventListener('loadeddata',function() {});
};



botonInicioPausa.addEventListener('click', ReproducirPausa); 



function ReproducirPausa() {
        if (cancion.paused) {ReproducirCancion();} else {
        PausarCancion();
    }
}

function ReproducirCancion() {
  {
        cancion.play(); 
        iconoInicioPausa.classList.add('bi-pause-fill');
        iconoInicioPausa.classList.remove('bi-play-fill');
         
    }
}


function PausarCancion() {
     
        cancion.pause();
        iconoInicioPausa.classList.remove('bi-pause-fill');
        iconoInicioPausa.classList.add('bi-play-fill');
    
}

cancion.addEventListener('loadedmetadata', function() {
  progreso.max = cancion.duration;
});

cancion.addEventListener('timeupdate', function() {
if (!cancion.paused) {progreso.value = cancion.currentTime}
});

cancion.addEventListener('input', function() {
cancion.currentTime = progreso.value;
});


// Cuando la canción carga, configuramos el rango
cancion.addEventListener('loadedmetadata', function() {
  progreso.max = cancion.duration;
});

// Actualizar el progreso mientras la canción avanza
cancion.addEventListener('timeupdate', function() {
  progreso.value = cancion.currentTime;
});

// Mover el slider para cambiar el tiempo de la canción
progreso.addEventListener('input', function() {
  cancion.currentTime = progreso.value;
});

progreso.addEventListener('input', function() {
  cancion.currentTime = progreso.value;
  if (cancion.paused) {
    ReproducirCancion();
  }
});

//cancion.addEventListener('change', function() {
//    ReproducirCancion();
//});


siguiente.addEventListener('click', function() {
   indiceCancion = (indiceCancion+1) % canciones.length; 
   ActualizarInfoCancion();
   ReproducirCancion();});

anterior.addEventListener('click', function() {
   indiceCancion = (indiceCancion-1 + canciones.length) % canciones.length;  
   ActualizarInfoCancion();
   ReproducirCancion();
});


ActualizarInfoCancion();


const audio = document.getElementById("cancion");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

// Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const numFiguras = 30;
const figuras = [];

for (let i = 0; i < numFiguras; i++) {
  figuras.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    baseX: 0, // offset para animación explosiva
    baseY: 0,
    baseRadius: 15 + Math.random() * 25,
    hueOffset: Math.random() * 360,
    velocityX: 0,
    velocityY: 0
  });
}

// Dibujar y animar
function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  figuras.forEach((fig, i) => {
    const index = Math.floor(i * (bufferLength / numFiguras));
    const intensity = dataArray[index] / 255;

    // efecto “explosión”: solo para frecuencias altas
    if (index > bufferLength * 0.6) {
      const angle = Math.random() * 2 * Math.PI;
      const force = intensity * 10;
      fig.velocityX += Math.cos(angle) * force;
      fig.velocityY += Math.sin(angle) * force;
    }

    // Aplicar velocidad y fricción
    fig.baseX += fig.velocityX;
    fig.baseY += fig.velocityY;
    fig.velocityX *= 0.9;
    fig.velocityY *= 0.9;
    // Retornar suavemente a posición original
    fig.baseX *= 0.95;
    fig.baseY *= 0.95;

    const radius = fig.baseRadius * (0.5 + intensity);
    const color = `hsl(${(fig.hueOffset + performance.now()*0.02)%360}, 100%, ${intensity*60+20}%)`;

    const drawX = fig.x + fig.baseX;
    const drawY = fig.y + fig.baseY;

    // Círculo
    ctx.beginPath();
    ctx.arc(drawX, drawY, radius, 0, Math.PI*2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Triángulo pulsante
    ctx.beginPath();
    const triSize = radius;
    ctx.moveTo(drawX, drawY - triSize);
    ctx.lineTo(drawX - triSize, drawY + triSize);
    ctx.lineTo(drawX + triSize, drawY + triSize);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

audio.onplay = () => {
  if(audioCtx.state === "suspended") audioCtx.resume();
  draw();
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});