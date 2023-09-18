class Test_Log_Table{
    constructor(Test_Id, Student_Id, Course_Id, MarksScored, TotalMarks, Date, Percentage, AvgDiff){
        this.Test_Id = Test_Id;
        this.Student_Id = Student_Id;
        this.Course_Id = Course_Id;
        this.MarksScored = MarksScored;
        this.TotalMarks = TotalMarks;
        this.Date = Date;
        this.Percentage = Percentage;
        this.AvgDiff = AvgDiff;
    }
}

module.exports = Test_Log_Table;