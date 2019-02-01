var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({}, {}, function(error, data){
    res.json(data);
  });
});

router.post('/addUser', function(req, res){
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send((err === null) ? {msg:''} : {msg: err});
  });
});

router.delete('/deleteUser/:id', function(req, res){
  var db = req.db;
  var collection = db.get('userlist');
  var selectedUserToDelte = req.params.id;
  collection.remove({'_id': selectedUserToDelte}, function(err){
    if(err){
      console.log(err);
    }
    res.send((err === null) ? {msg:''} : {msg: err});
  });
});
module.exports = router;
