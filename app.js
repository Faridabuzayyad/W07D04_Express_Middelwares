//Everything tested and working perfect , please if you face any problems contact me :-) !

const express = require("express");
const app = express();
const PORT = 3000;
//Practice Q1 A
const routerMidWare = express.Router();
//Practice Q3 A
const routerOfProducts = express.Router();
const users = ["John", "Mark"];
//Practice Q4 A
const products = ["Keyboard" , "Mouse"];

//Pulse Check Q5 B
app.use((req,res,next)=>{
    const err = new Error("No users");
    err.status = 500;
    if(users.length === 0){
        next(err);
    }
    else{
        next();
    }

});

//Pulse check Q4 
app.use(express.json());

//Pulse check Q1
const logUsers = (req , res , next) =>{
    console.log(users);
    next();
};

//Pulse check Q2
app.use(logUsers);

//Pulse check Q3
const logMethod = (req , res , next) =>{
    console.log(req.method);
    next();
}
app.use("/users" ,  logMethod);



app.get("/users", (req, res, next) => {
    res.json(users);
});

//Practice Q1 B
routerMidWare.use("/users" , (req , res , next)=>{
    console.log(users);
    next();
})
app.use(routerMidWare);

//Practice Q2
app.post("/users/create" , (req, res , next)=>{
    users.push(req.body.name);
    res.json(`${req.body.name} has been added`)
})

routerMidWare.use("/users/create" , (req , res , next)=>{
    if(req.body.name){
        console.log(req.body.name);
    }
    else{
        console.log("please Enter A name");
    }
    next();
});

//Practice Q3 B
routerOfProducts.use("/products" , (req, res, next)=>{
    next()
})

//Practice Q5
routerOfProducts.use("/" , (req, res, next)=>{
    console.log(routerOfProducts);
    next()
})
app.use(routerOfProducts);

/*Practice Q4 B -- User needs to enter the existing item he wants to replace with key : oldItem , and enter the new item 
with key : newItem , then this post request will search for the oldItem to replace it */
app.post("/products/update", (req,res,next)=>{
    let oldItem = req.body.oldItem;
    let newItem = req.body.newItem;
    let indexOfoldItem;
    let match = products.find((element , index)=>{
        indexOfoldItem = index;
        return element === oldItem;
    })
    
    if(match){
        products.splice(indexOfoldItem, 1 , newItem);
        //this clg for testing purposes 
        console.log(products);
        res.status(200);
        res.json(`products value now:${products}`);
    }
    else{
        res.status(404);
        res.json("the Item you are trying to update is not in stock")
    }
});

//Practice Q6
app.use("*", (req,res,next)=>{
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Pulse Check Q5 - A
app.use((err , req , res , next)=>{
    res.status(err.status);
    res.json({
            error : {
            status : err.status,
            message : err.message,
        }
})
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

