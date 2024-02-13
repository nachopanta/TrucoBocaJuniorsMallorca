// routes/resultados.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para obtener todos los resultados
router.get('/', (req, res) => {
  db.all('SELECT * FROM resultados', (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(rows);
  });
});

// Ruta para agregar un nuevo resultado
router.post('/', (req, res) => {
  const { jugador1, jugador2, resultado } = req.body;
  db.run('INSERT INTO resultados (jugador1, jugador2, resultado) VALUES (?, ?, ?)', [jugador1, jugador2, resultado], function(err) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.json({ id: this.lastID });
  });
});

module.exports = router;
