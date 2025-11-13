const fs=require("fs")
let dbName="db.json"
function addRecord(data){
    let oldData;
    if(fs.existsSync(dbName)){
        oldData=fs.readFileSync(dbName,"utf-8")
        if(oldData==""){
            oldData="[]";
        }
    }
    else{
        oldData="[]"
    }
    let users=JSON.parse(oldData);
    let isExists=false;
    for(let i=0; i<users.length;i++){
        if(users[i].email==data.email){
            isExists=true;
            break;
        }
    }
    if(isExists){
        return ("User Already Register")
    }
    else{
        users.push(data);
        fs.writeFileSync(dbName,JSON.stringify(users));
        return "User Registered Successfully";
    }
}

function login(data){
    let oldData;
    if(fs.existsSync(dbName)){
        oldData=fs.readFileSync(dbName,"utf-8");
    }
    else{
        oldData="[]";
    }
    const users=JSON.parse(oldData);
    let isSucess=false;
    for(let user of users){
        if(user.email==data.email && user.password==data.password){
            isSucess=true;
            break;
        }
    }
    if(isSucess){
        return "Login Successfuly";
    }
    else{
        return "Wrong Email or password";
    }
}

module.exports={addRecord,login};