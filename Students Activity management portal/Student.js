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