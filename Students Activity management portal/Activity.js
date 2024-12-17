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