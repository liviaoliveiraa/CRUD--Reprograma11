const travels = require("../models/travels.json");
const utils = require("../utils/travelsUtils"); 

const fs = require("fs");

const getAllTravels = (req,res) => {
    res.status(200).send(travels)
}

const getTravelsById = (req, res) => {
    let idRequerido = req.params.id;

    let filteredId = utils.findById(travels, idRequerido)

    res.status(200).send(filteredId)

}


//editar qualquer dado do motorista
const editDriver = (req, res) => {

    let requestId = req.params.id
    

    let {name, license} = req.body

    let newDriver = {
        id: requestId,
        name,
        license
    }

    let filteredDriver = utils.findById(travels, requestId)

    travels.forEach((travel) => {
        let sameDriver = newDriver == filteredDriver

        if(sameDriver){
            travel.driverInfos.push(newDriver)
        }
    })

    
    fs.writeFile("./models/travels.json", JSON.stringify(travels), "utf8", function(err) {
        if(err){
            res.status(500).send({
                "messange": err
            })
        } else {    
            res.status(200).send({
                "messange": "Motorista alterado com sucesso",
                filteredDriver
            })
        }
    })
}

//Substituir um motorista
const replaceDriver = (req, res) => {
    let requestIdDriver = req.params.id

    let { name, license} = req.body

    let filteredDriver = utils.findById(travels, requestIdDriver)

    const indice = travels.indexOf(filteredDriver)

    let updateDriver = {
        id:requestIdDriver,
        name,
        license 
    }

    if(indice >=0){
        travels.splice(indice, 1, updateDriver)
        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), "utf8", (err) =>{
            if(err){
                res.status(500).send({
                    "messange": err
                })
            } else {
                res.status(200).send({
                    "messange": "Motorista alterado com sucesso",
                    updateDriver
                })
            } 
        })
    }
    
}       


//Deletar uma viagem
const deleteTravel = (req, res) => {
    const requestId = req.params.id

    const filteredId = utils.findById(travels, requestId)

    const indice = travels.indexOf(filteredId)

    if(indice >= 0) {
        travels.splice(indice, 1)
        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), "utf8", (err) => {
            if(err) {
                res.status(500).send({
                    "messange": err
                })
            } else {
                res.status(200).send({
                    "messange": "Viagem excluída com sucesso",
                    travels
                })
            }
        })
    }


}

module.exports = {getAllTravels, getTravelsById, editDriver, deleteTravel, replaceDriver}