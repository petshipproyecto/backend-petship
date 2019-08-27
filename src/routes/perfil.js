module.exports = app => {

    const PerfilController = require('../controllers/perfilController') (app.db.models);
  
    app.route('/perfil')
      .get((req, res) => {
        // LIST
        PerfilController.list(req, res);
      })
      .post((req, res) => {
        //CREATE
        PerfilController.create(req, res);
      });
  
    app.route('/perfil/:Id_perfil')
      .get((req, res) => {
        // GET
        PerfilController.get(req, res);
      })
      .put((req, res) => {
        // UPDATE
        PerfilController.update(req, res);
      })
      .delete((req, res) => {
        // DESTROY
        PerfilController.destroy(req, res);
      });
  };