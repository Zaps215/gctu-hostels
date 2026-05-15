const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());

// CORS middleware - FIXES the CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Connection string (your actual string)
const uri = "mongodb://emmanuelananga0_db_user:Pj6HB0tLcKKkNHv7@ac-wbkk3nm-shard-00-00.a8umlxc.mongodb.net:27017,ac-wbkk3nm-shard-00-01.a8umlxc.mongodb.net:27017,ac-wbkk3nm-shard-00-02.a8umlxc.mongodb.net:27017/gctu_hostels?ssl=true&replicaSet=atlas-hgj04x-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, { family: 4});

async function connectDB() {
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB error:', err);
    }
}
connectDB();

app.get('/', (req, res) => {
    res.json({ message: 'Backend is working! 🚀' });
});



// Signup endpoint
app.post('/api/signup', async (req, res) => {
    console.log('Signup request received:', req.body);
    try {
        const db = client.db('gctu_hostels');
        const users = db.collection('users');
        
        const { fullName, username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        
        // Create new user
        const newUser = {
            fullName,
            username,
            email,
            password, 
            createdAt: new Date()
        };
        
        const result = await users.insertOne(newUser);
        res.json({ message: 'User created successfully', userId: result.insertedId });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//===Login API===//
app.post('/api/login', async (req, res) => {
       console.log('Login request received:', req.body);
    try {
        const db = client.db('gctu_hostels');
        const users = db.collection('users');
        
        const { username, password } = req.body;
        
        // Find user by username and password
        const user = await users.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // Return user data (without password)
        res.json({ 
            message: 'Login successful', 
            user: { 
                id: user._id, 
                fullName: user.fullName, 
                username: user.username, 
                email: user.email 
            } 
        });
        
    } catch (err) {
         console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});