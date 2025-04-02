const con= require('./config');
const express=require('express')
const app = express();

app.use(express.json());

app.get('/', (req, resp) => {
    con.query("SELECT * FROM `table abc`", (err, result) => {
        if (err) {
            resp.send("error")
        } else {
            resp.send(result)
        }
    });
});

app.post('/', (req, resp) => {
    const data=req.body;
    con.query("INSERT INTO `table abc` SET ?",data, (err, result) => {
        if (err) {
            resp.send("error")
        } else {
            resp.send(result)
        }
    });
});

app.put('/', (req, resp) => {
    // const data=["hh","jj",2,21];
    const data=[req.body.a4,req.body.a3,req.body.a1,req.body.a2];
    con.query("UPDATE `table abc` SET a4=?, a3=?, a1=? where  a2=?",data, (err, result,feild) => {
        if (err) {
            resp.send("error");
            console.log(data);
        } else {
            resp.send(result);
        }
    });
});

app.delete('/', (req, resp) => {
    // const data=["hh","jj",2,21];
    const data=[req.body.a3];
    con.query("DELETE FROM `table abc` where  a3=?",data, (err, result,feild) => {
        if (err) {
            resp.send("error");
            console.log(data);
        } else {
            resp.send(result);
        }
    });
});


app.listen(5000);