
//dependencies 

const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

//routes

router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    let hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function (req, res) {
  burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {
    res.redirect("/");
  });
});

router.put("/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: true,
    },
    condition,
    function (result) {
      res.redirect(303, "/");
    }
  );
});

// Export routes for server.js to use.
module.exports = router;
