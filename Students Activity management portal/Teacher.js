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