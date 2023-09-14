var config = require('./dbconfig');
const sql = require('mssql');
const { password } = require('./dbconfig');
//const UserTable = require("./Tables/UserTable")

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
        // Convert binary data to a Buffer
        const AICTEApprovedBuffer = Buffer.from([Master_Table.AICTEApproved]);
        const AISHECodeBuffer = Buffer.from([Master_Table.AISHECode]);

        let insertNewInstitute = await pool.request()
            
            .input('Password',sql.VarChar(150),Master_Table.Password)   
            .input('Name',sql.VarChar(150),Master_Table.Name) 
            .input('AICTEApproved', sql.VarBinary, AICTEApprovedBuffer) // Use sql.VarBinary instead of sql.Binary
            .input('AISHECode', sql.VarBinary, AISHECodeBuffer)         // Use sql.VarBinary instead of sql.Binary
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

module.exports ={
    getUsers: getUsers,
    addStudent: addStudent,
    addFaculty: addFaculty,
    addInstitute: addInstitute,
    getStudentCourse: getStudentCourse,
    getStudent: getStudent,
    getCourses: getCourses,
    getFaculty: getFaculty,
    getFacultyCourse: getFacultyCourse,
    getInstituteCourse: getInstituteCourse
}