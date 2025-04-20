import React from 'react';

// Este componente sólo proporciona un botón de RESET para recargar la página

function BotonReset() {
  const recargaPagina = () => {
    const isConfirmed = window.confirm('¿Vas a reiniciar la aplicación? ¿Guardaste los cambios que hiciste en la ración y en la base de alimentos? (Presiona "Cancelar" y guarda los cambios para no perder lo hecho hasta aquí).');
    if (isConfirmed) {
      window.location.reload(true);
    }
  };

  return (
    <button className="button" onClick={recargaPagina}>REINICIAR</button>
  );
}

export default BotonReset;