const path = require('path');
const express = require('express');
let savedNotes = require('./Develop/db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = savedNotes.length.toString();

    savedNotes.push(newNote);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(savedNotes));

    res.json(savedNotes);
});

app.get('/api/notes', (req, res) => {
    res.json(savedNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    savedNotes = savedNotes.filter(note => {
        return note.id !== id;
    });

    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(savedNotes));

    return res.send();
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});