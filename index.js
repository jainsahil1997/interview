const express = require('express');
var app = express();
const router=express.Router()
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ history: []}).write();

var user=0;
app.get("/getCooridnates",(req,res)=>{ 

      var cor=req.body.cor;
    	var height=req.body.height;
      var obj = {
   table: []
};
    	var dataToSend={
        noumberofbounces : 0 ,
        xcordinates : [0],
        ycordinates : [height]
      }
      var nob = 0;
      var t0=Math.sqrt( (2*height)/9.8 ) ;
      var ttotal=t0;
      dataToSend["ycordinates"].push(0) ;
      dataToSend["xcordinates"].push(t0) ;
      var hn=height;
      if ( cor > 0) {
        while (hn > 0.01) {
          nob += 1;
          hn=Math.pow(cor,2*nob)*height
          ttotal= ttotal + Math.pow(cor,nob)*t0
          dataToSend["ycordinates"].push(hn) ;
          dataToSend["xcordinates"].push(ttotal) ;
          dataToSend["ycordinates"].push(0) ;
          ttotal= ttotal + Math.pow(cor,nob)*t0
          dataToSend["xcordinates"].push(ttotal) ;
        }}
        dataToSend["noumberofbounces"]=nob;
        var fs = require('fs');
        var fs = require('fs');
        db.get('history').push(dataToSend).write()
        user=user+1;


        res.status(200).send(dataToSend)
})
app.get("/getHistory",(req,res)=>{

        var fs = require('fs');
        fs.readFile("db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
})

//function appendObject(obj){
  //var fs = require('fs');
  //var configFile = fs.readFileSync('./object.json');
  //var config = JSON.parse([configFile]);
  //config.push(obj);
  //var configJSON = JSON.stringify(config);
  //fs.writeFileSync('./object.json', configJSON); }
