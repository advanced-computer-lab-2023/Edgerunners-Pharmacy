const Sales = require("../Models/Sales");
const { default: mongoose } = require("mongoose");

const createSalesRecord = async (req, res) => {
    try {
        await Sales.create({
            ID: req.body.id,
            Month: req.body.month,
            MedicineRecord: {
                MedicineName: req.body.medicinenames,
                SalesForMedicine: req.body.salesforeach,
            },
        });
        res.status(200).send("Created successfully");
    } catch (e) {
        res.status(400).send("Failed to create sales record");
    }
};

const removeSalesRecord = async (req, res) => {
    try {
        const recordId = req.body.id;
        await Sales.findByIdAndRemove(recordId);
        res.status(200).send("Removed successfully");
    } catch (e) {
        res.status(400).send("Failed to remove sales record");
    }
};

const getMedicinesForMonth = async (req, res) => {
    try {
        const selectedMonth = parseInt(req.query.month);
        const salesRecords = await Sales.find({ Month: selectedMonth });
        res.status(200).send(salesRecords);
    } catch (error) {
        console.error('Error fetching sales records:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSalesRecord,
    removeSalesRecord,
    getMedicinesForMonth,
};