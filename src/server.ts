import express, { Application, Request, Response } from "express";
import {Pool} from "pg";

const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true})); 

const pool = new Pool({
  connectionString : "postgresql://neondb_owner:npg_BC8aqsIV1Zdg@ep-autumn-shadow-azk5dblz.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
})
//console.log(pool);  
const initDB = async()=>{
  try {
   
await pool.query(
  `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`
);

    console.log("database connected!!")

  } catch (error) {
    console.log(error);
  } 
  
};

initDB();
 

// GET Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "ph",
  });
});

// POST Route
app.post("/", (req: Request, res: Response) => {
  //console.log(req.body);
  const {name , age, password} = req.body;
  //console.log(password) 

   res.status(200).json({
    success: true,
    message: "This is a test api",
    data:{name , age}   
  }); 

  // res.status(201).json({
  //   success: true,
  //   message: "Data received successfully!",
  //   data: req.body,
  // });
}); 

app.listen(port, () => {
  console.log(`The Express  Server  is Running on the port ${port}`);
});
