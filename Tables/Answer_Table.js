class Answer_Table{
    constructor(Answer_Id,Quest_Id, Answer, isCorrect){
        this.Answer_Id = Answer_Id;
        this.Quest_Id = Quest_Id;
        this.Answer = Answer;
        this.isCorrect = isCorrect;
    }
}

module.exports = Answer_Table;