const express = require('express');
const router = express.Router();
const Candidate = require('../models/data');
const XLSX = require('xlsx');
const multer = require("multer");
const async = require('async');
// added all nessary modules



// <----------------------------------------------------->

// storing file at local storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // giving path
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // giving file name
        // all files uploaded will be unique
        cb(null, Date.now() + "-" + file.originalname);
    }
});


// using multer file uploading to server 
const upload = multer({ storage: storage });


// <------------------------------------------------------>




// <------------------------------------------------------>
// this is the complete logic

//creating route for post request and check duplicates and make entry in mongodb
router.post('/entry', upload.single("xlsx"), (req, res) => {

        let path = req.file.path;
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        let jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        if (jsonData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Sheet has no data",
            });
        }

        let count = 0;
        let duplicateCount = 0;

        // <------------------------------------------------------>

        // using eachSeries as mention and avoiding duplicates

        async.eachSeries(jsonData, (item, callback) => {
            Candidate.findOne( { Email: item.Email } ).count(function (err, num) {
                if (num > 0) {
                    duplicateCount++;
                    console.log(`duplicate item found : ${item['Email']}`);
                    return callback();
                }

                const candidate = new Candidate(item);
                candidate.save(function (err) {
                    if (!err) count++;
                    callback(err);
                });
            });
        }, (err) => {
            if (err) {
                console.error(err);
            } else {
                let message = (count === 0) ? 'all duplicates ' : `${count} unique items saved`;
                message += (duplicateCount === 1) ? '  1 duplicate ' : `  ${duplicateCount} duplicates `;

                console.log(`${count} unique candidates saved to db`);
                return res.status(201).json({
                    success: true,
                    message: message
                });
            }
        });

        // <------------------------------------------------------>

});

module.exports = router