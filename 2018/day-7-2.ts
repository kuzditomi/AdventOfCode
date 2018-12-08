{
    let inputs = [
        'Step H must be finished before step C can begin.',
        'Step R must be finished before step S can begin.',
        'Step F must be finished before step M can begin.',
        'Step S must be finished before step Z can begin.',
        'Step X must be finished before step Z can begin.',
        'Step Q must be finished before step G can begin.',
        'Step M must be finished before step Z can begin.',
        'Step G must be finished before step V can begin.',
        'Step N must be finished before step Z can begin.',
        'Step I must be finished before step J can begin.',
        'Step Z must be finished before step T can begin.',
        'Step B must be finished before step A can begin.',
        'Step L must be finished before step T can begin.',
        'Step E must be finished before step D can begin.',
        'Step U must be finished before step Y can begin.',
        'Step W must be finished before step O can begin.',
        'Step C must be finished before step V can begin.',
        'Step O must be finished before step J can begin.',
        'Step T must be finished before step D can begin.',
        'Step A must be finished before step J can begin.',
        'Step J must be finished before step V can begin.',
        'Step D must be finished before step P can begin.',
        'Step P must be finished before step V can begin.',
        'Step K must be finished before step Y can begin.',
        'Step V must be finished before step Y can begin.',
        'Step D must be finished before step V can begin.',
        'Step W must be finished before step Y can begin.',
        'Step I must be finished before step U can begin.',
        'Step B must be finished before step V can begin.',
        'Step U must be finished before step D can begin.',
        'Step M must be finished before step C can begin.',
        'Step H must be finished before step Z can begin.',
        'Step B must be finished before step P can begin.',
        'Step X must be finished before step N can begin.',
        'Step G must be finished before step O can begin.',
        'Step I must be finished before step C can begin.',
        'Step B must be finished before step K can begin.',
        'Step J must be finished before step Y can begin.',
        'Step M must be finished before step E can begin.',
        'Step T must be finished before step J can begin.',
        'Step O must be finished before step P can begin.',
        'Step P must be finished before step Y can begin.',
        'Step R must be finished before step D can begin.',
        'Step N must be finished before step W can begin.',
        'Step H must be finished before step G can begin.',
        'Step I must be finished before step K can begin.',
        'Step L must be finished before step O can begin.',
        'Step X must be finished before step K can begin.',
        'Step B must be finished before step J can begin.',
        'Step Z must be finished before step C can begin.',
        'Step Z must be finished before step O can begin.',
        'Step F must be finished before step U can begin.',
        'Step F must be finished before step Q can begin.',
        'Step U must be finished before step K can begin.',
        'Step T must be finished before step V can begin.',
        'Step O must be finished before step D can begin.',
        'Step R must be finished before step B can begin.',
        'Step U must be finished before step J can begin.',
        'Step U must be finished before step A can begin.',
        'Step T must be finished before step K can begin.',
        'Step F must be finished before step N can begin.',
        'Step J must be finished before step P can begin.',
        'Step Z must be finished before step A can begin.',
        'Step L must be finished before step A can begin.',
        'Step R must be finished before step V can begin.',
        'Step F must be finished before step Y can begin.',
        'Step C must be finished before step A can begin.',
        'Step H must be finished before step P can begin.',
        'Step A must be finished before step K can begin.',
        'Step C must be finished before step J can begin.',
        'Step X must be finished before step T can begin.',
        'Step L must be finished before step D can begin.',
        'Step L must be finished before step J can begin.',
        'Step N must be finished before step B can begin.',
        'Step Z must be finished before step B can begin.',
        'Step G must be finished before step P can begin.',
        'Step E must be finished before step P can begin.',
        'Step L must be finished before step P can begin.',
        'Step T must be finished before step Y can begin.',
        'Step S must be finished before step U can begin.',
        'Step M must be finished before step U can begin.',
        'Step D must be finished before step K can begin.',
        'Step L must be finished before step U can begin.',
        'Step F must be finished before step S can begin.',
        'Step N must be finished before step L can begin.',
        'Step W must be finished before step P can begin.',
        'Step G must be finished before step I can begin.',
        'Step L must be finished before step Y can begin.',
        'Step D must be finished before step Y can begin.',
        'Step K must be finished before step V can begin.',
        'Step B must be finished before step O can begin.',
        'Step P must be finished before step K can begin.',
        'Step R must be finished before step C can begin.',
        'Step G must be finished before step L can begin.',
        'Step O must be finished before step A can begin.',
        'Step M must be finished before step L can begin.',
        'Step E must be finished before step K can begin.',
        'Step F must be finished before step C can begin.',
        'Step B must be finished before step L can begin.',
        'Step O must be finished before step T can begin.',
        'Step S must be finished before step O can begin.'
    ];

    const workerCount = 5;

    const allKeysHash: { [key: string]: boolean } = {};
    const dependencies = inputs
        .map(i => i.match(/Step (.) must be finished before step (.) can/).splice(1, 2))
        .reduce((deps, instruction) => {
            allKeysHash[instruction[0]] = true;
            allKeysHash[instruction[1]] = true;

            if (!deps[instruction[1]]) {
                deps[instruction[1]] = [];
            }

            deps[instruction[1]].push(instruction[0]);

            return deps;
        }, {} as { [key: string]: string[] });



    let allKeys = Object.keys(allKeysHash).sort();
    
    //console.log(allKeys);
    //console.log(dependencies);

    let finished = false;
    let time = 0;
    const workers: { letter: string, remaining: number }[] = [];

    while (!finished) {
        finished = true;
        for (let j = 0; j < workerCount; j++) {
            if (workers[j] && workers[j].remaining === 0) {
                const letter = workers[j].letter;
                delete dependencies[letter];

                Object
                    .keys(dependencies)
                    .forEach(k => dependencies[k] = dependencies[k].filter(d => d != letter));

                allKeys = allKeys.filter(k => k != letter);
                workers[j] = undefined;
            }
        }

        for (let j = 0; j < workerCount; j++) {
            if (workers[j] && workers[j].remaining > 0) {
                workers[j].remaining -= 1;
                finished = false;

                continue;
            }

            for (let i = 0; i < allKeys.length; i++) {
                const letterToStart = allKeys[i];
                const noMoreDeps = !dependencies[letterToStart] || dependencies[letterToStart].length === 0;
                const notUnderWorkAlready = workers.filter(w => w && w.letter === letterToStart).length === 0;

                if (noMoreDeps && notUnderWorkAlready) {
                    workers[j] = {
                        letter: letterToStart,
                        remaining: letterToStart.charCodeAt(0) - 5
                    }

                    finished = false;
                    break;
                }
            }
        }

        //console.log(time, workers.map(w => w ? w.letter : '-'));
        time++;
    }

    console.log(time - 1);
}