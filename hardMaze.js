const fs = require('fs');
const path = require('path');

findTreasure('maze', (err,data)=>{
    if(err!==null) return;
    return data;
})

function findTreasure(roomPath, cb) {
    if(cb){
        let fullRoomPath = path.resolve(__dirname,roomPath);
        const readRoomContent = fs.readdir(fullRoomPath, (err,filesFoldersArray)=>{
            if (err!==null) { throw 'not good'};
            for(let fileOrFolder of filesFoldersArray){
                drawMap(roomPath,(error,data)=>{
                    if(error!==null) return;
                    return data;
                }) //push corrent location
                const nextPath = path.resolve(fullRoomPath,fileOrFolder);
                if(!fileOrFolder.includes('room')){ //It is a clue
                    return openChest(nextPath, (err, data)=>{
                        if(err !==null) return;
                        return data;
                    }) ;
                }
            }
        })
    }else return;
}

function openChest(chestPath, cb) {
    if(cb){
        const data = fs.readFile(chestPath, (err,fileContent)=>{
            if(err!==null) return;
            try {
                const chestContent = JSON.parse(fileContent); //Parse it
                if (chestContent.treasure) {
                    const icon= ('💰'); //Push treasure
                    drawMap(icon,(error,data)=>{
                        if(error!==null) return;
                        return data;
                    })
                    return chestContent.treasure
                }
                if (chestContent.clue) {
                    const roomPath = chestContent.clue;
                    if (fs.existsSync(roomPath)) {
                        return findTreasure(roomPath,(error , value)=>{
                            if(error!==null) return;
                            return value;
                        });
                    }
                }
            }    
            catch (error) {return}
        })
    }else return
}


function drawMap(currentRoomPath, cb) {
    if(cb){
        fs.appendFile('map2.txt', `${currentRoomPath}\n`, (error,data)=>{
            if(error!==null) return;
            return data;
        })
    }
    return;
}
