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
                    res.json({ message: "Expired Token!"});
                } else {
                    res.json({ message: "Decoding error!"});
                }
            } else {
                console.log(decoded.email);
                next();
            }
        });
    } else {
        res.json({ message: "Token is missing!"});
    }
}

router.get("/tasks", async (req, res) => {
    let tasks = [];
    const response = await db.collection("tasks").get();
  
    console.log(response);
    response.forEach((doc) => {
      let task = {};
  
      task.id = doc.id;
      task.name = doc.data().name;
      task.status = doc.data().status;
  
      tasks.push(task);
    });
    res.json(tasks);
  });
  
  router.get("/tasks/:id", async (req, res) => {
    let name = await db.collection("tasks").doc(req.params.id).get();
    res.json(name);
  });
  
  // Create task
  router.post("/tasks", checkAuthorization, async (req, res) => {
    console.log("You want toadd a new task.");
    let task = {};
    task.name = req.body.name;
    task.status = req.body.status;
    const result = await db.collection("tasks").add(task);
    console.log(result.id)
    setTimeout(function() {
      res.json({ message: result.id });
    }, 1500)
    
  });
  
  //Edit task
  router.put("/tasks/:id", checkAuthorization, async (req, res) => {
    console.log("You want to update task with id: " + req.params.id);
    const response = await db
      .collection("tasks")
      .doc(req.params.id)
      .update(req.body);
  
    res.json({
      message: "Updated task with id " + req.body.id + " de pe server!",
    });
  });
  
  //Delete tasks
  router.delete("/tasks/:id", checkAuthorization, (req, res) => {
    console.log("You want to delete task with id: " + req.params.id);
    let id = req.params.id;
    const tasks = db
      .collection("tasks")
      .doc(id)
      .collection("notes")
      .listDocuments()
      .then((val) => {
        val.map((val) => {
          val.delete();
        });
      });
    const task = db.collection("tasks").doc(id).delete();
    res.json({
      message: "Deleted task with id" + req.params.id + " from server!",
    });
  });

module.exports = router;