const fs = require("fs");

exports.idGenerator = () => '_' + Math.random().toString(36).substr(2, 9); //рандомная генерация id

exports.findIdItem = (elements, id) => { //поиск книги
    for(let i = 0; i < elements.length; i++){
        if(elements[i].id === id)
            return elements[i];
    }
}

exports.findIdIndex = (elements, id) => { //поиск индекса
    for(let i = 0; i < elements.length; i++) {
        if (elements[i].id === id)
            return i;
    }
    return -1;
};

exports.writeToFile = elementJson => { //запись в базу данных
    try{
        fs.writeFile('./server/db.json', elementJson, (err) => {
            if (err) throw err;
            console.log('База данных успешно обновлена');
        });
    } catch (err) {
        console.error(err);
    }
}

exports.toDate = (string) => {
    const array = string.split('.');
    const date = new Date(+array[2], +array[1]-1, +array[0]);
    return date.getTime();
}

