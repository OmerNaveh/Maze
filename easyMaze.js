const fs = require('fs');
const path = require('path');
const mapDetails = []; //Will contain Folders we visited

//Gets Path to a folder and looks for what it contains - 
//if it is a file you will send it to a function openChestSync else it continues searching
function findTreasureSync(roomPath) {
    try {
        let fullRoomPath = path.resolve(__dirname,roomPath);
        //What files & folders are in the room
        const filesFoldersArray = fs.readdirSync(fullRoomPath); 
        for(let fileOrFolder of filesFoldersArray){
            mapDetails.push(roomPath); //push corrent location
            const nextPath = path.resolve(fullRoomPath,fileOrFolder);
            if(!fileOrFolder.includes('room')){ //It is a clue
                try {
                    return openChestSync(nextPath) ;
                } catch {}
            }
        }
    } catch (error) {}
}

//Opens files and identifies whether a clue, treasure or to continue searching
function openChestSync(chestPath) {
    try {
       const data = fs.readFileSync(chestPath); //Get get file content
       const chestContent = JSON.parse(data); //Parse it
       if (chestContent.treasure) {
            console.log(`yay we found the treasure: ${chestContent.treasure}`)
            mapDetails.push('💰'); //Push treasure
            drawMapSync(mapDetails); //Show map on new file
           return chestContent.treasure
       }
       if (chestContent.clue) {
           const roomPath = chestContent.clue;
           if (fs.existsSync(roomPath)) {
                return findTreasureSync(roomPath);
           }
       }
    } catch (error) {
        throw "Chest is decoy";
    }
}

//Gets an array and print the array on new txt file
function drawMapSync(mapArr) {
    const stringMap = String(mapArr.join('\n'))
    fs.writeFileSync('map.txt', stringMap)
}

//function call
findTreasureSync('maze');