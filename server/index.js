const  express=require("express"); 
const cors=require("cors");

const app = express(); 

app.use (express.json());
app.use(cors()); 

app.post("/employeedetails",async(req,res,next)=>{

})

app.get("/employeedetails",async(req,res,next)=>{
    
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

