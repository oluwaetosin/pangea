const connection = require('./connection');
const queries = require('./seed');


function makeSeed(){
    queries.forEach((query)=>{
        // eslint-disable-next-line no-unused-vars
        connection.query(query, function(err, sets, fields){
            if(err) console.log(err);
           });
    });
    
     
  }

  module.exports = makeSeed;