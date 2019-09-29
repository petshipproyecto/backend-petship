module.exports = app => {

    const PreferenciaController = require('../controllers/preferenciaController') (app.db.models);
  
    app.route('/preferencia')
      .get((req, res) => {
        // LIST
        PreferenciaController.list(req, res);
      })
      .post((req, res) => {
        //CREATE
        PreferenciaController.create(req, res);
      });
  
    app.route('/preferencia/:Id_preferencia')
      .get((req, res) => {
        // GET
        PreferenciaController.get(req, res);
      })
      .put((req, res) => {
        // UPDATE
        PreferenciaController.update(req, res);
      })
      .delete((req, res) => {
        // DESTROY
        PreferenciaController.destroy(req, res);
      });
      
  };