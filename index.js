/* === FUNCIONES JAVASCRIPT === */
/* Función para compartir el enlace en móviles */
function compartirEnlace() {
  const url = "https://cotizaplanmedico.github.io/";
  const title = document.title || "Business Card";
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(() => {
      // Si falla el share, intentar copiar el enlace
      copiarEnlaceAlPortapapeles(url);
    });
  } else {
    // Fallback para desktop o navegadores sin soporte
    copiarEnlaceAlPortapapeles(url);
  }
}

// Función auxiliar para copiar el enlace al portapapeles con manejo de errores
function copiarEnlaceAlPortapapeles(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Enlace copiado al portapapeles: " + url);
      })
      .catch(() => {
        // Fallback para navegadores que no permiten clipboard
        copiarManual(url);
      });
  } else {
    copiarManual(url);
  }
}

// Fallback manual para copiar el enlace en navegadores antiguos o móviles
function copiarManual(url) {
  const tempInput = document.createElement('input');
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para móviles
  try {
    document.execCommand('copy');
    alert("Enlace copiado al portapapeles: " + url);
  } catch (err) {
    alert("No se pudo copiar el enlace. Copia manualmente: " + url);
  }
  document.body.removeChild(tempInput);
}

/* Función que muestra la lista de servicios disponibles */
/* PARA EDITAR: Cambiar el texto dentro de alert() por tus servicios */
function mostrarServicios() {
  alert("Servicios disponibles:\n\n• Plan médico Individual o Familiar\n• Planes Médicos Grupales (PYMES)\n• Medicare Advantage");
}

/* Función para agregar contacto - Compatible con móviles */
function agregarContacto() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Wallesca Méndez
N:Méndez;Wallesca;;;
ORG:Cotiza Plan Médico;
TEL;TYPE=CELL:787-585-4322
EMAIL:cotizaplanmedico@outlook.com
URL:https://www.cotizaplanmedico.com
ADR:;;Caguas;Puerto Rico;;;
NOTE:Servicios: Plan médico Individual o Familiar, Planes Médicos Grupales (PYMES), Medicare Advantage
END:VCARD`;

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Para dispositivos móviles, crear un enlace temporal y hacer click
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WallescaMendez_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Limpiar después de un breve delay
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    // Para desktop, usar el método tradicional
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WallescaMendez_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
