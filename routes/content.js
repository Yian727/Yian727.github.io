const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'content.json');

function readContent() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
  } catch {}
  return null;
}

function writeContent(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// GET content
router.get('/', (req, res) => {
  const content = readContent();
  if (!content) return res.status(404).json({ error: 'Content not initialized' });
  res.json(content);
});

// PUT update content (full or partial)
router.put('/', (req, res) => {
  const current = readContent() || {};
  const updated = { ...current, ...req.body };
  writeContent(updated);
  res.json(updated);
});

module.exports = router;
