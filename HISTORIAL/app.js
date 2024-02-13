// app.js
const express = require('express');
const app = express();
const port = 3000;

// Conexión con la base de datos SQLite
const sqlite3 = require('sqlite3').verbose();
const dbPath = './historial-resultados.db';
const db = new sqlite3.Database(dbPath);

// Creación de la tabla resultados si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS resultados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jugador1 TEXT,
      jugador2 TEXT,
      resultado TEXT,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de historial de resultados!');
});

// Ruta para obtener todos los resultados
app.get('/api/resultados', (req, res) => {
  db.all('SELECT * FROM resultados', (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(rows);
  });
});

// Ruta para agregar un nuevo resultado
app.post('/api/resultados', (req, res) => {
  const { jugador1, jugador2, resultado } = req.body;
  db.run('INSERT INTO resultados (jugador1, jugador2, resultado) VALUES (?, ?, ?)', [jugador1, jugador2, resultado], function(err) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Iniciar el servidor
app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
