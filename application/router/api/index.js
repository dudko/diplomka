const router = require('express').Router();
const Face = require('../../model/Face');

router.get('/faces', (req, res) => {   
    Face.find().then(faces => res.send(faces));
})

module.exports = router;
