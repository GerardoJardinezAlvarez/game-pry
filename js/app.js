document.addEventListener('DOMContentLoaded', () => {
    const difficulties = {
      easy: { size: 4, attempts: 10 },
      normal: { size: 6, attempts: 15 },
      hard: { size: 8, attempts: 20 },
      extreme: { size: 10, attempts: 25 }
    };
  
    // Obtener el parámetro de dificultad de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');
    
    // Verificar si la dificultad es válida
    if (!difficulty || !difficulties[difficulty]) {
      alert('Dificultad no válida. Serás redirigido al menú de selección.');
      window.location.href = 'difficulty.html';
      return;
    }
  
    let treasurePosition = null;
    let attemptsLeft = 0;
    let boardSize = 0;
  
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const notification = document.getElementById('notification');
  
    // Inicializar el juego según la dificultad seleccionada
    function startGame({ size, attempts }) {
      board.innerHTML = '';
      treasurePosition = Math.floor(Math.random() * (size * size));
      attemptsLeft = attempts;
      boardSize = size;
  
      attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
      
      // Aplicar las columnas dinámicamente al tablero
      board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  
      // Generar las casillas
      for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
  
        // Manejar el clic en las casillas
        cell.addEventListener('click', () => handleCellClick(cell, i));
        
        board.appendChild(cell);
      }
    }
  
    // Manejar el clic en una celda
    function handleCellClick(cell, index) {
      if (attemptsLeft <= 0) return;
  
      if (parseInt(index) === treasurePosition) {
        cell.classList.add('treasure-found');
        message.textContent = '¡Has encontrado el tesoro!';
        disableBoard();
        showNotification('¡Felicidades! Has encontrado el tesoro.', 'success');
        setTimeout(() => resetGame(), 3000);
      } else {
        cell.classList.add('missed');
        attemptsLeft--;
        attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
        if (attemptsLeft <= 0) {
          message.textContent = '¡Se han agotado los intentos!';
          disableBoard();
          showNotification('¡Has fallado! No lograste encontrar el tesoro.', 'failure');
          setTimeout(() => resetGame(), 3000);
        }
      }
    }
  
    // Deshabilitar el tablero al finalizar el juego
    function disableBoard() {
      const cells = board.querySelectorAll('.cell');
      cells.forEach(cell => cell.classList.add('disabled'));
    }
  
    // Mostrar notificación en pantalla
    function showNotification(message, type) {
      notification.textContent = message;
      notification.classList.add(type);
      notification.classList.add('show');
      setTimeout(() => notification.classList.remove('show', type), 3000);
    }
  
    // Reiniciar el juego y redirigir al menú de selección de dificultad
    function resetGame() {
      window.location.href = 'difficulty.html';
    }
  
    // Iniciar el juego con la dificultad seleccionada
    startGame(difficulties[difficulty]);
  });
  