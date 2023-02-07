var express = require("express");
var router = express.Router();
var db = require("../database");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "bahoi";

//check if authorized
function checkAuthorization(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader != "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    res.json({message: "Expired Token!"});
                } else {
                    res.json({message: "Decoding error!"});
                }
            } else {
                console.log(decoded.email);
                next();
            }
        });
    } else {
        res.json({message: "Token is missing!"});
    }
}
//Get notes
router.get("/tasks/note/:id", async (req, res) => {
    console.log("getting the notes");
    const response = await db
        .collection("tasks")
        .doc(req.params.id)
        .collection("notes")
        .get();

    let notes = [];
    console.log(response);
    response.forEach((doc) => {
        let note = {};
        note.id = doc.id;
        note.name = doc.data().name;

        notes.push(note);
    });
    res.json(notes);
});


//Adding notes to task
router.post("/tasks/note/:id", async (req, res) => {
    console.log("Adding a note to task: " + req.params.id);
    let obj = {};
    obj.name = req.body.name

    let response = await db
        .collection("tasks")
        .doc(req.params.id)
        .collection("notes")
        .add(obj);

    res.json(response);
});

//delete note from task
router.delete(
    "/tasks/note/:id/:noteId",
    checkAuthorization,
    async (req, res) => {
        console.log("You're trying to delete : " + req.params.id);

        let obj = {};
        obj.name = req.body.name;

        let response = await db
            .collection("tasks")
            .doc(req.params.id)
            .collection("notes")
            .doc(req.params.noteId)
            .delete();

        setTimeout(function () {
            res.json(
                "Deleted note of task with id" +
                req.params.id +
                " with id" +
                req.params.noteId +
                " from server!"
            );
        }, 1500)
    }
);

module.exports = router;