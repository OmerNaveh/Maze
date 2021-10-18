const fs = require('fs');
const path = require('path');
const map = [];
let success = 0;
function findTreasureSync(roomPath) {
    try {
        if(success === 1) {return}
        let fullRoomPath = path.resolve(__dirname,roomPath)
        const dirArr = fs.readdirSync(fullRoomPath);
        for(let path of dirArr){
            map.push(roomPath);
            const newPath = fullRoomPath + "\\"+  path
            if(path.includes('room')){
                findTreasureSync(newPath);
            }
            else{
                openChestSync(newPath);

            }
        }
    } catch (error) {
        findTreasureSync(path.resolve(__dirname ,'..\\'))
    }
}
findTreasureSync('maze')
function openChestSync(chestPath) {
    try {
      
       const data = fs.readFileSync(chestPath)
       const returnedObj = (JSON.parse(data));
       if(returnedObj.clue !== undefined && fs.existsSync(returnedObj.clue)){
            findTreasureSync(returnedObj.clue); 
       }else if(returnedObj.treasure !== undefined){
           console.log(`yay we found the treasure: ${returnedObj.treasure}`)
           map.push('treasure')
           success = 1;
           drawMapSync(map);
           return
       }

    } catch (error) {
        return 
    }
}

function drawMapSync(mapArr) {
    const stringMap = String(mapArr.join('\n'))
    fs.writeFileSync('map.txt', stringMap)
}