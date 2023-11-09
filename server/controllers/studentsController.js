const mysql = require("mysql");

// MYSQL CONNECTION
const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.view = (req, res) => {

    // CHECK DB CONNECTION
    conn.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("select * from users", (err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});
                // console.log(rows);
            }else{
                console.log("Error in listing data"+ err);
            }
        });
    });

};

exports.adduser = (req,res)=>{
    res.render("adduser");
}


exports.save = (req,res)=>{
    // CHECK DB CONNECTION
    conn.getConnection((error, connection) => {
        if (error) throw error;
            const {name,age,city} = req.body;

        connection.query("insert into users (NAME,AGE,CITY) values(?,?,?)",[name,age,city], (err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User Details Added Successfully"});
            }else{
                console.log("Error in listing data"+ err);
            }
        });
    });
}

// edit

exports.edituser = (req,res)=>{

    conn.getConnection((error, connection) => {
        if (error) throw error;
        // get Id from url
        let id = req.params.id;

        connection.query("select * from users where id=?",[id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{rows});
            }else{
                console.log("Error in listing data"+ err);
            }
        });
    });

}
// edit 
exports.edit = (req,res)=>{
    // CHECK DB CONNECTION
    conn.getConnection((error, connection) => {
        if (error) throw error;
            const {name,age,city} = req.body;
            let id = req.params.id;

        connection.query("update users set NAME=?,AGE=?,CITY=? where id=?",[name,age,city,id], (err,rows)=>{
            connection.release();
            if(!err){

                conn.getConnection((error, connection) => {
                    if (error) throw error;
                    // get Id from url
                    let id = req.params.id;
            
                    connection.query("select * from users where id=?",[id], (err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render("edituser",{rows,msg:"User Details Updated Successfully"});
                        }else{
                            console.log("Error in listing data"+ err);
                        }
                    });
                });

            }else{
                console.log("Error in listing data"+ err);
            }
        });
    });
}

// Delete
exports.delete = (req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err) throw err;
        // Get ID from url
        let id = req.params.id;
        connection.query("delete from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }else{
                console.log(err);
            }
        });
    });
}