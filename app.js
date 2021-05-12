const express = require("express");
const app = express();
const PORT = 3000;
const routerMidWare = express.Router();
const users = [];

//Pulse Check Q5 - B
app.use((req,res,next)=>{
    const err = new Error("No users");
    err.status = 500;
    if(users.length === 0){
        next(err);
    }

})

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

//Practice

//Q1


routerMidWare.use("/users" , (req , res , next)=>{
    console.log(users);
    next();
})
app.use(routerMidWare);

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