
const express = require("express");

const port = process.env.PORT || 3000;
const token_api = process.env.TOKEN_API
const app = express()
app.use(express.json());

app.listen(port,()=>{
    console.log("El servidor esta activo");
});

app.get("/",(req,res)=>{
    res.json("Hola");
});

app.post("/verify",(req,res)=>{
    //let msg_body = req.body.entry[0].changes[0].value.messages[0].button.text;
    //console.log("Mensaje recibido: "+msg_body);
    console.log("----------DATA DESDE META---------------\n");
    console.log(JSON.stringify(req.body,null,2));
    // console.log(req.body.entry[0].changes[0].value.contacts[0]);
    console.log("-----------FIN DATA ----------");
    /*
    if(req.body.entry[0]){
        console.log("Entra al if");
        if(req.body.entry[0].changes[0].value.messages[0].button){
          console.log("entra al segundo if");
          let msg_body = req.body.entry[0].changes[0].value.messages[0].button.text; 
          console.log(msg_body);      
        }else{
          console.log("No entra al segundo if");
        }
    }
    */


    
    res.json(req.body);
})


app.get("/verify",(req,res)=>{
    
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];


  if (mode && token) {
    
    if (mode === "subscribe" && token === "felipeopazo") {
    
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      
      res.sendStatus(403);
    }
  }
})