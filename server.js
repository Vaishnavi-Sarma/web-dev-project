const express = require('express')
const app = express()
const port =process.env.PORT || 8080 //to specify to use any available port 

app.use(express.static("frontend"))
app.listen(port,function(){
    console.log("my app is running at http://localhost:" +port)
})