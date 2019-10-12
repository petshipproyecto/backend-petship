import Sequelize from 'sequelize';

module.exports = app => {

    
    const Op = Sequelize.Op;
    const Match = app.db.models.Match;
    const Perfil = app.db.models.Perfil;
    
    function descartados (Id_perfil) {
        return new Promise(function (resolve, reject){
            Match.findAll({
                where: {Id_perfil_origen: Id_perfil},
                attributes: ['Id_perfil_destino'],
                raw: true
            })
                .then(result => {resolve(result.map(result => result.Id_perfil_destino))})
                /* .catch(error => {
                    res.status(412).json({msg: error.message});
                }) */;
        })
    }

    function candidatos (descartados) {
        return new Promise(function (resolve, reject){
            Perfil.findAll({
                    where: {Id_perfil: {[Op.notIn]: descartados}}
                })
                .then(result => {resolve(result)})
                /* .catch(error => {
                    res.status(412).json({msg: error.message});
                }) */;
        })
    }

    app.route('/candidatos')
        .get((req, res) => {
            descartados(req.body.Id_perfil)
            .then(descartados => {
                var ids = Array();
                candidatos (descartados)
                    .then(candidatos => {res.json(candidatos)})
            })
        })
      
  };