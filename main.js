const path = require("path")
const os = require("os")
const fs = require("fs")
const { EventEmitter } = require("events")
const events = new EventEmitter()
const zip = require("zlib")

// const path = require("path")

//1 get path and dire 
let getDirPath = () => {
    console.log(__filename, __dirname);
}
// getDirPath()


//====================================
//2 return file name 
function returnFileName(data) {
    console.log(path.basename(data));
}
// returnFileName("/user/files/report.pdf")

//====================================

//3 create fill dir from opj 
function createDir(data) {
    console.log(path.format(data));
}
// createDir({ dir: "/folder", name: "app", ext: ".js" })

//====================================

//4 return file ex 
function getExtension(data) {
    console.log(path.extname(data));
}
// getExtension("/docs/readme.md")

//====================================

//5 return path as a opj
function parsePath(data) {
    let { name, ext } = path.parse(data)
    console.log({ name, ext });
}
// parsePath(__filename)

//====================================

//6 is absolute 
function isAbsolute(data) {
    console.log(path.isAbsolute(data));

}
// isAbsolute("/home/user/file.txt")

//====================================

//7 join multiple segments 

function joining() {
    console.log(path.join("src", "components", "App.js"));
}
// joining()

//====================================

//8 resolve a relative path 
function resolvePath(data) {
    console.log(path.resolve(data));

}
// resolvePath("index.js")

//====================================

//9 join two paths 
function joins(path1, path2) {
    console.log(path.join(path1, path2));
}
// joins("/folder1", "folder2/file.txt")

//====================================

//10 delete file  
function deleteFile(data) {
    fs.rm(data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("The test.txt is deleted.");
        }
    })
}
// deleteFile("./test.txt")

//====================================

//11 create folder 
function createFolder() {
    fs.mkdir("./Test/test2", { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("file created ");
        }
    })
}
// createFolder() 

//====================================

//12 create start event 
events.on("start", (data) => {
    console.log(data);
})
// events.emit("start", "Welcome event triggered")

//====================================

// 13 login event 

events.on("login", (data) => {
    console.log("user logged in: " + data);
})
// events.emit("login" , "ahmed")

//====================================

//14 read file 
try {
    let data = fs.readFileSync(path.resolve("./notes.txt"), "utf-8")
    // console.log(data);
} catch (error) {
    console.log(error);
}

//====================================

//15 write in file 
try {
    fs.writeFileSync(path.resolve("./async.txt"), "Async save", "utf-8")
} catch (error) {
    console.log(error);

}

//16 if dir exist or not 
function checkDire(dire) {
    console.log(fs.existsSync(dire));
}
// checkDire("./notes.txt")

//17 return os platform and cpu architecture

let returnOsInfo = () => {
    console.log({
        platform: os.platform(),
        Arch: os.arch()
    });
}
// returnOsInfo()

//18 read big file stream 
function readStream() {
    let filePath = path.resolve("./bigdata.txt")
    let readFileStream = fs.createReadStream(filePath, {
        highWaterMark: 1, encoding: "utf-8"
    })
    readFileStream.on("data", (chunk) => {
        console.log(chunk);
    })

}
// readStream()

//19 copy file to another using read and write stream 

function copyScript() {
    let readPath = path.resolve("./bigdata.txt")
    let writePath = path.resolve("./source.txt")
    let readStream = fs.createReadStream(readPath)
    let writeStream = fs.createWriteStream(writePath)
    readStream.on("data", (chunk) => {
        writeStream.write(chunk, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("done");
            }
        })
    })
}
// copyScript()


//20 crate zip 
function zipFile() {
    let compressing = zip.createGzip()
    let filePath = path.resolve("./notes.txt")
    let writePath = path.resolve("./test.zip")
    let readStream = fs.createReadStream(filePath, {
        encoding: "utf-8"
    })
    let writeStream = fs.createWriteStream(writePath)
    readStream.pipe(compressing).pipe(writeStream)
}
// zipFile()



// http  code in http.js 
