// Main Script
//import { User } from './User.js';
// This is not proper code.. see Main2.js file..
 class User {
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }

  static users = []; // To keep track of all registered users

  static register(username, password) {
    // Check if username is already registered
    const existingUser = User.users.find((user) => user.username === username);
    if (existingUser) {
      console.log("User already registered. Please log in.");
      return null;
    }
    // Register new user
    const newUser = new User(User.users.length + 1, username, password);
    User.users.push(newUser);
    console.log("Registration successful! Please log in.");
    return newUser;
  }

  login(username, password) {
    if (this.username === username && this.password === password) {
      console.log(`${this.username} logged in successfully.`);
      return true;
    } else {
      console.log("Login failed. Invalid credentials.");
      return false;
    }
  }
  
}
//-------------------------------------------------------------------------------

class Student extends User {
  constructor(userId, username, password) {
    super(userId, username, password);
    this.coCurricularActivities = [];
    this.extraCurricularActivities = [];
  }

  registerActivity(activity) {
    if (activity.type === "Extra-Curricular") {
      if (this.extraCurricularActivities.length >= 3) {
        console.log("Cannot register for more than 3 Extra-Curricular activities.");
        return;
      }
      this.extraCurricularActivities.push(activity);
    } else if (activity.type === "Co-Curricular") {
      this.coCurricularActivities.push(activity);
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
  joinActivity(activity) {
    if (activity.type === "Extra-Curricular" && this.registeredExtraCurricular.length >= 3) {
        console.log("You can only register for up to 3 extra-curricular activities.");
        return;
    }

    if (activity.type === "Co-Curricular") {
        this.registeredCoCurricular.push(activity);
    } else if (activity.type === "Extra-Curricular") {
        this.registeredExtraCurricular.push(activity);
    }

    activity.participants.push(this.username); // Add the student to the activity's participants list
    console.log(`Registered for activity: ${activity.name} (${activity.type})`);
}
}


//=========================================================================================================

class Teacher extends User {
  constructor(userId, username, password) {
    super(userId, username, password);
    this.coCurricularActivities = [];
    this.extraCurricularActivities = [];
  }

  addCoCurricularActivity(activity) {
    this.coCurricularActivities.push(activity);
    console.log(`Co-Curricular activity "${activity.name}" added successfully.`);
  }

  addExtraCurricularActivity(activity) {
    this.extraCurricularActivities.push(activity);
    console.log(`Extra-Curricular activity "${activity.name}" added successfully.`);
  }

  viewAllActivities() {
    console.log("All Co-Curricular Activities:");
    this.coCurricularActivities.forEach((activity) => activity.getDetails());
    console.log("All Extra-Curricular Activities:");
    this.extraCurricularActivities.forEach((activity) => activity.getDetails());
  }

  viewStudentDetails() {
    console.log("Student Enrollments:");
    console.log("Co-Curricular Activities:");
    this.coCurricularActivities.forEach((activity) => activity.getDetails());
    console.log("Extra-Curricular Activities:");
    this.extraCurricularActivities.forEach((activity) => activity.getDetails());
  }
  viewActivities() {
    console.log("All Co-Curricular Activities:");
    this.coCurricularActivities.forEach((activity) => {
        console.log(`Activity: ${activity.name} (${activity.type})`);
        console.log(`Description: ${activity.description}`);
        console.log(`Participants: ${activity.participants.join(", ") || "None"}`);
    });

    console.log("\nAll Extra-Curricular Activities:");
    this.extraCurricularActivities.forEach((activity) => {
        console.log(`Activity: ${activity.name} (${activity.type})`);
        console.log(`Description: ${activity.description}`);
        console.log(`Participants: ${activity.participants.join(", ") || "None"}`);
    });
}

}
//==============================================================================================================

class Activity {
  constructor(activityId, name, description, type) {
    this.activityId = activityId;
    this.name = name;
    this.description = description;
    this.type = type; // "Co-Curricular" or "Extra-Curricular"
    this.participants = [];
  }

  addParticipant(student) {
    this.participants.push(student);
    console.log(`${student.username} joined ${this.name}`);
  }

  getDetails() {
    console.log(`Activity: ${this.name} (${this.type})`);
    console.log(`Description: ${this.description}`);
    console.log("Participants:");
    this.participants.forEach((student) => console.log(`- ${student.username}`));
  }
}
//=========================================================================================================================


const main = () => {
    // Admin Registration and Login
    let admin = User.register("admin1", "password123");
    admin = new Teacher(admin.userId, admin.username, admin.password);
  
    if (admin.login("admin1", "password123")) {
      console.log("Admin logged in.");
  
      // Admin adds activities
      const activity1 = new Activity(101, "Science Fair", "A co-curricular science event", "Co-Curricular");
      const activity2 = new Activity(102, "Basketball Match", "An extra-curricular sports event", "Extra-Curricular");
      const activity3 = new Activity(103, "Art Competition", "An extra-curricular art event", "Extra-Curricular");
      const activity4 = new Activity(104, "Debate Competition", "A co-curricular debate event", "Co-Curricular");
  
      admin.addCoCurricularActivity(activity1);
      admin.addCoCurricularActivity(activity4);
      admin.addExtraCurricularActivity(activity2);
      admin.addExtraCurricularActivity(activity3);
  
      admin.viewAllActivities();
    }
  
    // Student Registration and Login
    let student1 = User.register("student1", "password456");
    student1 = new Student(student1.userId, student1.username, student1.password);
  
    if (student1.login("student1", "password456")) {
      console.log("Student logged in.");
  
      // Student registers for activities
      student1.registerActivity(new Activity(101, "Science Fair", "A co-curricular science event", "Co-Curricular"));
      student1.registerActivity(new Activity(102, "Basketball Match", "An extra-curricular sports event", "Extra-Curricular"));
      student1.registerActivity(new Activity(103, "Art Competition", "An extra-curricular art event", "Extra-Curricular"));
  
      // View registered activities
      student1.viewRegisteredActivities();
    }
  
    // Admin views student details
    admin.viewStudentDetails();
  };
  
  // Run the main script
  main();
  