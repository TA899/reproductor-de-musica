# 🎵 Reproductor de Música MP3

Proyecto de **reproductor de música en el navegador** desarrollado con **HTML, CSS y JavaScript puro**, que permite reproducir canciones MP3 locales, controlar la reproducción y visualizar el audio en tiempo real mediante la **Web Audio API** y **Canvas**.

---

## 🚀 Características

* ▶️ Reproducir / ⏸ Pausar canciones
* ⏭ Siguiente / ⏮ Anterior pista
* 🎚 Barra de progreso interactiva
* 🎼 Información de la canción (título y artista)
* 🌈 Visualizador de audio animado en Canvas
* 📂 Canciones MP3 cargadas localmente
* 📱 Interfaz simple y responsive

---

## 🛠 Tecnologías utilizadas

* **HTML5** – estructura del reproductor
* **CSS3** – estilos y diseño
* **JavaScript (Vanilla)** – lógica del reproductor
* **Web Audio API** – análisis de frecuencias de audio
* **Canvas API** – visualización gráfica reactiva al sonido

---

## 📁 Estructura del proyecto

```
📦 reproductor-mp3
 ┣ 📂 music
 ┃ ┣ 🎵 Avenged_Sevenfold_-_Death.mp3
 ┃ ┣ 🎵 Stone_Temple_Pilots_-_Interstate_Love_Song.mp3
 ┃ ┗ 🎵 Slipknot_-_Before_I_Forget.mp3
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┗ 📜 script.js
```

---

## ▶️ Cómo usar el proyecto

1. Cloná o descargá este repositorio
2. Asegurate de tener las canciones MP3 dentro de la carpeta `music/`
3. Abrí `index.html` en tu navegador
4. ¡Disfrutá la música! 🎶

> ⚠️ **Nota:** algunos navegadores requieren interacción del usuario para habilitar el audio (click en play).

---

## 🎧 Canciones cargadas por defecto

Las canciones se definen en un arreglo dentro del archivo JavaScript:

```js
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
```

Podés agregar más canciones simplemente sumando nuevos objetos al arreglo.

---

## 🎨 Visualizador de audio

El visualizador utiliza:

* `AnalyserNode` para obtener frecuencias
* Figuras geométricas animadas
* Colores dinámicos basados en intensidad del sonido
* Efecto de "explosión" en frecuencias altas

Todo se renderiza en tiempo real con **Canvas**.

---

## 📌 Posibles mejoras

* Lista de reproducción dinámica
* Control de volumen
* Modo oscuro / claro
* Soporte para playlists externas
* Compatibilidad móvil mejorada

---

## 👤 Autor

**Tomás Mendoza**
Proyecto personal para práctica de JavaScript y APIs Web.

---

## 📄 Licencia

Este proyecto es de uso libre con fines educativos.

