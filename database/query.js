const conexion = require('./db');

exports.statusUsers = (req, res) => {
    const { ids } = req.session;
    if (ids === undefined) {
        res.redirect("/login");
    } else {
        const SQL = "SELECT r.id,LOWER(CONCAT(r.nombre,' ',r.apellido))AS name,SUM(IF(t.id_trasaccion=1,monto,0))AS ahorro,SUM(IF(t.id_trasaccion=2,monto,0))AS ahorro_retirable,SUM(IF(t.id_trasaccion=1,monto,0)+IF(t.id_trasaccion=2,monto,0))AS totalAhorro,SUM(IF(t.id_trasaccion=3,monto,0))AS retiros,SUM(IF(t.id_trasaccion=4,monto,0))AS inscripcion,SUM(IF(t.id_trasaccion=1,monto,0)+IF(t.id_trasaccion=2,monto,0)-IF(t.id_trasaccion=3,monto,0))AS balance FROM ingresos t inner join registro r on t.id_identidad=r.id group by r.id order by r.id ASC"
        try {
            conexion.query(SQL, (error, rows) => {
                res.send(rows);
            })
        } catch (error) {
            res.redirect('/error-page');
        }
    }
};
exports.statusUsersId = (req, res) => {
    const { ids } = req.session;
    if (ids === undefined) {
        res.redirect("/login");
    } else {
        const { id } = req.params
        const SQL = "SELECT SUM(IF(t.id_trasaccion=1,monto,0)+IF(t.id_trasaccion=2,monto,0)-IF(t.id_trasaccion=3,monto,0))AS balance FROM ingresos t INNER JOIN registro r on t.id_identidad=r.id WHERE r.id = ?"
        try {
            conexion.query(SQL, [id], (error, rows) => {
                res.send(rows);
            })
        } catch (error) {
            res.redirect('/error-page');
        }
    }
};