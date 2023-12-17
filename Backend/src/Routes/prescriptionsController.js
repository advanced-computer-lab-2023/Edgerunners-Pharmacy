// #Task route solution
const Prescriptions = require("../Models/Prescriptions.js");
const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const getPrescriptions = async (req, res) => {
    try {
        const Patient = req.query.Patient;
        const filter = { Patient };

        const prescriptions = await Prescriptions.find(filter);

        if (!prescriptions || prescriptions.length === 0) {
            console.log("Prescription not found for patient:", Patient);
            return res.status(404).send("Prescription not found for the specified patient.");
        }

        const allMedicines = prescriptions.flatMap(prescription => prescription.RequiredMedicines || []);

        const medicinenames = allMedicines.map((medicine) => medicine.name);

        res.status(200).send(medicinenames);
    } catch (e) {
        console.error("Error fetching prescription:", e);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getPrescriptions,
};