const fs = require('fs');
const path = require('path');

const mapDetails = []; //Will contain Folders we visited
let success = 0; //Stop conditions

//Gets Path to a folder and looks for what it contains - 
//if it is a file you will send it to a function openChestSync 
//otherwise you will open the folder (call itself again)
function findTreasureSync(roomPath) {
    try {
        if(success === 1) return; //Stop searching

        let fullRoomPath = path.resolve(__dirname,roomPath);
        //What files & folders are in the room
        const filesFoldersArray = fs.readdirSync(fullRoomPath); 
        for(let path of filesFoldersArray){
            mapDetails.push(roomPath); //push corrent location

            const nextPath = `${fullRoomPath}\\${path}`;

            if ( path.includes('room') ) { //It is a room
                findTreasureSync(nextPath);
            } else { //It is a clue
                openChestSync(nextPath) ;
            }
        }
    } catch (error) {
        findTreasureSync(path.resolve(__dirname ,'..\\')); //Return to last folder
    }
}
//Opens files and identifies whether a clue, treasure or to continue searching
function openChestSync(chestPath) {
    try {
       const data = fs.readFileSync(chestPath); //Get get file content
       const returnedObj = JSON.parse(data); //Parse it
        //(     there isn't a clue       &&   the file contain a real path)
       if(returnedObj.clue !== undefined && fs.existsSync(returnedObj.clue)) {
            findTreasureSync(returnedObj.clue); //Go to that path

       } else if (returnedObj.treasure !== undefined) { //It is a treasure
           console.log(`yay we found the treasure: ${returnedObj.treasure}`)
           mapDetails.push('💰'); //Push treasure
           success = 1; //Stop conditions
           drawMapSync(mapDetails); //Show map on new file
           return; 
       }

    } catch (error) {
        return ; //Keep searching
    }
}
//Gets an array and print the array on new txt file
function drawMapSync(mapArr) {
    const stringMap = String(mapArr.join('\n'))
    fs.writeFileSync('map.txt', stringMap)
}

findTreasureSync('maze');