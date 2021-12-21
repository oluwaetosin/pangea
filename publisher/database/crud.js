/* eslint-disable no-unused-vars */
const connection = require("./connection");

function saveSubscription(url, topic_id){
    return new Promise((resolve, reject)=>{
   findSubscription(url, topic_id)
   .then((result)=>{
    if(result.length !== 0){
        reject("Url already subscribed to this topic");
        return;
    }
    const data  = {url,topic_id};
    connection.query('INSERT INTO subscribers SET ?', data, function (error, results, fields) {
       if (error) reject(error);
        
       resolve(results);
       
     });
   })
    
});
}

function  findSubscription(url, topic_id){
    return new Promise((resolve, reject)=>{
        const subscriptio_exist = connection.query("SELECT * FROM subscribers where url =  ? and topic_id = ?", [url, topic_id],function(
            error, result,field){
                if (error) reject(error);
              
                resolve(result);
        })
    });
    
}

function  findSubscriptionsByTopic(topic_id){
    return new Promise((resolve, reject)=>{
        const subscriptio_exist = connection.query("SELECT * FROM subscribers where topic_id = ?", [topic_id],function(
            error, result,field){
                if (error) reject(error);
              
                resolve(result);
        })
    });
    
}

function  getTopic(topic){
    return new Promise((resolve, reject)=>{
        const subscriptio_exist = connection.query("SELECT * FROM topics where topic =  ?", [topic],function(
            error, result,field){
                if (error) reject(error);
               
                resolve(result);
        })
    });
    
}

function saveTopic(topic){
    return new Promise((resolve, reject)=>{
    const data  = {topic};
    connection.query('INSERT INTO topics SET ?', data, function (error, results, fields) {
       if (error) reject(error);
       
       resolve(results);
       
     });
    });
}

module.exports = {
    findSubscription,
    saveSubscription,
    getTopic,
    saveTopic,
    findSubscriptionsByTopic


}