const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'team.json');

function readTeam() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
  } catch {}
  return [];
}

function writeTeam(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all team members
router.get('/', (req, res) => {
  res.json(readTeam());
});

// GET single team member
router.get('/:id', (req, res) => {
  const team = readTeam();
  const member = team.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

// POST create member
router.post('/', (req, res) => {
  const team = readTeam();
  const newMember = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    ...req.body
  };
  team.push(newMember);
  writeTeam(team);
  res.status(201).json(newMember);
});

// PUT update member
router.put('/:id', (req, res) => {
  const team = readTeam();
  const index = team.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Member not found' });
  team[index] = { ...team[index], ...req.body };
  writeTeam(team);
  res.json(team[index]);
});

// PUT bulk update
router.put('/', (req, res) => {
  if (Array.isArray(req.body)) {
    writeTeam(req.body);
    res.json(req.body);
  } else {
    res.status(400).json({ error: 'Expected array' });
  }
});

// DELETE member
router.delete('/:id', (req, res) => {
  let team = readTeam();
  team = team.filter(m => m.id !== req.params.id);
  writeTeam(team);
  res.json({ success: true });
});

module.exports = router;
