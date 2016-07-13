var scoresController = require('./scoresController.js');

module.exports = function(app, express){

  app.get('/allStats', scoresController.allStats);

  app.post('/postScore', scoresController.addStatsToDB);
};