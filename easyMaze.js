const fs = require('fs');
const path = require('path');

// \*
// process.stdin.on("data", dataBuffer => {
//     const input = dataBuffer.toString().trim();
//     try {
//         \\ const content = fs.readdirSync(`${__dirname}\\\\${input}`);
//         const content = fs.readdirSync(path.relative(__dirname, input));
//         process.stdout.write(content.join("\\n"));
//         process.exit(0);
//     } catch(e) {
//         process.stderr.write(e.toString());
//         process.exit(1);
//     }
// });
//  *\
// \* Methods:
//     fs.readdir
//     fs.readFile
//     fs.lstat
//     fs.writefile
//  *\



function findTreasureSync(roomPath) {

}

function openChestSync(chestPath) {
    try {
       const data = fs.readFileSync(chestPath)
       const returnedObj = (JSON.parse(data));
       if(! returnedObj.clue.includes('\\')){
        throw
       }
       if(returnedObj.clue !== undefined){
          return returnedObj.clue; 
       }else{
        return returnedObj.treasure;
       }

    } catch (error) {
        console.error(error);
    }
}
// openChestSync("C:\\Developer\\Cyber4s\\Maze\\maze-example\\room-0\\room-0\\chest-1.json")

function drawMapSync(currentRoomPath) {}