// User Class
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
  //==========================================================================================================
  
  // Activity Class
  class Activity {
    constructor(activityId, name, description, type) {
      this.activityId = activityId;
      this.name = name;
      this.description = description;
      this.type = type; // "Co-Curricular" or "Extra-Curricular"
      this.participants = [];
    }
  
    addParticipant(student) {
      if (!this.participants.includes(student.username)) {
        this.participants.push(student.username);
        console.log(`${student.username} joined ${this.name}`);
      } else {
        console.log(`${student.username} is already registered for ${this.name}`);
      }
    }
  
    getDetails() {
      console.log(`Activity: ${this.name} (${this.type})`);
      console.log(`Description: ${this.description}`);
      console.log("Participants:");
      this.participants.forEach((username) => console.log(`- ${username}`));
    }
  
    static activities = []; // List of all activities
  
    static addActivity(activity) {
      this.activities.push(activity);
    }
  
    static findActivityById(activityId) {
      return this.activities.find((activity) => activity.activityId === activityId);
    }
  }
  //=========================================================================================================
  
  // Student Class
  class Student extends User {
    constructor(userId, username, password) {
      super(userId, username, password);
      this.coCurricularActivities = [];
      this.extraCurricularActivities = [];
    }
  
    registerActivity(activityId) {
      const activity = Activity.findActivityById(activityId);
  
      if (!activity) {
        console.log("Activity not found.");
        return;
      }
  
      if (activity.type === "Extra-Curricular" && this.extraCurricularActivities.length >= 3) {
        console.log("Cannot register for more than 3 Extra-Curricular activities.");
        return;
      }
  
      if (activity.type === "Co-Curricular") {
        this.coCurricularActivities.push(activity);
      } else if (activity.type === "Extra-Curricular") {
        this.extraCurricularActivities.push(activity);
      }
  
      activity.addParticipant(this);
      console.log(`Registered for activity: ${activity.name} (${activity.type})`);
    }
  
    viewRegisteredActivities() {
      console.log("Registered Co-Curricular Activities:");
      this.coCurricularActivities.forEach((activity) => console.log(`- ${activity.name}`));
  
      console.log("Registered Extra-Curricular Activities:");
      this.extraCurricularActivities.forEach((activity) => console.log(`- ${activity.name}`));
    }
  }
  //========================================================================================================
  
  // Teacher Class
  class Teacher extends User {
    constructor(userId, username, password) {
      super(userId, username, password);
    }
  
    addCoCurricularActivity(activity) {
      Activity.addActivity(activity);
      console.log(`Co-Curricular activity "${activity.name}" added successfully.`);
    }
  
    addExtraCurricularActivity(activity) {
      Activity.addActivity(activity);
      console.log(`Extra-Curricular activity "${activity.name}" added successfully.`);
    }
  
    viewAllActivities() {
      console.log("All Activities:");
      Activity.activities.forEach((activity) => activity.getDetails());
    }
  
    viewStudentDetails() {
      console.log("Student Enrollments:");
      this.viewAllActivities();
    }
  }
  //====================================================================================================
  
  // Main Script
  const main = () => {
    // Admin Registration and Login
    let admin = User.register("admin1", "password123");
    if (!admin) return;
  
    admin = new Teacher(admin.userId, admin.username, admin.password);
  
    if (admin.login("admin1", "password123")) {
      console.log("Admin logged in.");
  
      // Admin adds activities
      const activity1 = new Activity(101, "Science Fair", "A co-curricular science event", "Co-Curricular");
      const activity2 = new Activity(102, "Basketball Match", "An extra-curricular sports event", "Extra-Curricular");
      const activity3 = new Activity(103, "Art Competition", "An extra-curricular art event", "Extra-Curricular");
      const activity4 = new Activity(104, "Debate Competition", "A co-curricular debate event", "Co-Curricular");
  
      admin.addCoCurricularActivity(activity1);
      admin.addExtraCurricularActivity(activity2);
      admin.addExtraCurricularActivity(activity3);
      admin.addCoCurricularActivity(activity4);
  
      admin.viewAllActivities();
    }
  
    // Student Registration and Login
    let student1 = User.register("student1", "password456");
    if (!student1) return;
  
    student1 = new Student(student1.userId, student1.username, student1.password);
  
    if (student1.login("student1", "password456")) {
      console.log("Student logged in.");
  
      // Student registers for activities
      student1.registerActivity(101); // Science Fair
      student1.registerActivity(102); // Basketball Match
      student1.registerActivity(103); // Art Competition
  
      // View registered activities
      student1.viewRegisteredActivities();
    }
  
    // Admin views student details
    admin.viewStudentDetails();
  };
  
  // Run the main script
  main();
  