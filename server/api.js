const userRouter = require('./api/user/user.router');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const Db = require('./dboperations');
var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({"origin" : "http://localhost:3000"}));
app.use('/api',router);
app.use("/", userRouter);

router.use((request, response, next)=> { //middleware(used for authentication)
    // console.log("middleware");
    next();
})


router.route('/login').post((request,response)=>
{
    let userinfo = {... request.body};
    Db.getLoginInfo(userinfo).then(result=>
        {
            response.status(201).json(result);
        })
}
)

router.route('/user').get((request,response)=>{
    
    Db.getUsers().then(result =>{
        response.json(result);
    })
})

router.route('/student').post((request,response)=>
{
    let Student_Table = {... request.body};
    Db.addStudent(Student_Table).then(result=>
        {
            response.status(201).json(result);
        })
}
)


router.route('/faculty').post((request,response)=>
{
    let Faculty_Table = {... request.body};
    Db.addFaculty(Faculty_Table).then(result=>
        {
            response.status(201).json(result);
        })
}
)


router.route('/institute').post((request,response)=>
{
    let Institute_Table = {... request.body};
    Db.addInstitute(Institute_Table).then(result=>
        {
            response.status(201).json(result);
        })
}
)

router.route('/student/:id/course').get((request,response)=>
{
    Db.getStudentCourse(request.params.id).then(result =>{
        response.json(result);
    })
}
)

router.route('/student/:id').get((request,response)=>{
    
    Db.getStudent(request.params.id).then(result =>{
        response.json(result);
    })
})


router.route('/testlog/:id').get((request,response)=>{
    
    Db.getTestLog(request.params.id).then(result =>{
        response.json(result);
    })
})




router.route('/faculty/:id/course').get((request,response)=>
{
    Db.getFacultyCourse(request.params.id).then(result =>{
        response.json(result);
    })
}
)

router.route('/faculty/:id').get((request,response)=>{
    
    Db.getFaculty(request.params.id).then(result =>{
        response.json(result);
    })
})


router.route('/institute/:id/course').get((request,response)=>{
    Db.getInstituteCourse(request.params.id).then(result =>{
        response.json(result);
    })
})

router.route('/institute/:id').get((request,response)=>{
    Db.getInstitute(request.params.id).then(result =>{
        response.json(result);
    })
})

router.route('/courses').get((request,response)=>{
    
    Db.getCourses().then(result =>{
        response.json(result);
    })
})

router.route('/course').post((request,response)=>
{
    let courseDetails = {... request.body};
    Db.addCourse(courseDetails).then(result=>
        {
            response.status(201).json(result);
      })
})


router.route('/faculty/course').post((request,response)=> //remaining to check
{
    let params = {... request.body};
    Db.addFacultyCourse(params).then(result=>
        {
            response.status(201).json(result);
        })
})

router.route('/student/course').post((request,response)=> //remaining to check
{
    let params = {... request.body};
    Db.addStudentCourse(params).then(result=>
        {
            response.status(201).json(result);
        })
})


router.route('/question').post((request,response)=>
{
    let questionDetails = {... request.body};
    console.log(questionDetails)
    Db.addQuestion(questionDetails).then(result=>
        {
            response.status(201).json(result);
        })
})

router.route('/testlog').post((request,response)=>
{
    let questionDetails = {... request.body};
    Db.addToTestLog(questionDetails).then(result=>
        {
            response.status(201).json(result);
        })
})


router.route('/question/:id').get((request,response)=>{
    Db.getCourseQuestionBank(request.params.id).then(result =>{
        response.json(result);
    })
})

//get QBAF- diff version remaining

var port = process.env.PORT||8080;
app.listen(port);
console.log('API is running at ' + port);