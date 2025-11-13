const http=require("http")
const fs=require("fs/promises")
const {addRecord,login}=require("./db")

//util function
//function to read file data
async function renderHtml(fileName,res) {
    const data= await fs.readFile(fileName);
    res.end(data);
}

const Server=http.createServer((req,res)=>{
    //handling GET Request
    if(req.method=="GET"){
        let file;
        if(req.url=="/"){
            file="index.html";
        }
        else if(req.url=="/login"){
            file="Login.html"
        }
        else if(req.url=="/register"){
            file="Register.html"
        }
        else if(req.url.endsWith(".css")){
            file=req.url.slice(1)
        }

        if(file){
            renderHtml(file,res)
        }
        else{
            res.end("404 Page not found")
        }
    }

    //handling post request
    else if(req.method=="POST"){
        //Register submit route
        if(req.url=="/submit-register"){
            let data="";
            req.on("data",(chunk)=>{
                data+=chunk;
            })

            req.on("end",()=>{
                data=JSON.parse(data);
                const response = addRecord(data)
                res.end(response)
            })
        }

        //Login submit Route
        else if(req.url=="/submit-login"){
            let data="";
            req.on("data",(chunk)=>{
                data+=chunk
            })
            req.on("end",()=>{
                console.log(data)
                data=JSON.parse(data)
                const loginMessage= login(data);
                res.end(loginMessage)
            })
        }
    }
    else{
        res.end("No Route Match")
    }
})


const PORT=4400;
Server.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT}`)
})