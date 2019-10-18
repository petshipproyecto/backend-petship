module.exports = app => {

    const MatchController = require('../controllers/matchController') (app.db.models);
  
    app.route('/like')
      .post((req, res) => {
        //CREATE
        MatchController.like(req, res);
      });
    
    app.route('/dislike')
      .post((req, res) => {
        //CREATE
        MatchController.dislike(req, res);
      });
  
    app.route('/likes/:Id_perfil')
      .get((req, res) => {
        // GET
        MatchController.getLikes(req, res);
      })
  };