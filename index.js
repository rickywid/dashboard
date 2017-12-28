const express       = require('express');
const mysql         = require('mysql');
const cors          = require('cors');
const bodyParser    = require('body-parser')
const app           = express();

// db connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'testDB'
});

// connect to db
db.connect(err => {
    if(err){
        throw err;
    }
    console.log('MySQL connected succesfully...')
})


app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', (req, res)=>{
      
    // get sum of total earnings
    let total = new Promise((resolve, reject)=>{

        let sql = 'SELECT SUM(gain) as total from records';
        db.query(sql, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });

    // get total earnings after each play
    let totalProgress = new Promise((resolve, reject)=>{

        let sql = 'SELECT date, gain from records;';
        db.query(sql, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });    

    // get records for past 7 days
    let sevenDays = new Promise((resolve, reject)=>{

        let sql = 'SELECT gain, date as sevenDays FROM records ORDER BY id DESC LIMIT 7';
        let query = db.query(sql, (err, results) => {
            if(err) return reject(err);

            resolve(results);
        });
    });    

    // get records of previous months
    let monthTotal = new Promise((resolve, reject)=>{
        let sql = 'SELECT MONTH(date) as month, SUM(gain) as gain FROM records GROUP BY MONTH(date) ORDER BY MONTH(date)';
        // let sql = 'select sum(gain) from records where date between curdate() - interval 1 month and curdate()';
        let query = db.query(sql, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });                

    // get total number of total records 
    let numRecords = new Promise((resolve, reject)=>{
        let sql = 'SELECT COUNT(id) as numRecords FROM records';
        let query = db.query(sql, (err, results) => {
            if(err) reject(err);

            resolve(results);
        });        
    });

    // get longest win streak
    let winStreak = new Promise((resolve, reject)=>{
        let sql = 'SELECT COUNT(id) as winStreak FROM records WHERE id < (SELECT MIN(id) FROM records WHERE win = "f")';
        let query = db.query(sql, (err, results) => {
            if(err) reject(err);

            resolve(results);
        });  
    });        

    // get the avg win per play
    let avgWin = new Promise((resolve, reject)=>{
        let sql = 'SELECT AVG(gain) as avgWin FROM records';
        let query = db.query(sql, (err, results) => {
            if(err) reject(err);

            resolve(results);
        });                    
    });        

    // get last record
    let lastPlay = new Promise((resolve, reject)=>{
        let sql = 'SELECT gain, date as lastPlay FROM records ORDER BY id DESC LIMIT 1';
        let query = db.query(sql, (err, results) => {
            if(err) reject(err);

            resolve(results);
        });          
    });    

    // get win, loss record count
    let winRecord = new Promise((resolve, reject)=>{
        let sql = 'SELECT win, COUNT(*) as count FROM records GROUP BY win;';
        let query = db.query(sql, (err, results) => {
            if(err) reject(err);

            resolve(results);
        });          
    });               

    Promise.all([total, sevenDays, monthTotal, numRecords, winStreak, avgWin, lastPlay, totalProgress, winRecord]).then((results) => {
            res.json({ 
                total: results[0], 
                sevenDays: results[1], 
                monthTotal: results[2], 
                numRecords: results[3], 
                winStreak: results[4],
                avgWin: results[5],
                lastPlay: results[6],
                totalProgress: results[7], 
                winRecord: results[8],
            });
        }).catch((err) => {
            res.send({});
        });    
});

app.post('/add', function(req, res){
    let win = req.body.amount > 0 ? 't' : 'f';
    let post = {gain:parseInt(req.body.amount), date: req.body.date, win: win};
    let sql = 'INSERT INTO records SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send('successfully added');
    });
});

app.listen('3001', () => {
    console.log('Server started on port 3001');
});

