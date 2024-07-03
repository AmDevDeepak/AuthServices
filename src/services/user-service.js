const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at service layer.");
      throw error;
    }
  }

  async signIn(email, planePassword) {
    try {
      // Step 1 : Fetch the user using email.
      const user = await this.userRepository.getByEmail(email);
      // Step 2 : Compare plane password with encrypted one.
      const passwordMatch = this.checkPassword(planePassword, user.password);
      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
      // Step 3 : if password matches, create a token and send it to the user.
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
    } catch (error) {
      console.log("Something went wrong in Sign In process.");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "User not found" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in token creation.");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation.");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token verification.", error);
      throw error;
    }
  }

  checkPassword(userInputPlanePassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlanePassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison.");
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in password comparison.");
      throw error;
    }
  }
}

module.exports = UserService;
