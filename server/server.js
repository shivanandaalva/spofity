
const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const port = 8000;
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = new sqlite3.Database('./spotify.db');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/coverimg')
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() +  path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


// Body-parser middleware
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Verification");
  next();
});

app.get('/', (req, res) => {

  res.send('Hello World!')
})
app.get('/songhome', (req, res) => {

  let song=[];
  let obj={};
  db.serialize(() => {
    db.all(`SELECT * from songartistview group by songname order by ratings DESC limit 10 `,(err, row) => {
      Object.keys(row).forEach(el => {
         
        song.push(row[el]);
      });
    
      res.send(JSON.stringify(song));
    });
 
  });


})
app.get('/viewhome', (req, res) => {

  let song=[];
  let obj={};
  db.serialize(() => {
    db.all(`SELECT * from songartistview  `,(err, row) => {
      Object.keys(row).forEach(el => {
         
        song.push(row[el]);
      });
    
      res.send(JSON.stringify(song));
    });
 
  });


})
app.get('/artisthome', (req, res) => {

  let song=[];
  let obj={};
  db.serialize(() => {
    db.all(`SELECT * from songartistview group by name order by ratings DESC limit 10 `,(err, row) => {
      Object.keys(row).forEach(el => {
         
        song.push(row[el]);
      });
    
      res.send(JSON.stringify(song));
    });
 
  });


})
app.get('/song/:id', (req, res) => {

  let song=[];

  db.serialize(() => {
    db.all(`SELECT * from songartists where song_id=?`,[req.params.id],(err, row) => {
      Object.keys(row).forEach(el => {
         
        song.push(row[el]);
      });
    
      res.send(JSON.stringify(song));
    });

  });
 

})
app.post('/newsong',upload.single('cover'), (req, res) => {
  // console.log(req.body);
  // console.log(req.file);


  // db.serialize(() => {
  //   db.run(`DELETE FROM song where songid=19`);
  // });
let arr=req.body.artistid;
let len=arr.length;
console.log(arr.length);

  let ans=[req.body.songname,req.body.dor,req.file.filename];
  let songidtemp;
  db.serialize(() => {
    db.run(`INSERT INTO song ('name','dor','cover') VALUES (?,?,?)`,ans);
    db.each(`SELECT * from song where name=?`,[req.body.songname],(err, row) => {
      
      for(let i=0;i<len;i++){  
        db.each(`INSERT INTO songartists ('song_id','artist_id') VALUES (?,?)`,[row.songid,arr[i]]);
      }
   
    });
  
   
  });
 

 
  return res.redirect('http://localhost:3000/');
})
app.get('/artist', (req, res) => {

  let artist=[];
  let obj={};
  db.serialize(() => {
    db.all(`SELECT * from artist`,(err, row) => {
      Object.keys(row).forEach(el => {
 
        artist.push(row[el]);
      });

      res.send(JSON.stringify(artist));
    });
 
  });
 

})
app.post('/newartist', (req, res) => {
  console.log(req.body);
  db.serialize(() => {
    db.run(`INSERT INTO artist ('name','dob','bio') VALUES (?,?,?)`,[req.body.artistname,req.body.dob,req.body.bio]);
  });
 
  return res.redirect('http://localhost:3000/newsong');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
