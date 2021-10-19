const fs = require('fs');
const path = require('path');

findTreasure('maze', (err ,data)=>{
    if(err!==null) throw err;
    else return;
})

function findTreasure(roomPath, callBack) {
        let fullRoomPath = path.resolve(__dirname,roomPath);
        fs.readdir(fullRoomPath, (err,filesFoldersArray)=>{
            if (err !== null) callBack(err); //can not read 
            //Search between room content
            for(let fileOrFolder of filesFoldersArray){
                //write corrent location on map
                drawMap(roomPath,(error,data)=>{
                    if(error!==null) return callBack(error);
                    else callBack(null, data);
                }) 
                const nextPath = path.resolve(fullRoomPath,fileOrFolder);

                if(!fileOrFolder.includes('room')){ //It is a clue
                    return openChest(nextPath, (err, chestContent)=>{
                        if(err !==null) return callBack(err);
                        if (chestContent === 'treasure') {
                            drawMap('💰' ,(error,data)=>{  //Push treasure
                                if(error!==null) return callBack(error);
                                return data;
                            })
                        } else findTreasure(chestContent, callBack);
                    });
                }
            }
        })
}

function openChest(chestPath, callBack) {
    fs.readFile(chestPath, (err,fileContent)=>{
        if(err!==null) return callBack(err);
        try {
            const chestContent = JSON.parse(fileContent); //Parse it
            if (chestContent.treasure) return callBack(null, 'treasure'); //It is treasure
            if (chestContent.clue) { //It is a clue
                const roomPath = chestContent.clue;
                if (fs.existsSync(roomPath)) { //check if it is a real path
                    return callBack(null, roomPath);
                }
            }
        } catch(error) {
            return callBack(error);
        }
    });
}

function drawMap(currentRoomPath, callBack) {
    fs.appendFile('map3.txt', `${currentRoomPath}\n`, (error,data)=>{
        if(error!==null) return callBack(error);
        // return data;
    })
}

