const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
// const ideas = [
//     {
//         id: 1,
//         text: 'New text',
//         tag: 'Technology',
//         username: 'Young Universe',
//         date: '2023-09-09'
//     },
//     {
//         id: 2,
//         text: 'New text 2',
//         tag: 'Inventions',
//         username: 'Steve Rogers',
//         date: '2023-07-01'
//     },
//     {
//         id: 3,
//         text: 'New text 3',
//         tag: 'Technology',
//         username: 'Regina Falangee',
//         date: '2023-09-12'
//     }
// ];



// Get all Ideas
router.get('/', async(req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({success: true, data: ideas});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error: "Something went wrong"})        
    };
});

// get single idea
router.get('/:id', async (req, res) => {
 
   try {
       const idea = await Idea.findById(req.params.id);
    res.json({success: true, data: idea});

   } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "Something went wrong"});
   }
});

// router.get('/:id', (req, res) => {
//    const idea = ideas.find((idea) => idea.id === +req.params.id);
//     // check for errors first
//     if (!idea) {
//         return res.status(404).json({success: false, error: 'Resource not found'});
//     }

//     res.json({success: true, data: idea});
// });

// add an idea
router.post('/', async (req, res) => {
    const idea = new Idea({
        // id: ideas.length + 1,  //already catching id from MongoDB
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        // date: new Date().toISOString().slice(0, 10)
    });
    try {
        const savedIdea = await idea.save();
        res.send({success: true, data: savedIdea});

    } catch (error) {
        console.log(error);
    res.status(500).json({success: false, error: "Something went wrong"});
        
    }
})

// update an idea

router.put('/:id', async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            },
            {new: true}
        );
        res.json({success: true, data: updatedIdea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'});
    }
});


// delete an idea
router.delete('/:id', async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
    res.json({success: true, data: {}});

    } catch (error) {
        console.log(error);    
    res.status(500).json({success: false, error: 'Something went wrong'});    
    }
});





module.exports = router;