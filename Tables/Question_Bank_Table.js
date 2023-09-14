class Question_Bank_Table{
    constructor(Quest_Id,Course_Id, Question, Marks, Difficulty){
        this.Quest_Id = Quest_Id;
        this.Course_Id = Course_Id;
        this.Question = Question;
        this.Marks = Marks;
        this.Difficulty = Difficulty;
    }
}

module.exports = Question_Bank_Table;