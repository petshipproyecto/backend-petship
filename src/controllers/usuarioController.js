module.exports = (models) => {
  
  var UsuarioController = {};
  
  // LIST
  UsuarioController.list = function (req, res) {
      models.Usuario.findAll({
        include: [
          {model: models.Ubicacion},
          {model: models.Perfil,
            include: [
              {model: models.Genero}
            ]}
        ]
      })
        .then(result => res.json(result))
        .catch(error => {
        res.status(412).json({msg: error.message});
      });
    }
  
  // CREATE
  UsuarioController.create = function (req, res) {
    console.log(req.body);
    models.Usuario.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
  }

  // GET
  UsuarioController.get = function (req, res) {
    models.Usuario.findOne({
      where: req.params,
      include: [
        {model: models.Ubicacion},
        {model: models.Perfil,
          include: [
            {model: models.Genero}
          ]
        }
      ]
    })
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  }

  //UPDATE
  UsuarioController.update = function (req, res) {
    models.Usuario.update(req.body, {where: req.params})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  }

  // DESTROY
  UsuarioController.destroy = function (req, res) {
    models.Usuario.destroy({where: req.params})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(204).json({msg: error.message});
      });
  }

  return UsuarioController;
};