var express = require('express');
var router = express.Router();
var crypt = require('crypto');
var admin = require('../modules/firebase');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var db = admin.database();
  const ref = await db.ref('students');
  const snapshot = await ref.once('value');

  //res.send(`${JSON.stringify(snapshot.val())}`);

  res.render('index', { title: 'Astrolabe Group Corporation', name: 'zakaria chahboun'.toUpperCase(), data: JSON.stringify(snapshot.val())});
});

router.post('/', async (req, res) => {

  var db = admin.database();
  
  const ref = await db.ref('students'); // students Node
  const snapshot = await ref.once('value'); // get value
  
  let name = req.body.name;
  let age = req.body.age;
  let id = crypt.createHash('sha1').update(`${name}${age}`).digest('hex').substr(0,10);
  
  const user = await ref.child(`${id}`);// create new child (user)

  let data = {name: name, age : age};
  
  await user.set(data);
  res.render('index', { title: 'Astrolabe Group Corporation', name: 'zakaria chahboun'.toUpperCase(), data: JSON.stringify(snapshot.val()) });
});

module.exports = router;
