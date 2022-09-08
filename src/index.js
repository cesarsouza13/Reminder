    const express = require('express');
    const app = express();
    const cors = require('cors');

    let arrayReminder = [];

//permirtir a leitura de json ela aplicação
    app.use(express.json());

//Permite que a rota fique publica para acesso

    app.use(cors());

//rota inicial / endpoint

    app.post('/register', async(req,res)=>{
       
        const {name, date, id} = req.body;
        const reminder = {name, date, id};
        arrayReminder.push(reminder)
        return res.send({reminder})
    });


    app.get('/consult', (req, res) =>{
        const allReminder = arrayReminder;

        return res.send(allReminder);
    });

    app.delete('/delete/:reminder_id', (req, res) =>{

        const {reminder_id} = req.params;
        arrayReminder.splice(reminder_id, 1)

        return res.send("delete success");

    })


//porta a ser utilizada pela aplicação
    app.listen(3000);