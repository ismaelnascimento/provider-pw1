class UsersDAO {
    static async getAllUsers(client) {
        const cursor = await client.find().project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getUserByServiceId(client, id) {
        const cursor = await client.find({ serviceId: { id: id } }).project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results[0]
        } catch (e) {
            console.log(e)
        }
    }
    static async getUser(client, find) {
        const cursor = await client.findOne(find);
        try {
            return cursor
        } catch (e) {
            console.log(e)
        }
    }
    static async insertUser(client, doc) {
        const ok = await client.insertOne(doc)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async deleteUserById(client, id) {
        const ok = await client.deleteOne(id)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async updateUserById(client, id, doc) {
        const docs = await client.updateOne(id, doc)

        try {
            return docs
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = UsersDAO


// ex:
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Register User
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const newUser = await User.create({ username, email, password });
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login User
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// ex 2: 
// MongoClient.connect(dbUrl, (err, client) => {
//  if (err) throw err;
//  const db = client.db('login-page');
//  const usersCollection = db.collection('users');
// // Login route
//  app.post('/login', (req, res) => {
//  const { email, password } = req.body;
// usersCollection.findOne({ email }, (err, user) => {
//  if (err) throw err;
// // User not found
//  if (!user) {
//  return res.status(401).send('Invalid email or password');
//  }
// // Compare the provided password with the hashed password stored in the database
//  bcrypt.compare(password, user.password, (err, result) => {
//  if (err) throw err;
// if (result) {
//  // Store user data in session
//  req.session.user = user;
//  res.redirect('/dashboard'); // Redirect to the dashboard page after successful login
//  } else {
//  res.status(401).send('Invalid email or password');
//  }
//  });
//  });
//  });
// // Start the server
//  app.listen(port, () => {
//  console.log(`Server is running on http://localhost:${port}`);
//  });
// });

// Register
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(req.body.password, salt);