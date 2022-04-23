const router = require('express').Router();
const elements = require("../db");
router.get('/', (req, res)=>{
    res.json(elements); //получаем все книги
});
module.exports = router;