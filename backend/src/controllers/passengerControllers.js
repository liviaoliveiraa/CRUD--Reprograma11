const travels = require("../models/travels.json");
const passangers = require("../models/passengers.json");
const utils = require("../utils/travelsUtils");

const fs = require("fs")

//Mostra todos os passageiros
const getAllPassengers = (req, res) => {
    res.status(200).send(passangers)
}

//Seleciona o passageiro por ID
const getPassengerById = (req, res) => {
    let requestId = req.params.id

    let filteredId = utils.findById(passangers, requestId)

    res.status(200).send(filteredId)
    
}

//Cria um novo passageiro
const createPeople = (req, res) => {

    let {name, email, documentNumber} = req.body 

    let travelRequireId = req.params.id

    const newPerson = {
        id: Math.random().toString(32).substr(2), 
        name, 
        email, 
        documentNumber,
        travelId: travelRequireId
    }

    let filteredPerson = utils.findById(travels, travelRequireId);

    travels.forEach((travel) =>{
        let sameTravel = travel == filteredPerson;

        if(sameTravel){
            travel.passengersInfos.push(newPerson);
        }
    })

    fs.writeFile("./src/models/passengers.json", JSON.stringify(passangers), 'utf8', () => {} )
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
        if(err){
            res.status(500).send({
                "message": err
            })
        } else {
            res.status(201).send({
                "message": "Passageiro adicionado com sucesso à viagem", filteredPerson
            })
        }
    })
}

//Deleta um passageiro
const deletePerson = (req, res) => {
    const requestId = req.params.id

    const filteredPerson = utils.findById(passangers, requestId);

    const index = passangers.indexOf(filteredPerson)

    if(index >= 0){
        passangers.splice(index, 1);

        fs.writeFile("./models/passangers.json", JSON.stringify(passangers), "utf8", (err) => {
            if(err){
                res.status(500).send({
                    "message": err
                })
            } else {
                res.status(200).send({
                    "message": "Passageiro excluído com sucesso",
                    passangers
                })
            }
        })
    }

}

//Substitui todo o passageiro
const replacePassenger = (req, res) => {
    let requestId = req.params.id;

    let {name, email, documentNumber, travelId} = req.body

    let filteredPerson = utils.findById(passangers ,requestId)

    const indice = passangers.indexOf(filteredPerson)

    const newName = {
        id: requestId,
        name, 
        email,
        documentNumber,
        travelId
    }

    if (indice >=0) {
        passangers.splice(indice, 1, newName)
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passangers), 'utf8', (err) => {
            if(err){
                res.status(500).send({
                    "messange": err
                })
            } else {
                res.status(200).send({
                    "messange": "Passageiro substituido no sistema com sucesso",
                    newName
                })
            }
        })
    }
}

//Altera somente o nome
const updateName = (req, res) => {
    let requestId = req.params.id

    let newName = req.body.name

    let filteredId = utils.findById(passangers, requestId)

    if(filteredId){
        filteredId.name = newName

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passangers), "utf8", (err) => {
            if (err) {
                res.status(500).send({
                    "message": err,
                })
            } else {
                res.status(200).send({
                    "messange": "Nome atualizado com sucesso",
                    filteredId
                })
            }
        })
    } else {
        res.status(500).send({"messange": "Passageiro não encontrado"})
    }
}




module.exports = {
    getAllPassengers,
    createPeople,
    getPassengerById,
    deletePerson,
    replacePassenger,
    updateName
    
}