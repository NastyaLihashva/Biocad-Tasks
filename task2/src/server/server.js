const express = require("express");

const path = require("path");
const routerIndex = require("./routes/routerIndex");
const routerElements = require("./routes/routerElements");
const routerElementItem = require('./routes/routerElementItem');

const app = express();
app.use('/public', express.static(__dirname + '/public'));
app.set("view engine", "pug");
app.set("views", __dirname + `/views`);
app.use(express.json());

app.use('/', routerIndex);
app.use('/elementsList', routerElements);
app.use('/elementsList', routerElementItem);

app.listen(3000);