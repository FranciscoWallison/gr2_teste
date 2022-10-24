
function api() {
    fetch(`http://localhost:3333/getitens`)
    .then(resposta => resposta.json())
    .then(json => {
        const select = document.getElementById('object');

        for (var i = 0; i < json.length; i++){
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = json[i].name_file;
            opt.setAttribute("data-rotation", json[i].rotation_x);
            opt.setAttribute("onclick", "doSomething(this);" );

            select.appendChild(opt);
        }
    })
}


function doSomething(params) {
   
    window["NAME_FILE"] = params.innerHTML;
    window["ROTATION_X"] = params.dataset.rotation;
    const element = document.getElementsByTagName("canvas")[0];
    element.remove()
    init();
}