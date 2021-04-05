const express = require('express');
const app = express();
const pool = require('./db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.get('/', (req, res)=> {
    res.render('home');
});

app.get('/login', (req, res)=> {
    if(isLoggedIn) {
        res.redirect('/institute');
    } else {
    res.render('login');
}
});

let isLoggedIn = false;

app.post('/login',(req, res)=> {
    let {username} = req.body;
    let {password} = req.body;
    if(isLoggedIn) {
        res.redirect('/institute');
    } else if(username === 'test' && password === 'test') {
        isLoggedIn = true;
        res.redirect('/institute');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res)=> {
    if(isLoggedIn) {
        isLoggedIn = false;
        res.redirect('/login');
    } else {
        res.redirect('back');
    }
    
})

app.get('/institute',isAuth, (req, res)=> {
    res.render('institute');
})
//////////STUDENT ROUTES //////////////////////
app.get('/institute/student', isAuth, async (req, res)=> {
    const data = await pool.query('SELECT * FROM student ORDER BY id ASC');
    res.render('student',{data : data.rows});
});

app.get('/institute/student/new',isAuth,  (req, res)=> {
    res.render('newstudent');
});

app.post('/institute/student',isAuth, async (req, res)=> {
    try {
        const {name} = req.body;
        const {email} = req.body;
        const {address} = req.body;
        const {dob} = req.body;
        let {phno} = req.body;
        phno = Number(phno);
        const newStudent = await pool.query('INSERT INTO student (sname,email, address, dob, phone) VALUES ($1,$2,$3,$4,$5)',
        [name,email,address,dob,phno]);
        res.redirect('/institute/student');
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    
    }
});

app.get('/institute/student/edit',isAuth, (req, res) => {
    res.render('editstudent');
})

app.put('/institute/student', isAuth,async (req, res) => {
    try {
        const {id} = req.body;
        const {name} = req.body;
        const {email} = req.body;
        const {address} = req.body;
        const {dob} = req.body;
        let {phno} = req.body;
        phno = Number(phno);
        const updateStudent = await pool.query('UPDATE student SET sname = $1, email = $2, address = $3, dob = $4, phone = $5 WHERE id = $6',
        [name,email,address, dob, phno,id]);
        res.redirect('/institute/student');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})

app.get('/institute/student/delete',isAuth, (req, res) => {
    res.render('deletestudent');
})

app.delete('/institute/student',isAuth, async (req, res) => {
    try {
        const {id} = req.body;
        const deleteStudent = await pool.query('DELETE FROM student WHERE id = $1',
        [id]);
        res.redirect('/institute/student');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

////////////////////TEACHER ROUTES ///////////////////

app.get('/institute/teacher',isAuth, async (req, res)=> {
    const data = await pool.query('SELECT * FROM teacher ORDER BY id ASC');
    res.render('teacher',{data : data.rows});
});

app.get('/institute/teacher/new', isAuth, (req, res)=> {
    res.render('newteacher');
});

app.post('/institute/teacher',isAuth, async (req, res)=> {
    try {
        const {name} = req.body;
        const {email} = req.body;
        const {address} = req.body;
        const {dob} = req.body;
        let {phno} = req.body;
        phno = Number(phno);
        const newTeacher = await pool.query('INSERT INTO teacher (tname,email, address, dob, phone) VALUES ($1,$2,$3,$4,$5)',
        [name,email,address,dob,phno]);
        res.redirect('/institute/teacher');
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    
    }
});

app.get('/institute/teacher/edit',isAuth, (req, res) => {
    res.render('editteacher');
})

app.put('/institute/teacher',isAuth, async (req, res) => {
    try {
        const {id} = req.body;
        const {name} = req.body;
        const {email} = req.body;
        const {address} = req.body;
        const {dob} = req.body;
        let {phno} = req.body;
        phno = Number(phno);
        const updateTeacher = await pool.query('UPDATE teacher SET tname = $1, email = $2, address = $3, dob = $4, phone = $5 WHERE id = $6',
        [name,email,address, dob, phno,id]);
        res.redirect('/institute/teacher');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})

app.get('/institute/teacher/delete',isAuth, (req, res) => {
    res.render('deleteteacher');
})

app.delete('/institute/teacher',isAuth, async (req, res) => {
    try {
        const {id} = req.body;
        const deleteTeacher = await pool.query('DELETE FROM teacher WHERE id = $1',
        [id]);
        res.redirect('/institute/teacher');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

////////////////COURSE ROUTES ////////////////////

app.get('/institute/course', isAuth,async (req, res) => {
    const data = await pool.query('SELECT * FROM course ORDER BY id ASC');
    res.render('course',{data : data.rows});
});

app.get('/institute/course/new',  (req, res)=> {
    res.render('newcourse');
});

app.post('/institute/course',isAuth, async (req, res)=> {
    try {
        const {name} = req.body;
        let {credit} = req.body;
        let {duration} = req.body;
        credit = Number(credit);
        duration = Number(duration);
        const newCourse = await pool.query('INSERT INTO course(cname, credit, duration) VALUES ($1, $2, $3)',
        [name, credit, duration]);
        res.redirect('/institute/course');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
        
    }
});

app.get('/institute/course/edit',isAuth, (req, res) => {
    res.render('editcourse');
})

app.put('/institute/course',isAuth, async (req, res) => {
    try {
        const {id} = req.body;
        const {name} = req.body;
        let {credit} = req.body;
        let {duration} = req.body;
        credit = Number(credit);
        duration = Number(duration);
        const updateCourse = await pool.query('UPDATE course SET cname = $1, credit = $2, duration = $3 WHERE id = $4',
        [name, credit, duration, id]);
        res.redirect('/institute/course')
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.get('/institute/course/delete', isAuth,(req, res) => {
    res.render('deletecourse');
})

app.delete('/institute/course/',isAuth, async (req, res)=> {
    try {
        const {id} = req.body;
        const deleteCourse = await pool.query('DELETE FROM course WHERE id = $1',
        [id]);
        res.redirect('/institute/course');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

///////////////////////REPORT////////////////////

app.get('/institute/report/',isAuth, async (req, res)=> {
    const data = await pool.query('SELECT * FROM report ORDER BY id ASC')
    res.render('report',{data: data.rows});
});

app.get('/institute/report/new',isAuth, async (req, res)=> {
    const sdata = await pool.query('SELECT id FROM student ORDER BY id ASC');
    const cdata = await pool.query('SELECT id FROM course ORDER BY id ASC');
    res.render('newreport',{sdata: sdata.rows, cdata : cdata.rows});
});

app.post('/institute/report',isAuth, async (req, res)=> {
    try {
        const sid = Number(req.body.sid);
        const cid = Number(req.body.cid);
        const  marks = Number(req.body.marks);
        const {remark} = req.body;
        const newReport = await pool.query('INSERT INTO report(sid, cid, marks, remark) VALUES($1, $2, $3, $4)',
        [sid, cid, marks, remark]);
        res.redirect('/institute/report');
    } catch (err) {
        res.send(err.message);
        
    }

});

app.post('/institute/report/view',isAuth, (req, res)=> {
    const {id} = req.body;
    console.log(id);
    let url = '/institute/report/view/' + id ;
    res.redirect(url);
});

app.get('/institute/report/view/:id',isAuth, async (req, res)=> {
    const id = req.params.id;
    const sReport =await pool.query('SELECT * FROM report INNER JOIN student ON student.id = report.sid WHERE student.id = $1',
    [id]);
    res.render('showreport', {report : sReport.rows});
});

app.get('/institute/report/edit',isAuth, async (req, res)=> {
    const sdata = await pool.query('SELECT id FROM student ORDER BY id ASC');
    const cdata = await pool.query('SELECT id FROM course ORDER BY id ASC');
    res.render('editreport',{sdata: sdata.rows, cdata : cdata.rows});
});

app.put('/institute/report/',isAuth, async (req, res)=> {
    try {
        const id = Number(req.body.id);
        const sid = Number(req.body.sid);
        const cid = Number(req.body.cid);
        const marks = Number(req.body.marks);
        const {remark} = req.body;
        const updateReport = await pool.query('UPDATE report SET sid = $1, cid = $2, marks = $3, remark = $4 WHERE id = $5',
        [sid, cid, marks, remark, id]);
        res.redirect('/institute/report/');
    } catch (err) {
        console.log(err.message);
        res.json(err.message);
    }
    


}); 

app.get('/institute/report/delete',isAuth, (req, res) => {
    res.render('deletereport');
});

app.delete('/institute/report/',isAuth, async (req, res)=> {
    try {
        const {id} = req.body;
        const deleteReport = await pool.query('DELETE FROM report WHERE id = $1',
        [id]);
        res.redirect('/institute/report');
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

function isAuth(req, res, next) {
    if(isLoggedIn) {
        return next();
    } else {
        res.redirect('/login');
    }
}





app.get('*', (req, res) => {
    res.json("Wrong URL please go back!!");
});

app.listen(3000, ()=> console.log('server running'));

