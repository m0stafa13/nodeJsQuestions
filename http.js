let http = require("http")
let fs = require("fs")
const path = require("path")

// function to read data 
let readAllData = () => {
    return JSON.parse(fs.readFileSync(path.resolve("./users.json"), "utf-8"))
}
//function to write in json file 
let writeAllData = (data) => {
    return fs.writeFileSync(path.resolve('./users.json'), JSON.stringify(data), "utf-8")
}
let server = http.createServer((req, res) => {
    let { url, method } = req
    // add new user 
    if (url == "/add-user" && method == "POST") {
        let allUsers = readAllData()
        let userData = ''
        req.on("data", (chunk) => {
            userData = JSON.parse(chunk)
        })
        req.on("end", () => {
            let checkUser = allUsers.find((user) => {
                return user.email == userData.email
            })
            if (checkUser) { // user already in the file  //user exist 
                res.writeHead(409, { //conflict  == >409
                    "content-type": "application/json"
                }
                )
                res.end(JSON.stringify({
                    message: "Email already exists."
                }))
            } else { //adding user   // new user 

                allUsers.push(userData)
                writeAllData(allUsers)
                res.writeHead(201, {
                    "content-type": "application/json"
                })
                res.end(JSON.stringify({
                    message: "User added success"
                }))
            }
        })
    } // updata user data 
    else if (url == "/update-user-info" && method == "PATCH") {
        let allUsers = readAllData()
        let userInfo = ' '
        req.on("data", (chunk) => {
            userInfo = JSON.parse(chunk)
        })
        req.on("end", () => {
            let { id, email, name, password, age } = userInfo;
            let checkUser = allUsers.find((user) => {
                return user.id == id
            })
            if (checkUser) {
                name ? checkUser.name = name : null
                email ? checkUser.email = email : null
                password ? checkUser.password = password : null
                age ? checkUser.age = age : null

                writeAllData(allUsers)
                res.writeHead(200, {
                    "content-type": "application/json"
                })
                res.end(JSON.stringify({ msg: "user updated successfully " }))
            } else {
                res.writeHead(404, {
                    "content-type": "application/json"
                })
                res.end(JSON.stringify({ msg: "User is not found " }))
            }
        })















    } // delete user py id from url  
    else if (url.startsWith("/delete/") && method == "DELETE") {
        let id = url.split("/").at(-1)
        let allUsers = readAllData()
        let theUser = allUsers.findIndex((user) => {
            return user.id == id
        })
        if (theUser > -1) {
            allUsers.splice(theUser, 1)
            writeAllData(allUsers)
            res.writeHead(200, {
                "content-type": "application/json"
            })
            res.end(JSON.stringify({
                message: "user deleted "
            }))
        } else {
            res.writeHead(404, {
                "content-type": "application/json"
            })
            res.end(JSON.stringify({
                message: "user is not  found "
            }))
        }













    }// get all data from json file 
    else if (url == "/get-all-users" && method == "GET") {
        let allUsers = readAllData()
        res.writeHead(200, {
            "content-type": "application/json"
        })
        res.end(JSON.stringify(allUsers))
    }// get user data py id 
    else if (url.startsWith("/user/") && method == "GET") {

        let id = url.split("/").at(-1)
        let allUsers = readAllData()
        let theUser = allUsers.find((user) => {
            return user.id == id
        })
        if (theUser) {
            res.writeHead(200, {
                "content-type": "application/json"
            })
            res.end(JSON.stringify(theUser))
        } else {
            res.writeHead(404, {
                "content-type": "application/json"
            })
            res.end(JSON.stringify({
                message: "user is not  found "
            }))
        }
    }
    else {
        res.writeHead(404, { // if api is not valid ==> (wrong api)
            "content-type": "application/json"
        })
        res.end(JSON.stringify({
            message: "server not found "
        }))

    }




}
)

server.listen(3000, () => {
    console.log("server running on port 3000")
})