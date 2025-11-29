// ----------------- Loader (2 segundos fijo) -----------------
setTimeout(() => { 
    document.getElementById("loader").style.display = "none"; 
}, 2000);

// ----------------- Transición entre secciones -----------------
function showTabWithTransition(tab){
    const overlay = document.getElementById('transition-overlay');
    
    // Mostrar transición
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    
    setTimeout(() => {
        // Cambiar de sección
        showTab(tab);
        
        // Ocultar transición
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }, 500);
    }, 600);
}

// ----------------- Tabs -----------------
function showTab(tab){
  ['inicio', 'musica', 'visuales', 'redes', 'comentarios', 'altavoces'].forEach(t => {
      const element = document.getElementById(t);
      if (element) {
          element.style.display = 'none';
          element.className = t === 'inicio' ? '' : 'seccion';
      }
  });
  
  const tabElement = document.getElementById(tab);
  if (tabElement) {
      tabElement.style.display = 'block';
  }
}

// ----------------- Comentarios -----------------
function addComment(){
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  const section = document.getElementById('comment-section');
  const div = document.createElement('div');
  div.className = 'comment';
  div.innerHTML = `<strong>${name}</strong>: ${comment}`;
  section.prepend(div);
  document.getElementById('comment-form').reset();
  return false;
}

// ----------------- Sistema de Likes/Dislikes -----------------
function rateItem(button, type) {
    const container = button.closest('.like-dislike');
    const likeCount = container.querySelector('.like-count');
    const dislikeCount = container.querySelector('.dislike-count');
    const likeBtn = container.querySelector('.like-btn');
    const dislikeBtn = container.querySelector('.dislike-btn');
    
    // Obtener estado actual del localStorage
    const itemId = container.closest('.vinyl-item, .video-item').querySelector('.vinyl-title, .video-title').textContent;
    const storageKey = `rating_${itemId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const currentRating = JSON.parse(localStorage.getItem(storageKey) || '{"liked":false,"disliked":false}');
    
    if (type === 'like') {
        if (currentRating.liked) {
            // Quitar like
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
            currentRating.liked = false;
            likeBtn.style.opacity = '1';
        } else {
            // Poner like
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            currentRating.liked = true;
            likeBtn.style.opacity = '0.8';
            
            // Si tenía dislike, quitarlo
            if (currentRating.disliked) {
                dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
                currentRating.disliked = false;
                dislikeBtn.style.opacity = '1';
            }
        }
    } else if (type === 'dislike') {
        if (currentRating.disliked) {
            // Quitar dislike
            dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
            currentRating.disliked = false;
            dislikeBtn.style.opacity = '1';
        } else {
            // Poner dislike
            dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
            currentRating.disliked = true;
            dislikeBtn.style.opacity = '0.8';
            
            // Si tenía like, quitarlo
            if (currentRating.liked) {
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
                currentRating.liked = false;
                likeBtn.style.opacity = '1';
            }
        }
    }
    
    // Guardar en localStorage
    localStorage.setItem(storageKey, JSON.stringify(currentRating));
}

// Cargar ratings al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    const ratingContainers = document.querySelectorAll('.like-dislike');
    ratingContainers.forEach(container => {
        const itemId = container.closest('.vinyl-item, .video-item').querySelector('.vinyl-title, .video-title').textContent;
        const storageKey = `rating_${itemId.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const currentRating = JSON.parse(localStorage.getItem(storageKey) || '{"liked":false,"disliked":false}');
        
        if (currentRating.liked) {
            container.querySelector('.like-count').textContent = '1';
            container.querySelector('.like-btn').style.opacity = '0.8';
        }
        if (currentRating.disliked) {
            container.querySelector('.dislike-count').textContent = '1';
            container.querySelector('.dislike-btn').style.opacity = '0.8';
        }
    });
});

// ----------------- Efectos de texto con fallos/glitches aleatorios -----------------
function addTextGlitches() {
    const titles = document.querySelectorAll('h1, h2, .vinyl-title, .video-title');
    
    titles.forEach(title => {
        // Añadir un efecto de parpadeo aleatorio ocasional
        setInterval(() => {
            if (Math.random() > 0.7) {
                title.style.opacity = '0.7';
                setTimeout(() => {
                    title.style.opacity = '1';
                }, 100);
            }
        }, 3000);
        
        // Efecto de desplazamiento sutil ocasional
        setInterval(() => {
            if (Math.random() > 0.9) {
                const originalTransform = title.style.transform;
                title.style.transform = 'translateX(2px)';
                setTimeout(() => {
                    title.style.transform = originalTransform;
                }, 50);
            }
        }, 5000);
    });
}

// Iniciar efectos cuando la página cargue
window.addEventListener('load', addTextGlitches);
</script>

<script>
function showTabWithTransition(tabId) {
  document.querySelectorAll('.seccion, #inicio, #musica, #visuales, #redes, #comentarios, #altavoces, #dj')
    .forEach(section => section.style.display = 'none');

  const section = document.getElementById(tabId);
  if (section) section.style.display = 'block';
}
</script>

<script>
// --- Función de pantalla completa para el DJ ---
function toggleFullScreenDJ() {
  const iframe = document.getElementById('djPlayer');
  if (!document.fullscreenElement) {
    iframe.requestFullscreen().catch(err => alert('No se pudo activar pantalla completa: ' + err));
  } else {
    document.exitFullscreen();
  }
}

// --- Mostrar/ocultar lanzamientos según DJ ---
let djActivo = null;

function toggleDJ(dj) {
  const lanzamientosFlugel = document.getElementById('lanzamientos-flugel');
  const lanzamientosTouxman = document.getElementById('lanzamientos-touxman');
  const djFlugel = document.getElementById('dj-flugel');
  const djTouxman = document.getElementById('dj-touxman');
  
  if (djActivo === dj) {
    // Si haces clic en el mismo DJ, ocultar los lanzamientos
    lanzamientosFlugel.classList.remove('active');
    lanzamientosTouxman.classList.remove('active');
    djFlugel.classList.remove('active');
    djTouxman.classList.remove('active');
    djActivo = null;
  } else {
    // Mostrar los lanzamientos del DJ seleccionado
    if (dj === 'flugel') {
      lanzamientosFlugel.classList.add('active');
      lanzamientosTouxman.classList.remove('active');
      djFlugel.classList.add('active');
      djTouxman.classList.remove('active');
      djActivo = 'flugel';
      
      // Desplazar suavemente a los lanzamientos
      setTimeout(() => {
        lanzamientosFlugel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else if (dj === 'touxman') {
      lanzamientosFlugel.classList.remove('active');
      lanzamientosTouxman.classList.add('active');
      djFlugel.classList.remove('active');
      djTouxman.classList.add('active');
      djActivo = 'touxman';
      
      // Desplazar suavemente a los lanzamientos
      setTimeout(() => {
        lanzamientosTouxman.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }
}
    // --- Sistema de páginas detalladas de lanzamientos ---
function mostrarLanzamientoDetalle(lanzamientoId) {
    // Ocultar todos los detalles primero
    document.querySelectorAll('.lanzamiento-detalle').forEach(detalle => {
        detalle.classList.remove('active');
    });
    
    // Mostrar el detalle seleccionado
    const detalle = document.getElementById('detalle-' + lanzamientoId);
    if (detalle) {
        detalle.classList.add('active');
        // Desplazar suavemente al detalle
        setTimeout(() => {
            detalle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

function volverALanzamientos() {
    document.querySelectorAll('.lanzamiento-detalle').forEach(detalle => {
        detalle.classList.remove('active');
    });
}
    
