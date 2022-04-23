document.addEventListener('DOMContentLoaded', () => {
    const makeRequest = (typeOfReq = "GET", distination = "/elementsList", body) => {
        if(typeOfReq === "GET"){
            return fetch(distination);
        } else if (typeOfReq === "DELETE"){
            if(confirm("Вы уверены, что хотите удалить этот элемент?"))
                return fetch(distination, {method: typeOfReq});
            else
                return new Promise((res, rej) => {});
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

    const start = () => {
        const form = document.getElementById("elementForm"),
            cancelBtn = document.getElementById("cancel"),
            returnBtn = document.getElementById("return");
        let curState = Object.fromEntries(new FormData(form)), refresh = true;

        form.addEventListener('change', e => {
            if(e.target.tagName === "INPUT"){
                refresh = false;
            }
        });
        form.addEventListener('submit', async e => {
            e.preventDefault();
            if(refresh){
                return;
            }
            const formData = new FormData(e.target);
            curState = Object.fromEntries(formData);
            refresh = true;
            await makeRequest("PUT", document.URL, JSON.stringify(curState));
            document.title = form.querySelector("[name='name']").value;
            document.querySelector('.title').textContent = form.querySelector("[name='name']").value;
        });

        cancelBtn.addEventListener('click', e => {
            e.preventDefault();
            form.querySelectorAll("input").forEach(item => {
                item.value = curState[item.name];
            });
            refresh = true;
        });

        returnBtn.addEventListener('click', e => {
            e.preventDefault();
            if(!refresh){
                if(confirm("У вас остались несохраненные изменения. Все равно покинуть страницу?"))
                    window.location.href = '/';
            } else
                window.location.href = '/';
        });


    }
    start();
});