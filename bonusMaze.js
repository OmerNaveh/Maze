const fs = require('fs');
const path = require('path');

//function call
promiseTreasure('maze')
.then((result)=> {console.log("We did it! 💰")}) //Success message
.catch((error)=> {console.log("Try again! : " + error)}); //Error message

//Gets Path to a folder and looks for what it contains - 
//if it is a file you will send it to a function openChest else it continues searching
async function promiseTreasure(roomPath) {
        let fullRoomPath = path.resolve(__dirname,roomPath);
        //What files & folders are in the room
        const filesFoldersArray = fs.readdirSync(fullRoomPath);
        for(let fileOrFolder of filesFoldersArray){
            await drawMapSync(roomPath); //push corrent location
            const nextPath = path.resolve(fullRoomPath,fileOrFolder);
            if(!fileOrFolder.includes('room')){ //It is a clue (fs.lstats(path).isFile() didn't work for us 😪)
                try {
                    return openChest(nextPath)
                    .then((chestContent) => { 
                        if (chestContent === "💰") return; //Check if Treasure was found
                        else promiseTreasure(chestContent); //Keep searching based on this clue
                    })
                    .catch((reject) => reject); //not a valid clue
                } catch {return;}
            }
        }
}

//Opens files and identifies whether a clue, treasure or not a valid clue
async function openChest(chestPath) {
    try {
        const data = fs.readFileSync(chestPath); //Get get file content
        const chestContent = await JSON.parse(data); //Parse it
        if (chestContent.treasure) {
             await drawMapSync('💰'); //Push treasure
            return "💰";
        }
        if (chestContent.clue) {
            const roomPath = chestContent.clue;
            if (fs.existsSync(roomPath)) {
                 return roomPath; //Return clue
            }
        }
    } catch (error) {
        throw (error + "Chest is decoy");
    }
}

//Print currentRoomPath on new txt file
async function drawMapSync(currentRoomPath) {
    fs.appendFileSync('map4.txt', `${currentRoomPath}\n`);
}