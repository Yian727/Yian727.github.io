const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'settings.json');

function readSettings() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
  } catch {}
  return null;
}

function writeSettings(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// GET settings
router.get('/', (req, res) => {
  const settings = readSettings();
  if (!settings) return res.status(404).json({ error: 'Settings not initialized' });
  res.json(settings);
});

// PUT update settings
router.put('/', (req, res) => {
  const current = readSettings() || {};
  const updated = { ...current, ...req.body };
  writeSettings(updated);
  res.json(updated);
});

module.exports = router;
