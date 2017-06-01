// Requiring modules
var express = require('express');
var router = express.Router();
// Importing the models to use it's database function
var db = require('../models');

router.get('/', function(req,res) {
	res.redirect('/burgers')
});

router.get('/burgers', function(req,res) {
	db.Burger.findall()
		.then(function(dbBurger) {
			console.log(dbBurger);
			var hbsObject = { burger: dbBurger };
			return res.render("index", hbsObject);
		});
});
// post route to create burgers
router.post("/burgers/create", function(req, res) {
	db.burger.create({
		burger_name: req.body.burger_name
	})
	//passing the result of our call
	.then(function(dbBurger) {
		console.log(dbBurger);
		res.redirect("/");
	});
});
//put routes to devour a burgers
router.put("/burgers/update", function(req, res) {
	db.Burger.update({
		devoured: true
	},
	{
		where: {
			id: req.body.burger_id
		}
	}
}).then(function(dbBurger) {
	res.redirect("/");
});
});

// export routes for server.js to use
module.exports = router;
