const express = require("express");
const router = express.Router();

const passengerControllers = require("../controllers/passengerControllers");
const travelsControler = require("../controllers/travelsControllers") //passenger

//TRAVELS
router.get("/travels", travelsControler.getAllTravels)
router.get("/travels/:id", travelsControler.getTravelsById)

router.post("/travels/:id/passengers/create", passengerControllers.createPeople)

router.put("/travels/:id/editdriver", travelsControler.editDriver) 
router.put("/travels/:id/updatedriver", travelsControler.replaceDriver)

router.delete("/travels/:id/delete", travelsControler.deleteTravel)

//PASSENGERS 
router.get("/passengers", passengerControllers.getAllPassengers)
router.get("/passengers/:id", passengerControllers.getPassengerById)


router.put("/passengers/:id/update", passengerControllers.replacePassenger)

router.delete("/passengers/:id/delete", passengerControllers.deletePerson)

router.patch("/passengers/:id/updatename", passengerControllers.updateName)


module.exports = router;


