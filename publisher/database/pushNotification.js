const axios =  require('axios');

 function pushNotification(subscribtions, topic, data){
    return new Promise((resolve, reject)=>{
        const requests = subscribtions.map((currItem)=>{
            return axios.post(currItem.url,{ data, topic}).catch(err => err);
         });
     Promise.all(requests).then((result)=>{
        resolve(result);
    },(error)=>reject(error));
   
    
    });
  
}

module.exports = pushNotification;