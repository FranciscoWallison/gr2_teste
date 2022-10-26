const express = require("express");
var path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.static(path.join(__dirname, '/gr2-web')));

app.get("/",(req, res) =>{
    res.sendFile(__dirname + "/src/index.html")
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
            if(listaDeArquivos[k].indexOf(".fbx") != -1){

                let object = {
                    name_file: "",
                    rotation_x: 0
                }
                
                object.name_file = listaDeArquivos[k]
                object.rotation_x = 0;
            
                if (listaDeArquivos[k].indexOf("empelium") != -1) {
                    object.rotation_x =  1.6
                }
                if (listaDeArquivos[k].indexOf("guardian") != -1) {
                    object.rotation_x =  1.6
                }

                if (listaDeArquivos[k].indexOf("guild") != -1) {
                    object.rotation_x =  1.6
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
