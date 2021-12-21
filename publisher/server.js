const express  = require('express');
const bodyParser  = require('body-parser');
const result = require('dotenv').config();

if (result.error) {
    throw result.error
  }
const makeSeed = require('./database/initidb');
const { getTopic, saveTopic, saveSubscription, findSubscriptionsByTopic } = require('./database/crud');
const pushNotification = require('./database/pushNotification');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/subscribe/:topic", function(req, res) { 
    const {url} = req.body;
    const {topic} =  req.params;
    getTopic(topic)
    .then((result)=>{
        if(result.length === 0){
            saveTopic(topic)
            .then((result)=>{
                
                saveSubscription(url, result.insertId)
                .then(()=>{
                    res.status(200).json({url, topic}).end();
                },()=>{
                    res.status(500).end();
                });
                
            },()=>{
                res.status(500).end();
            });
        }else{
           
            saveSubscription(url, result[0].id)
            .then(()=>{
                res.status(200).json({url, topic}).end();
            },(error)=>{
              
                res.status(500).send(error).end();
            });
        }
    });
    
});

app.post("/publish/:topic", function(req, res) { 
    
    const {topic} =  req.params;
    const data = req.body;

    getTopic(topic)
    .then((result)=>{
        if(result.length === 0){
            res.status(404).send("Topic does not exist");
        }else{
            findSubscriptionsByTopic(result[0].id)
            .then((result)=>{
               
                   
                   pushNotification(result, topic, data)
                   .then(()=>{
                     
                    res.status(200).end();
                   },(error)=>{
                       console.log(error);
                    res.send(500).end();
                   });
             
            },()=>{
                res.send(500).end();
            })
        }
    },()=>{
        res.status(500).end();
    })
   
    
    
});



app.listen(8000, ()=>{
    console.log("Publisher running");
    makeSeed();
});