var express = require('express');
var router = express.Router();
var crypt = require('crypto');
var admin = require('../modules/firebase');
var dateFormat = require('dateformat');


/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var db = admin.database();
  const ref = await db.ref('students');

  let data = await ref.once('value');
  
  data.forEach(snap => {
    // each child :)
    let child = ref.child(`${snap.key}`);
    child.update({date: '21-03-1996'});
  });

  //res.send(`<pre>${JSON.stringify(data)}</pre>`);
  res.send('<b>HELLO</b>');

  //res.render('index', { title: 'Astrolabe Group Corporation', name: 'zakaria chahboun'.toUpperCase(), data: JSON.stringify(snapshot.val())});
});

router.post('/', async (req, res) => {

  var db = admin.database();
  const ref = await db.ref('students'); // students Node
  const snapshot = await ref.once('value'); // get value
  
  // Get informations from the user
  let name = req.body.name;
  let age = req.body.age;
  let now = new Date(); 
  let today = dateFormat(now,'dd-mm-yyyy');

  // Generate id!
  let id = crypt.createHash('sha1').update(`${name}${today}`).digest('hex').substr(0,10);
  
  // Generate the data!
  let data = { name: name, age: age, date: today.toString()};
  
  // Push new User! (Create New Node Under 'students')
  //const user = await ref.push(data);
  
  // Or Create new user with ower ID :)
  const user = await ref.child(`${id}`);
  await user.set(data);

  // And go to the page!
  res.render('index', { title: 'Astrolabe Group Corporation', name: 'zakaria chahboun'.toUpperCase(), data: JSON.stringify(snapshot.val()) });
});


router.get('/update/:id', async function (req, res, next) {

  // get id
  let id = req.params.id;
  let msg = "";

  var db = admin.database();
  const ref = await db.ref(`students/${id}`); // students/id Node
  const snapshot = await ref.once('value');
  
  // Check if User ID exist!
  if(snapshot.val()){
    await ref.update({date: '25-04-2018'});
    msg = `ID : ${id}, Has changed!`;
  }
  else
    msg = 'NO ID!';

  // go to page
  res.send(msg);
});

router.get('/remove/:id', async function (req, res, next) {

  // get id
  let id = req.params.id;
  let msg = "";

  var db = admin.database();
  const ref = await db.ref(`students/${id}`); // students/id Node
  const snapshot = await ref.once('value');

  // Check if User ID exist!
  if (snapshot.val()) {
    await ref.remove();
    msg = `ID : ${id}, Has removed!`;
  }
  else
    msg = 'NO ID!';

  // go to page
  res.send(msg);
});


module.exports = router;
