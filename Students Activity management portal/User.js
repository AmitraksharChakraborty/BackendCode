class User {
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }

  static users = []; // List of all registered users

  static register(username, password) {
    // Check if the username already exists
    const existingUser = User.users.find((user) => user.username === username);
    if (existingUser) {
      console.log("User already registered. Please log in.");
      return null;
    }

    const newUser = new User(User.users.length + 1, username, password);
    User.users.push(newUser);
    console.log("Registration successful! Please log in.");
    return newUser;
  }

  login(username, password) {
    if (this.username === username && this.password === password) {
      console.log(`${this.username} logged in successfully.`);
      return true;
    }
    console.log("Login failed. Invalid credentials.");
    return false;
  }
}