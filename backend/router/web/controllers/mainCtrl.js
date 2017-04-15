const Face = require('../../..//model/Face');

/**
 * GET /
 */
exports.getMain = (req, res) => {
  res.render('main', {
    title: 'Main'
  });
};

exports.postMain = (req, res) => {
  let receivedFace = new Face({
    name: 'Face ' + Math.floor((Math.random() * 1000) + 1),
    definition: req.body.matrix
  });

  receivedFace.save()
  .then(() => res.render('main', { title: 'Main' }))
  .catch(err => console.log(err));
};
