const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "abc"
});

con.connect((err)=>{
  if(err){
    console.log("error");
  }
  else{
    console.log("connected");
  }
})

module.exports=con;