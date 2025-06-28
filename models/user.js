const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, id) {
    this.name = username;
    this.email = email;
  }

  save() {
    // Logic to save the user to the database
    console.log(`Saving user: ${this.username}, Email: ${this.email}`);
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("User saved:", result);
      })
      .catch((err) => {
        console.error("Error saving user:", err);
      });
  }

  static findById(userId) {
    // Logic to find a user by ID in the database
    console.log(`Finding user with ID: ${userId}`);
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        if (user) {
          console.log("User found:", user);
          return user;
        } else {
          console.log("User not found");
          return null;
        }
      })
      .catch((err) => {
        console.error("Error finding user:", err);
        throw err;
      });
  }
}

module.exports = User;
