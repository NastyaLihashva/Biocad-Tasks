const router = require('express').Router();
const elements = require("../db");
let actualElements = elements;
const {findIdIndex, idGenerator, writeToFile} = require("./functions");

router.get('/', (req, res) => {
    res.render('index', { dbArray: elements});
});


router.post('/', (req, res) => {
    let element = req.body;
    element = {
        ...element,
        id: idGenerator(),
    }
    elements.push(element);
    actualElements = elements;
    writeToFile(JSON.stringify(elements));
    res.json(actualElements);
});

router.put('/', (req, res) => {
    const element = JSON.parse(req.query.value);
    const index = findIdIndex(elements, element.id);
    if(index !== -1){
        elements[index] = element;
        const elementJson = JSON.stringify(elements);
        writeToFile(elementJson);
    } else {
        console.warn("Книги с таким индексом не существует");
    }
    res.render('index', { dbArray: elements});
});

router.delete('/', (req, res)=>{
    const id = req.query.value;
    const index = findIdIndex(elements, id);
    const actualIndex = findIdIndex(actualElements, id);
    if(index !== -1){
        elements.splice(index, 1);
        actualElements.splice(actualIndex, 1);
        writeToFile(JSON.stringify(elements));
    } else {
        console.warn("Книги с таким индексом не существует");
    }
    res.json(actualElements);
});

module.exports = router;