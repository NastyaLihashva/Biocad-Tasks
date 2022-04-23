const router = require('express').Router();
const { findIdItem } = require('./functions');
const elements = require("../db");
const jsonParser = require('express').json();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const element = findIdItem(elements, id); //находим книгу с id
    res.render('element', { element: element, title: element.name }); //загрузка книги
});

router.put('/:id', (req, res)=>{
    const body = {
        ...req.body,
        id: req.params.id,
    };
    res.redirect(`../../?value=${JSON.stringify(body)}`);
});

router.delete('/:id', (req, res)=>{
    res.redirect(`../../?value=${req.params.id}`);
});

module.exports = router;