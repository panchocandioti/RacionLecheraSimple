import React from 'react';

// Este componente sólo proporciona un botón de RESET para recargar la página

function BotonReset() {
  const recargaPagina = () => {
    const isConfirmed = window.confirm('¿Vas a reiniciar la aplicación? ¿Guardaste los cambios que hiciste en la base de alimentos y en la ración? (Presiona "Cancelar" y guarda los cambios antes de reiniciar para no perder lo hecho hasta aquí).');
    if (isConfirmed) {
      window.location.reload();
    }
  };

  return (
    <button className="button" onClick={recargaPagina}>REINICIAR</button>
  );
}

export default BotonReset;