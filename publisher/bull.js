const { default: axios } = require('axios');
const Bull = require('bull');
const { getTopic, saveTopic, saveSubscription } = require('./database/crud');

const subscriptionQue =  new Bull('AddSubscription',{
    redis: {
        host: 'redis',
        port: 6379,
        password: 'password'
      }
});
const pushNotificationQue =  new Bull('SendNotification',{
    redis: {
        host: 'redis',
        port: 6379,
        password: 'password'
      }
});
const options = {
    delay: 60000, // 1 min in ms
    attempts: 2
  };
function addSubscriptionJob({topic, url}){
   return subscriptionQue.add({topic, url}, options);
}
function addNotificationJob({topic, url, data}){
    return pushNotificationQue.add({topic, url, data}, options);
 }
 function processNotificationJob(){
    return pushNotificationQue.process(async job => { 
        console.log(job.data);
        return await sendNotification(job.data); 
      });
}

function sendNotification({url, data, topic}){
    return axios.post(url,{ data, topic}).catch(err => err);
}
function processAddSubscriptionJob(){
    return subscriptionQue.process(async job => { 
        console.log(job.data);
        return await addSubscription(job.data); 
      });
}

function addSubscription({url, topic}){
    return new Promise((resolve, reject)=>
    getTopic(topic)
    .then((result)=>{
        if(result.length === 0){
            saveTopic(topic)
            .then((result)=>{
                
                saveSubscription(url, result.insertId)
                .then(()=>{
                  console.log("success");
                  resolve(true);
                },(error)=>{
                    console.log(error);
                    reject(error);
                });
                
            },(error)=>{
                console.log(error);
                reject(error);
            });
        }else{
           
            saveSubscription(url, result[0].id)
            .then(()=>{
                console.log('success');
                resolve(true);
            },(error)=>{
              
                console.log(error);
                reject(error);
            });
        }
    }));
}


module.exports =  {
    addSubscriptionJob,
    processAddSubscriptionJob,
    addNotificationJob,
    processNotificationJob
}