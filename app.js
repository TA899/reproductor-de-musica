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