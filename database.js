const bcrypt = require("bcrypt")

const URI = process.env.URI;
const { MongoClient } = require("mongodb")
const client = new MongoClient(URI);

const db = client.db("provider")
const dbUsers = db.collection("users")
const dbServices = db.collection("services")
const dbFavorites = db.collection("favorites")
const dbCategories = db.collection("categories")
const dbRatings = db.collection("ratings")

module.exports = {
    dbUsers,
    dbServices,
    dbCategories,
    dbFavorites,
    dbRatings,
    bcrypt
}