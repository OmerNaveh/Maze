
const path = require('path');
const fsPromises = require('fs/promises');
const fs = require("fs");
const { off } = require('process');

//function call
promiseTreasure('maze');

//Gets Path to a folder and looks for what it contains - 
//if it is a file you will send it to a function openChestSync else it continues searching
async function promiseTreasure(roomPath) {
    try {
        console.log("roomPath "+roomPath)
        let fullRoomPath = path.resolve(__dirname,roomPath);
        //What files & folders are in the room
        const filesFoldersArray = await fsPromises.readdir(fullRoomPath); 
        console.log(filesFoldersArray)
        for(let fileOrFolder of filesFoldersArray){
            drawMapSync(roomPath) //push corrent location
            const nextPath = path.resolve(fullRoomPath,fileOrFolder);
            if(!fileOrFolder.includes('room')){ //It is a clue
                try {
                    return await openChest(nextPath) ;
                } catch {}
            }
        }
    } catch (error) {}
}

//Opens files and identifies whether a clue, treasure or to continue searching
async function openChest(chestPath) {
    try {
       const data = await fsPromises.readFile(chestPath); //Get get file content
       console.log("data "+data)
       const chestContent = JSON.parse(data); //Parse it
       if (chestContent.treasure) {
            console.log(`yay we found the treasure: ${chestContent.treasure}`)
            drawMapSync('💰'); //Push treasure
           return chestContent.treasure
       }
       if (chestContent.clue) {
           const roomPath = chestContent.clue;
           if (fs.existsSync(roomPath)) {
                return promiseTreasure(roomPath);
           }
       }
    } catch (error) {
        throw "Chest is decoy";
    }
}

//Gets an array and print the array on new txt file
async function drawMapSync(currentRoomPath) {
    await fsPromises.appendFile('map4.txt', `${currentRoomPath}\n`)
}
