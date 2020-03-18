const { Client, connectionData} = require('../lib/database');

class orderService {

    constructor(){
        this.connectionString = `postgres://${connectionData.user}:${connectionData.password}@${connectionData.host}:${connectionData.port}/${connectionData.database}`
    }

    async connect(query, values) {
        return new Promise((resolve, reject) => {
          try {
            const client = new Client(this.connectionString);
            client.connect();
            client.query(query, values && values.length > 0 && values, function(err, result) {
              client.end();
              if (err) return reject(err);
              resolve(result);
            });
          } catch (err) {
            reject(err);
          }
        });
      }

    async getOrdersByUserId (userid){
        try{
            const query = `select o.orderid, o.userid,p.productid, o.productid, p.title, p.description, p.price, o.quantity ,f.url 
                            from orders o 
                            left join products p
                            on p.productid = o.productid
                            left join files f
                            on f.productid = p.productid 
                            where o.userid = $1
                            and f.main = 1`
            let result = await this.connect(query, [userid]);
            return result.rows                
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = new orderService();