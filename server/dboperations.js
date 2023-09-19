var config = require('./dbconfig');
const sql = require('mssql');
const { password } = require('./dbconfig');
//const UserTable = require("./Tables/UserTable")

async function getLoginInfo(params){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('EmailId',sql.VarChar(50),params.EmailId)
            .input('Password', sql.VarChar(150),params.Password)
            .input('TypeId', sql.Int,params.TypeId)
            .execute("GetLoginInfo");
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getUsers(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request()
            .query('Select * from Master_Table');
        return products.recordsets;
    }
    catch(error){
        console.log(error);
    } 
}

async function addStudent(Master_Table)
{
    try
    {
        let pool = await sql.connect(config);
        let insertNewStudent = await pool.request()
            
            .input('EmailId',sql.VarChar(50),Master_Table.EmailId)
            .input('Password',sql.VarChar(150),Master_Table.Password)   
            .input('Name',sql.VarChar(100),Master_Table.Name) 
            .input('MobileNo',sql.Numeric(10,0),Master_Table.MobileNo)
            .execute('RegisterStudent');
        return insertNewStudent.recordsets;    
    }

    catch(error)
    {
        console.log(error);
    }
}

async function addFaculty(Master_Table)
{
    try
    {
        let pool = await sql.connect(config);
        let insertNewFaculty = await pool.request()
            
            .input('EmailId',sql.VarChar(50),Master_Table.EmailId)
            .input('Password',sql.VarChar(150),Master_Table.Password)   
            .input('Name',sql.VarChar(100),Master_Table.Name) 
            .input('MobileNo',sql.Numeric(10,0),Master_Table.MobileNo)
            .execute('RegisterFaculty');
        return insertNewFaculty.recordsets;    
    }

    catch(error)
    {
        console.log(error);
    }
}


async function addInstitute(Master_Table)
{
    try
    {
        let pool = await sql.connect(config);
        // // Convert binary data to a Buffer
        // const AICTEApprovedBuffer = Buffer.from([Master_Table.AICTEApproved]);
        // const AISHECodeBuffer = Buffer.from([Master_Table.AISHECode]);

        let insertNewInstitute = await pool.request()
            
            .input('Password',sql.VarChar(150),Master_Table.Password)   
            .input('Name',sql.VarChar(150),Master_Table.Name)  // Use sql.VarBinary instead of sql.Binary
            // .input('AISHECode', sql.VarBinary, AISHECodeBuffer)         // Use sql.VarBinary instead of sql.Binary
            .input('Address',sql.VarChar(100),Master_Table.Address) 
            .input('Inst_State',sql.VarChar(8000),Master_Table.Inst_State) 
            .input('Inst_City',sql.VarChar(8000),Master_Table.Inst_City) 
            .input('EmailId',sql.VarChar(50),Master_Table.EmailId)
            .input('MobileNo',sql.Numeric(10,0),Master_Table.MobileNo)
            .execute('RegisterInstitute');
        return insertNewInstitute.recordsets;    
    }

    catch(error)
    {
        console.log(error);
    }
}

async function getStudentCourse(Student_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Student_Id", sql.Int,Student_Id)
            .execute('DisplayStudentCourse');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getTestLog(Student_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Student_Id", sql.Int,Student_Id)
            .execute('DisplayTestLog');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}





async function getStudent(Student_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Student_Id", sql.Int, Student_Id)
            .execute('DisplayStudentList');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getFacultyCourse(Fac_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Fac_Id", sql.Int,Fac_Id)
            .execute('DisplayFacultyCourse');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getFaculty(Fac_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Fac_Id", sql.Int, Fac_Id)
            .execute('DisplayFacultyList');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getInstituteCourse(Inst_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Inst_Id", sql.Int,Inst_Id)
            .execute('DisplayInstituteCourse');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getInstitute(Inst_Id){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input("Inst_Id", sql.Int, Inst_Id)
            .execute('DisplayInstituteList');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function getCourses(){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
            .execute('DisplayAllCourses');
        return product.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}

async function addCourse(params) 
{
    try
    {
        let pool = await sql.connect(config);
        let insetNewCourse = await pool.request()
            .input('Course_Name',sql.VarChar(50),params.Course_Name)   
            .input('Course_Code',sql.VarChar(8000),params.Course_Code) 
            .execute('AddCourse');
        return insetNewCourse.recordsets;    
    }
    catch(error){
        console.log(error); }
}


async function addFacultyCourse(params) 
{
    try
    {
        let pool = await sql.connect(config);
        let insertNewFacultyCourse = await pool.request()
            .input('Fac_Id',sql.Int,params.Fac_Id)   
            .input('CourseIdsString',sql.NVarChar(sql.MAX),params.CourseIdsString) 
            .execute('CourseFacultyRegister');
        return insertNewFacultyCourse.recordsets;    
    }
    catch(error){
        console.log(error); }
}

async function addStudentCourse(params)
{
    try
    {
        let pool = await sql.connect(config);
        let insertNewStudentCourse = await pool.request()
            .input('Student_Id',sql.Int,params.Student_Id)   
            .input('CourseIdsString',sql.NVarChar(MAX),params.CourseIdsString) 
            .execute('CourseStudentRegister');
        return insertNewStudentCourse.recordsets;    
    }
    catch(error){
        console.log(error); }
}
async function addQuestion(params) //remaining to check
{
    try
    {
        let pool = await sql.connect(config);
        let insertNewQuestion = await pool.request()
            .input('Question',sql.VarChar(8000),params.Question)   
            .input('Marks',sql.Float,params.Marks)   
            .input('Difficulty',sql.Int,params.Difficulty)   
            .input('Course_Id',sql.Int,params.Course_Id)   
            .input('Answer',sql.VarChar(8000),params.Answer)   
            .input('isCorrect',sql.Bit,params.isCorrect)   
            .input('Answer2',sql.VarChar(8000),params.Answer2)   
            .input('isCorrect2',sql.Bit,params.isCorrect2)   
            .input('Answer3',sql.VarChar(8000),params.Answer3)   
            .input('isCorrect3',sql.Bit,params.isCorrect3)   
            .input('Answer4',sql.VarChar(8000),params.Answer4)   
            .input('isCorrect4',sql.Bit,params.isCorrect4)  
            .input('TimeLimit',sql.Int,params.TimeLimit) 
            .execute('AddQuestion');
        return insertNewQuestion.recordsets;    
    }
    catch(error){
        console.log(error); }
}


async function getCourseQuestionBank(CourseId){
    try{
        let pool = await sql.connect(config);
        let qb = await pool.request()
            .input("CourseId", sql.Int,CourseId)
            .execute('DisplayQBAF');
        return qb.recordsets;
            
    }
    catch(err){
        console.log(err);
    }
}


async function addToTestLog(params) //remaining to check
{
    try
    {
        let pool = await sql.connect(config);
        let insertNewStudentCourse = await pool.request()
            .input('StudentId',sql.Int,params.StudentId)   
            .input('CourseId',sql.Int,params.CourseId) 
            .input('MarksScored',sql.Int,params.MarksScored)   
            .input('TotalMarks',sql.Int,params.TotalMarks) 
            .input('AvgDiff',sql.Float,params.AvgDiff)
            .execute('AddToTestLog');
        return insertNewStudentCourse.recordsets;    
    }
    catch(error){
        console.log(error); }
}

module.exports ={
    getLoginInfo: getLoginInfo,
    getUsers: getUsers,
    addStudent: addStudent,
    addFaculty: addFaculty,
    addInstitute: addInstitute,
    getStudentCourse: getStudentCourse,
    getStudent: getStudent,
    getCourses: getCourses,
    addCourse: addCourse,
    getFaculty: getFaculty,
    getFacultyCourse: getFacultyCourse,
    getInstituteCourse: getInstituteCourse,
    getInstitute: getInstitute,
    addFacultyCourse: addFacultyCourse,
    addStudentCourse: addStudentCourse,
    addQuestion: addQuestion,
    getCourseQuestionBank: getCourseQuestionBank,
    getTestLog : getTestLog,
    addToTestLog : addToTestLog
}
