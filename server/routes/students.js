const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsController");

// view all records
router.get("/",studentController.view);

// add new records
router.get("/adduser",studentController.adduser);
router.get("/adduser",studentController.save);

//update records 
router.get("/edituser/:id",studentController.edituser);
router.post("/edituser/:id",studentController.edit);

// delete
router.get("/deleteuser/:id",studentController.delete);

module.exports = router;