// ----------------- Transición entre secciones -----------------
function showTabWithTransition(tab){
    const overlay = document.getElementById('transition-overlay');
    
    // Mostrar transición
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    
    setTimeout(() => {
        // Cargar contenido dinámicamente
        loadSection(tab);
        
        // Ocultar transición
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }, 500);
    }, 600);
}

// ----------------- Cargar secciones dinámicamente -----------------
function loadSection(sectionName) {
    const container = document.getElementById('content-container');
    
    // Usar fetch para cargar el contenido de la sección
    fetch(`sections/${sectionName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Sección no encontrada');
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            
            // Cargar scripts específicos de la sección si es necesario
            if (sectionName === 'musica') {
                loadScript('js/music.js');
            } else if (sectionName === 'comentarios') {
                loadScript('js/comments.js');
            }
            
            // Inicializar componentes específicos de la sección
            initializeSection(sectionName);
        })
        .catch(error => {
            console.error('Error cargando la sección:', error);
            container.innerHTML = '<div class="seccion"><h2>Error</h2><p>No se pudo cargar la sección solicitada.</p></div>';
        });
}

// ----------------- Cargar scripts dinámicamente -----------------
function loadScript(src) {
    // Verificar si el script ya está cargado
    if (document.querySelector(`script[src="${src}"]`)) {
        return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

// ----------------- Inicializar componentes específicos de sección -----------------
function initializeSection(sectionName) {
    switch(sectionName) {
        case 'musica':
            // Inicializar componentes de música si es necesario
            if (typeof initializeMusicSection === 'function') {
                initializeMusicSection();
            }
            break;
        case 'comentarios':
            // Inicializar componentes de comentarios si es necesario
            if (typeof initializeCommentsSection === 'function') {
                initializeCommentsSection();
            }
            break;
        // Añadir más casos según sea necesario
    }
}

// Cargar la sección de inicio por defecto
document.addEventListener('DOMContentLoaded', function() {
    loadSection('inicio');
});
