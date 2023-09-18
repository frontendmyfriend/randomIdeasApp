const express = require('express');
const router = express.Router();

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



// Get all Ideas
router.get('/', (req, res) => {
    res.json({success: true, data: ideas});
});

// get single idea
router.get('/:id', (req, res) => {
   const idea = ideas.find((idea) => idea.id === +req.params.id);
    // check for errors first
    if (!idea) {
        return res.status(404).json({success: false, error: 'Resource not found'});
    }

    res.json({success: true, data: idea});
});

// add an idea
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10)
    };
    ideas.push(idea)
 
    res.send({success: true, data: idea});
})

// update an idea

router.put('/:id', (req, res) => {
   const idea = ideas.find((idea) => idea.id === +req.params.id);
    // check for errors first
    if (!idea) {
        return res.status(404).json({success: false, error: 'Resource not found'});
    }
    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;

    res.json({success: true, data: idea});
});


// delete an idea
router.delete('/:id', (req, res) => {
   const idea = ideas.find((idea) => idea.id === +req.params.id);
    // check for errors first
    if (!idea) {
        return res.status(404).json({success: false, error: 'Resource not found'});
    }

    const index = ideas.indexOf(idea);
    ideas.splice(index, 1);

    res.json({success: true, data: {}});
});





module.exports = router;