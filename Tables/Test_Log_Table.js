class Question_Bank_Table{
    constructor(Test_Id, Student_Id, Course_Id, MarksScored, TotalMarks, Date){
        this.Test_Id = Test_Id;
        this.Student_Id = Student_Id;
        this.Course_Id = Course_Id;
        this.MarksScored = MarksScored;
        this.TotalMarks = TotalMarks;
        this.Date = Date;
    }
}

module.exports = Question_Bank_Table;