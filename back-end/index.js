const express = require("express");
const db = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken")

app.use(cors());
app.use(express.json());


//JWT Key
const JWT_SECRET = "TableSprint123";

// Prot Listen
app.listen(3007, () => {
  console.log("Server is running on port 3007");
});


//Database Connection
const connection = db.createConnection({
  host: "localhost",
  user: "root",
  password: "122000",
  database: "tablesprint",
});

// Check Database Connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});


// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next();
  });
}; 




// Registration route
app.post("/register", async (req, res) => {
  const sql = "INSERT INTO details (email, password) VALUES (?, ?)";
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ message: "User registered successfully"});
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM details WHERE email = ?";

  connection.query(sql, [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    try {
      const isPasswordValid = await bcrypt.compare(password, result[0].password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Email or Password" });
      }
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login successful", user: result[0], token });
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
});



// Get Categories Data Route
app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM subcategories"; 
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching subcategories:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    return res.status(200).json(result);
  });
});


// Get SubCategories Data Route
app.get("/subcategories2",(req,res)=>{
  const sql = "SELECT * FROM subcategories2"
connection.query(sql,(err,result)=>{
  if (err) {
    console.error("Error fetching subcategories:", err);
    return res.status(500).json({ message: "Error fetching data" });
  }
  return res.status(200).json(result);
})
})


// Get SubCategories Data Route
app.get("/productdata",(req,res)=>{
  const sql = "SELECT * FROM productdata"
connection.query(sql,(err,result)=>{
  if (err) {
    console.error("Error fetching subcategories:", err);
    return res.status(500).json({ message: "Error fetching data" });
  }
  return res.status(200).json(result);
})
})


// Delete Products Route
app.delete("/delete", (req, res) => {
  const { id, content } = req.body; 
  let sql;
  switch (content) {
    case "Category":
      sql = "DELETE FROM subcategories WHERE id = ?";
      break;
    case "Subcategory":
      sql = "DELETE FROM subcategories2 WHERE id = ?";
      break;
    case "Products":
      sql = "DELETE FROM productdata WHERE id = ?";
      break;
    default:
      return res.status(400).json({ message: "Invalid content type" });
  }

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `${content} not found` });
    }
    return res
      .status(200)
      .json({ message: `${content} deleted successfully` });
  });
});

//add categories in database
app.post("/addCategories", (req, res) => {
  const { category_name, image_url, status, sequence } = req.body;
  const sql = "INSERT INTO subcategories (category_name, image_url, status, sequence) VALUES (?, ?, ?, ?)";
  connection.query(sql, [category_name, image_url, status, sequence], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json({ message: "Category added successfully", result });
  });
});
