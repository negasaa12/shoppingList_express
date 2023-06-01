const express = require('express');
const router = new express.Router();
const items = require("./fakeDb")


router.get('/', (req,res)=>{
    res.json({items})
})

router.post('/', (req,res)=>{

    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem)
    res.status(201).json({added: newItem})
})

router.get('/:name', (req,res)=>{
   const foundItem = items.find(item => item.name === req.params.name)

   
    res.json({item: foundItem})
})

router.patch('/:name', (req, res)=>{

    foundItem = items.find(item => item.name === req.params.name)
    foundItem.name = req.body.name
    res.json({updated: foundItem })
})

router.delete('/:name',(req,res)=>{


    foundItem = items.findIndex(item => item.name === req.params.name)

    items.splice(foundItem,1)
    res.json({message: 'Deleted'})
})



module.exports = router;