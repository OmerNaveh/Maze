const fs = require('fs');
const path = require('path');
findTreasure('maze', (err,data)=>{
    if(err!==null) return;
    return data;
})

function findTreasure(roomPath, cb) {
    let fullRoomPath = path.resolve(__dirname,roomPath);
    const readRoomContent = fs.readdir(fullRoomPath, (err,filesFoldersArray)=>{
        if (err!==null) { throw 'not good'};
        for(let fileOrFolder of filesFoldersArray){
            mapDetails.push(roomPath); //push corrent location
            const nextPath = path.resolve(fullRoomPath,fileOrFolder);
            if(!fileOrFolder.includes('room')){ //It is a clue
                return openChest(nextPath, (err, data)=>{
                    if(err !==null) return;
                    return data;
                }) ;
            }
        }
    })
    
}

function openChest(chestPath, cb) {}

function drawMapSync(currentRoomPath, cb) {}
