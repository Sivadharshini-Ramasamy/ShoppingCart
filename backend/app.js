const express = require("express");
const app = express();
const cors=require("cors");
const mongoDB=require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const bodyparser=require("body-parser");
const multer = require("multer");
app.use(cors());
app.use(bodyparser.json());


app.use((req, res, next)=>{

    console.log(req.headers.myauthtoken);
    next();
});

var listProducts=[
    {pdtName:'Knorr instant soup', pdtPrice:85.00, pdtImgPath:'assets/images/5.png', pdtWeight:100, pdtCat:'Food'},
    {pdtName:'chings noodles', pdtPrice:53.00, pdtImgPath:'assets/images/6.png', pdtWeight:75, pdtCat:'Food'},
    {pdtName:'lahsun sev', pdtPrice:45.00, pdtImgPath:'assets/images/7.png', pdtWeight:150, pdtCat:'Food'},
    {pdtName:'premium bake rusk', pdtPrice:22.00, pdtImgPath:'assets/images/8.png', pdtWeight:300, pdtCat:'Food'}
    /* {pdtName:'bake rusk', pdtPrice:50.50, pdtImgPath:'assets/images/9.png', pdtWeight:100, pdtCat:'Food'} */
];
var db;
mongoDB.connect("mongodb+srv://gopi:gopi@mycluster-csmbn.mongodb.net/test?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true
    },(error,database)=>{
    console.log("error : " + error);
    db=database.db("shoppingcartdec1130");
    console.log("Connected successfully");
});

app.get("/",(req,res)=>{
    console.log("Index page");
    /* let users={name:"SK", phone:"987127612"};
    res.send(users); */
});
app.get("/listProducts",(req,res)=>{
    console.log("List Products page");
   // res.send(listProducts);

   db.collection("products").find().toArray((error, data)=>{

    res.json(data);
    
   })
});

app.get("/getCategory",(req,res)=>{
    console.log("req is " + req.body);
    db.collection("categories").find(req.body).toArray((error,data)=>{
        if(data.length>0){
            res.json(data);
        }
        else{
            res.status(400);
        }        
    });
});

app.post("/register",(req,res)=>{
    console.log("registering...");
    req.body._id = new Date().getTime();
    console.log(req.body);
    db.collection("users").insertOne(req.body,(error,data)=>{
        if (error){
            console.log(error);
            res.status(400).json("Error in insert query");
        }
        else{
            res.json("User registered successfully");
        }
    });
});
app.post("/login",(req,res)=>{
    console.log("Login Attempting....");
    //console.log(req.body);
    db.collection("users").find(req.body,{projection:{_id:1,username:1}}).toArray((error,data)=>{
        if(error){
            console.log(error);
            res.status(400).json("Error login");
        }
        else{
            console.log(data);

            var token = '';
            if(data.length>0)
            {

                token = jwt.sign(data[0], "mykey");
                }
            res.json(token);
        }
    })
});

var loggeduser;

function verifyToken(req, res, next)
{
    var token = req.headers.myauthtoken;

    if(!token)
    {
      return  res.status(401).json("No Token Found");
    }

    jwt.verify(token, "mykey", (error, data)=>{

        if(error)
        {
            console.log(error);
            return  res.status(401).json("Token Mismatch");

        }

        loggeduser = data;

        console.log(loggeduser);

    })

    next();
}

app.get("/mycart", verifyToken, (req, res)=>{

    //console.log(req.headers.myauthtoken);

    //console.log(req.param);

    //res.json("Your cart items here");

    db.collection("cart").aggregate([
        { $match: { cartUserId : loggeduser._id } },
            { $lookup:
               {
                 from: 'products',
                 localField: 'cartPdtId',
                 foreignField: '_id',
                 as: 'orderdetails'
               }
             }
            ]).toArray((err, data)=> {

                res.json(data);
           
          });
        

});

const myStorage = multer.diskStorage({
    destination : (req, file, cb)=>{

        console.log(file);

        cb(null, "src/assets/product_images")

    },
    filename : (req, file, cb)=>{

        cb(null, file.originalname+"-"+new Date().getTime()+".png")
    }
});

app.post("/addproducts", verifyToken, multer({storage : myStorage}).single("pdtImage"), (req, res)=>{

    req.body._id = new Date().getTime();
    req.body.pdtImagePath = req.file.filename;
    req.body.pdtCatId = Number(req.body.pdtCatId);
    req.body.pdtPrice = Number(req.body.pdtPrice);

    console.log(req.body);

    db.collection("products").insert(req.body, (error, result)=>{

        if(error)
        {
            res.status(400).json("Error in product insert");
        }
        else {
            res.json("Product Creatd");
        }
    })

    
});

app.get("/getpdtcatwise/:catid", (req, res)=>{

    db.collection("products").find({pdtCatId : Number(req.params.catid)}).toArray((error, data)=>{

        res.json(data);

    })

   // console.log(req.params.catid);

    
});

app.post("/addtocart", verifyToken, (req, res)=>{

    req.body._id = new Date().getTime();
    req.body.cartQty = 1;
    req.body.cartUserId = loggeduser._id;

    console.log(req.body);

    db.collection("cart").insert(req.body, (error, result)=>{

        if(error)
        {
            res.status(400).json("error in cart add query");
        }
        else {
            res.json("cart added");
        }
    })

    
});

app.get("/cartcount", verifyToken, (req, res)=>{

    db.collection("cart").count({cartUserId : loggeduser._id}, (error, count)=>{

        res.json(count);
    })
});


app.put("/updatecart", verifyToken, (req, res)=>{

    console.log(req.body);

    var condition = { _id : req.body.cartId};
    var newValues = {$set : {cartQty : req.body.cartQty, cartPdtPrice: req.body.cartQty*req.body.pdtPrice}};

    db.collection("cart").updateOne(condition, newValues, (error, result)=>{

        res.json("Cart Updated");

    })

    
})


module.exports = app;