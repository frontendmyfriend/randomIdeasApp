const express = require('express');
const port = 5000;
const app = express();
const ideas = [
    {
        id: 1,
        text: 'New text',
        tag: 'Technology',
        username: 'Young Universe',
        date: '2023-09-09'
    },
    {
        id: 2,
        text: 'New text 2',
        tag: 'Inventions',
        username: 'Steve Rogers',
        date: '2023-07-01'
    },
    {
        id: 3,
        text: 'New text 3',
        tag: 'Technology',
        username: 'Regina Falangee',
        date: '2023-09-12'
    }
];

app.get('/', (req, res) => {
    res.send({message: 'Welcome to the RandomIdeas API'});
});


// Get all Ideas
app.get('/api/ideas', (req, res) => {
    res.json({success: true, data: ideas});
});

app.get('/api/ideas/:id', (req, res) => {
   const idea = ideas.find((idea) => idea.id === +req.params.id);
    // check for errors first
    if (!idea) {
        return res.status(404).json({success: false, error: 'Resource not found'});
    }

    res.json({success: true, data: idea});
});



app.listen(port, () => console.log(`Server listening on port ${port}`));

