// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const resultadosContainer = document.getElementById('resultados');
  
    // Cargar los resultados desde el archivo JSON
    fetch('resultados.json')
      .then(response => response.json())
      .then(resultados => {
        // Mostrar los resultados en la página
        resultados.forEach(resultado => {
          const resultadoElement = document.createElement('div');
          resultadoElement.classList.add('resultado');
          resultadoElement.innerHTML = `
            <p><strong>Jugadores:</strong> ${resultado.jugador1} vs ${resultado.jugador2}</p>
            <p><strong>División:</strong> ${resultado.division}</p>
            <p><strong>Mes:</strong> ${resultado.mes}</p>
          `;
          resultadosContainer.appendChild(resultadoElement);
        });
      })
      .catch(error => console.error('Error al cargar los resultados:', error));
  });
  