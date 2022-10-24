const express = require("express");
var path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.static(path.join(__dirname, '/gr2-web')));

app.get("/",(req, res) =>{
    res.sendFile(__dirname + "/src/index.html")
} )

app.get("/gr",(req, res) =>{
    res.sendFile(__dirname + "/gr2-web/index.html")
} )


app.get("/grep",(req, res) =>{
    res.sendFile(__dirname + "/gr2-web/index_emperio.html")
} )


var fsp = require("fs").promises;


async function listarArquivosDoDiretorio(diretorio, arquivos) {

    if(!arquivos)
        arquivos = [];

    let object = {
        name_file: "",
        rotation_x: 0
    }
    let listaDeArquivos = await fsp.readdir(diretorio);
    for(let k in listaDeArquivos) {
        let stat = await fsp.stat(diretorio + '/' + listaDeArquivos[k]);
        if(stat.isDirectory()){
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        }
        else{
            if(listaDeArquivos[k].indexOf(".gltf") != -1){

                let object = {
                    name_file: "",
                    rotation_x: 0
                }
                
                object.name_file = listaDeArquivos[k]
                object.rotation_x = 0;
            
                if (listaDeArquivos[k].indexOf("empelium") != -1) {
                    object.rotation_x =  3
                }
                if (listaDeArquivos[k].indexOf("guardian") != -1) {
                    object.rotation_x =  5
                }

                if (listaDeArquivos[k].indexOf("guild") != -1) {
                    object.rotation_x =  1
                }

                arquivos.push(object);
            }
                
        }            
    }

    return arquivos;

}

async function get_files() {
    let arquivos = await listarArquivosDoDiretorio('./src/com_texture/3dmob'); // coloque o caminho do seu diretorio
    
    return arquivos;
}


app.get("/getitens", async (req, res) =>{
    res.json(await get_files())
} )

app.listen(3333, () => console.log('Server is running! http://localhost:3333'));