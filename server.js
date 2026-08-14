const express = require('express')
const app = express()
const port =process.env.PORT || 8080 //to specify to use any available port 
app.use(express.json())

const users=[
 {
  "id":1,
  "name":"John Doe",
  "gender":"male",
  "image":"https://randomuser.me/api/portraits/men/97.jpg"
 },
 {
  "id":2,
  "name":"Jane",
  "gender":"female",
  "image":"https://randomuser.me/api/portraits/women/5.jpg"
 },
 {
  "id":3,
  "name":"Mrs Norma Vasquez",
  "gender":"female",
  "image":"https://randomuser.me/api/portraits/women/65.jpg"
 },
 {
  "id":4,
  "name":"Mr Angelo Moulin",
  "gender":"female",
  "image":"https://randomuser.me/api/portraits/men/47.jpg"
 },
 {
  "id":5,
  "name":"Mr Oskari Wirta",
  "gender":"female",
  "image":"https://randomuser.me/api/portraits/men/13.jpg"
 }
] 

//api server(get all users)
app.get("/api/users",function(req,res){
   res.status(200).json(users);
})
//get user by id 
function getUserById(uid){
    for(var i=0;i< (users.length);i++){
      if(uid == users[i].id)
        return i;
    }
    return -1;
} 


app.get("/api/users/:id",function(req,res){
    var uid = req.params.id;
    var userId = getUserById(uid);

    if(userId==-1){
        res.status(404).json({"message":"user not found"})
    }
    res.status(200).json(users[userId]);
})
//get random user
app.get("/api/randomuser",function(req,res){
    const rid=Math.floor(Math.random()*users.length);
    res.status(200).json(users[rid]);
})

//add a new user(post api)

 var newUid=users.length + 1;
 app.post("/api/users",function(req,res){
   if(!req.body.name || !req.body.gender || !req.body.image){
    return res.status(200).json({"message":"name/image/gender not defined"});
   }
   let user =req.body;
   user.id=newUid;
   users.push(user);
   res.status(200).json({"message":"user added successfully"});
})

//put : update user details of given id
app.put("/api/users/:id",function(req,res){
    var userID=getUserById(req.params.id);
    if(userID == -1){
      res.status(404).json({"message":"user not found"});
    }
    if(req.body.name)
       users[userID].name=req.body.name;

    if(req.body.gender)
       users[userID].gender=req.body.gender;

    if(req.body.image)
        users[userID].image=req.body.image;
    
    return res.status(200).json({"message":"user updated","users":users[userID]});
})

//delete api
app.delete("/api/users/:id",function(req,res){
    var userID=getUserById(req.params.id);
    if(userID == -1){
      res.status(404).json({"message":"user not found"});
    }
   users.splice(userID, 1);
   res.status(200).json({"message" : "user deleted successfully"})

})

app.use(express.static("frontend"))
app.listen(port,function(){
    console.log("my app is running at http://localhost:" +port)
})

