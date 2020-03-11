const { Client, connectionData} = require('../lib/database');


class ShoppingService {

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

    async getAllProducts (){
        try{
            const query = `SELECT productid, title, price, stock FROM products limit 10`
            let result = await this.connect(query);
            return result.rows
        } catch (error){
            console.log(error);
        }
    }

    async getProductById (idproduct){




        
        try {
           const query = `select p.productid,p.title, p.price, f.url from files as f inner join products as p
                            on  p.productid = f.productid
                            where f.main = 1
                            and p.productid = $1 `   
           let result = await this.connect(query, [idproduct]);
           return result.rows;
        } catch (error) {
            console.log(error)
        }
    }

    async getOrdersById (iduser){
        try{
            const query = `select o.orderid, o.productid, o.userid, u.userid from orders as o 
                            inner join users as u 
                            on o.userid = u.userid 
                            where u.userid = $1`
            let result = await this.connect(query, [iduser]);
            return result.rows;
        } catch (error){
            console.log(error)
        }
    }
    async getProductDetailByOrderId (orderid){
        try{
            const query = `select o.orderid, o.userid,p.productid, p.title, p.description, p.price, o.quantity from products as p 
                            inner join orders as o 
                            on o.productid  = p.productid
                            where o.orderid = $1`
            let result = await this.connect(query, [orderid]);
            return result.rows    
        } catch (err){
            console.log(err)
        }
    }

    

}

module.exports = new ShoppingService();