document.addEventListener("DOMContentLoaded", () => {
    const makeRequest = (typeOfReq = "GET", distination = "/elementsList", body) => { //ajax (fetch)
        if(typeOfReq === "GET"){ //get
            return fetch(distination);
        } else if (typeOfReq === "DELETE"){
            return fetch(distination, {method: typeOfReq});
        }
        else {
            return fetch(distination, {
                method: typeOfReq,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: body
            });
        }
    };

    const toDate = (string) => {
        const array = string.split('.');
        return new Date(+array[2], +array[1], +array[0]);
    }

    const getData = async () => {
        const resp = await makeRequest();
        if (resp.ok) {
            return await resp.json();
        } else {
            alert("Ошибка HTTP: " + resp.status);
            return;
        }
    }

    const updatePage = data => {
        const tbody = document.querySelector('tbody');
        tbody.textContent = "";
        data.forEach(item => {
            tbody.insertAdjacentHTML('beforeend', `
            <tr class="table__row">
                <td class="table__id table__cell">${item.id}</td>
                <td class="table-name table__cell">${item.name}</td>
                <td class="table-type table__cell">${item.type}</td>
                <td class="table-age table__cell">${item.age}</td>
                <td class="table__cell">
                    <div class="table__actions">
                        <button class="button action-remove">
                            <span>Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
            `);
        });
    }

    const start = async () => {
        let data = await getData();
        const filterSelect = document.getElementById("filterType");
        const tbody = document.querySelector("tbody");
        tbody.addEventListener('click', async e => {
            let target = e.target.closest(".action-remove");
            if(target){ //удаление
                if(!confirm("Вы уверены, что хотите удалить этот элемент?")){
                    return;
                }
                const id = target.closest(".table__row").querySelector(".table__id").textContent; //получение id (какую строку удалить)
                data = await makeRequest("DELETE", `/elementsList/${id}`);
                data = await data.json(); //обновленные данные
                updatePage(data); //обновление страницы
            } else {
                target = e.target.closest('.table__row');
                if(target){ //если открыть строчку - карточка книги
                    window.location.href = `/elementsList/${target.querySelector('.table__id').textContent}`; //перевод на страницу книги
                }
            }
        });

        const modal = document.getElementById('modal'); //модальное окно
        modal.addEventListener('click', e => { //закрываем окно
            if(e.target.closest('.button__close') || e.target.closest('.cancel-button') || e.target.matches('.modal__overlay')){
                modal.querySelector('form').reset();
                modal.style.display = "none";
            }
        });

        const addBtn = document.querySelector(".btn-addItem");
        addBtn.addEventListener('click', () => modal.style.display = 'flex');

        const form = document.querySelector("form");
        form.addEventListener('submit', async e => {
            e.preventDefault();
            modal.style.display = "none";
            let formData = new FormData(e.target);
            formData = JSON.stringify(Object.fromEntries(formData));
            data = await makeRequest("POST", "/", formData);
            data = await data.json();
            updatePage(data);
            form.reset();
        });
        filterSelect.dispatchEvent(new Event("change"));
    }

    start();

});