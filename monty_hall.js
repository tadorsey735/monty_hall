var setsPlayed = 0;

var games = { "stayed": 0, "random": 0, "switch": 0 }

var generateRandomNo = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function monty_hall() {
    gameType = "stayed";

    for (var i = 0; i < 3000000; i++) {
        var contestantPick = generateRandomNo(1, 3);
        var winningDoor = generateRandomNo(1, 3);
        var randomWrongDoor = generateRandomNo(1, 3);

        while ([winningDoor, contestantPick].includes(randomWrongDoor)) {
            randomWrongDoor = generateRandomNo(1, 3);
        }

        switch(gameType) {
            case "stayed":
                games.stayed += contestantPick === winningDoor ? 1 : 0;

                gameType = "random";
                break;

            case "random":
                randomPick = generateRandomNo(1, 3);
    
                while (randomPick == randomWrongDoor) {
                    randomPick = generateRandomNo(1, 3);
                }
    
                games.random += randomPick === winningDoor ? 1 : 0;

                gameType = "switched";
                break;

            case "switched":
                switchPick = generateRandomNo(1, 3);

                while ([randomWrongDoor, contestantPick].includes(switchPick)) {
                    switchPick = generateRandomNo(1, 3);
                }

                games.switch += switchPick === winningDoor ? 1 : 0;

                gameType = "stayed";
                break;
        }
    }

    if (setsPlayed === 0) {
        console.log("********************************************************************************");
        console.log("Monty Hall Simulation:");
        console.log("********************************************************************************");
        console.log("Each set consists of 3 million games of the Monty Hall Problem:");
        console.log("  1 million games sticking with original guess on the three doors");
        console.log("  1 million games switching guess after one wrong door is revealed");
        console.log("  1 million games randomly staying or swithing after one wrong door is revealed");
        console.log("********************************************************************************");
    }

    setsPlayed++;

    console.log("--------------------------------------------------------------------------------");
    console.log(`Set: ${setsPlayed}`);
    console.log(`    Games won by keeping the original guess:   ${games.stayed} out of 1 million`);
    console.log(`    Games won by randomly choosing to switch:  ${games.random} out of 1 million`);
    console.log(`    Games won by switching the original guess: ${games.switch} out of 1 million`);
    console.log("--------------------------------------------------------------------------------");
    console.log(`Chance by staying with original guess: ${((games.stayed / (setsPlayed*1000000))*100)}% (based on ${setsPlayed} million games)`);
    console.log(`Chance by randomly choosing to switch: ${((games.random / (setsPlayed*1000000))*100)}% (based on ${setsPlayed} million games)`);
    console.log(`Chance by switching original guess:    ${((games.switch / (setsPlayed*1000000))*100)}% (based on ${setsPlayed} million games)`);
    console.log("--------------------------------------------------------------------------------");
}
