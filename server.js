const express = require('express');
const app = express()
const path = require('path');
const logEvents = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500;
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWt')
const cookieParser = require('cookie-parser');


const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')


//custom middleware logger
app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({extended: false}))
//json
app.use(express.json());
//static files
//app.use(express.static(path.join(__dirname, '/public')));



//cookies
app.use(cookieParser())



//when using router
//app.use('/api', require('./routes/api'))

app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
app.use('/logout', require('./routes/api/logout'))


app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))

// app.get('/', (req, res)=>{
//    res.send('HEllo mathias');
//    //using sendFile res.sendFIle(path, file)

//    //regex ^/$|/index(.html)?
//    //routes ------   

//    //redirection
//    //res.redirect(301, '/new-paeh.html')  //302 by default 

//    app.get('/*', (req, res)=>{
//  //res.status(404).sendFile(path.join(path, 'file'))
//    })
  
// });


// app.get('/hi', (req, res, next)=>{
//     res.send('hi this is mathias')
//     next()
// },  (req, res)=>{
//     res.send('this is also mathias')
// })


//route handlers
 
app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Sever is running on ports ${PORT}`));