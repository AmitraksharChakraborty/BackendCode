// User Class
class User {
    constructor(userId, username, password) {
        this.userId = userId;
        this.username = username;
        this.password = password;
    }

    static users = []; // Array to store registered users

    static register(username, password) {
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

    login(inputUsername, inputPassword) {
        if (this.username === inputUsername && this.password === inputPassword) {
            console.log(`${this.username} logged in successfully.`);
            return true;
        } else {
            console.log("Login failed. Invalid credentials.");
            return false;
        }
    }
}

// Activity Class
class Activity {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type; // Co-Curricular or Extra-Curricular
        this.participants = []; // Array of participant usernames
    }

    addParticipant(student) {
        this.participants.push(student.username);
        console.log(`${student.username} joined "${this.name}" (${this.type}).`);
    }

    getDetails() {
        console.log(`Activity: ${this.name} (${this.type})`);
        console.log(`Description: ${this.description}`);
        console.log("Participants:");
        this.participants.forEach((username) => console.log(`- ${username}`));
    }
}

// Student Class
class Student extends User {
    constructor(userId, username, password) {
        super(userId, username, password);
        this.registeredCoCurricular = [];
        this.registeredExtraCurricular = [];
    }

    joinActivity(activity) {
        if (activity.type === "Extra-Curricular" && this.registeredExtraCurricular.length >= 3) {
            console.log("You can only register for up to 3 Extra-Curricular activities.");
            return;
        }

        if (activity.type === "Co-Curricular") {
            this.registeredCoCurricular.push(activity);
        } else if (activity.type === "Extra-Curricular") {
            this.registeredExtraCurricular.push(activity);
        }

        activity.addParticipant(this);
    }

    viewRegisteredActivities() {
        console.log("\nRegistered Co-Curricular Activities:");
        this.registeredCoCurricular.forEach((activity) => console.log(`- ${activity.name}`));

        console.log("\nRegistered Extra-Curricular Activities:");
        this.registeredExtraCurricular.forEach((activity) => console.log(`- ${activity.name}`));
    }
}

// Admin Class
class Admin extends User {
    constructor(userId, username, password) {
        super(userId, username, password);
        this.coCurricularActivities = [];
        this.extraCurricularActivities = [];
    }

    addActivity(name, description, type) {
        const activity = new Activity(name, description, type);
        if (type === "Co-Curricular") {
            this.coCurricularActivities.push(activity);
        } else if (type === "Extra-Curricular") {
            this.extraCurricularActivities.push(activity);
        }
        console.log(`Added ${type} activity: "${name}".`);
    }

    viewActivities() {
        console.log("\nAll Co-Curricular Activities:");
        this.coCurricularActivities.forEach((activity) => {
            activity.getDetails();
        });

        console.log("\nAll Extra-Curricular Activities:");
        this.extraCurricularActivities.forEach((activity) => {
            activity.getDetails();
        });
    }
}

// Main Script
const main = () => {
    console.log("Program started...\n");

    // Admin Registration
    const admin = new Admin(1, "admin1", "password123");
    console.log("Admin registered successfully!\n");

    // Admin adds activities
    admin.addActivity("Science Fair", "A co-curricular science event", "Co-Curricular");
    admin.addActivity("Debate Competition", "A co-curricular debate event", "Co-Curricular");
    admin.addActivity("Basketball Match", "An extra-curricular sports event", "Extra-Curricular");
    admin.addActivity("Art Competition", "An extra-curricular art event", "Extra-Curricular");

    // Admin views all activities
    console.log("\n=== Admin: View All Activities ===");
    admin.viewActivities();

    // Student Registration
    const student1 = User.register("student1", "password123");
    const studentInstance = new Student(student1.userId, student1.username, student1.password);

    // Student joins activities
    console.log("\n=== Student: Join Activities ===");
    const allActivities = [...admin.coCurricularActivities, ...admin.extraCurricularActivities];

    studentInstance.joinActivity(allActivities[0]); // Science Fair
    studentInstance.joinActivity(allActivities[2]); // Basketball Match
    studentInstance.joinActivity(allActivities[3]); // Art Competition

    // Student views registered activities
    console.log("\n=== Student: View Registered Activities ===");
    studentInstance.viewRegisteredActivities();

    // Admin views all activities again to see participants
    console.log("\n=== Admin: View Activities with Participants ===");
    admin.viewActivities();
};

// Run the program
main();
