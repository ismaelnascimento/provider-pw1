
const bcrypt = require("bcrypt")

const URI = process.env.URI;
const { MongoClient } = require("mongodb")
const client = new MongoClient(URI);

const db = client.db("provider")
const dbUsers = db.collection("users")
const dbServices = db.collection("services")
const dbCategories = db.collection("categories")

module.exports = {
    dbUsers,
    dbServices,
    dbCategories,
    bcrypt
}