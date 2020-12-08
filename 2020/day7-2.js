const input = require('./day7.input.json');

const nodes = {};

// create tree
for (let rule of input) {
    const parts = rule.split(' bags contain ');
    const containerPart = parts[0];
    const canContainParts = parts[1].matchAll(/((no other)|(\d [a-z]+ [a-z]+)) bag[s]?[,\.]/g);

    if (!nodes[containerPart]) {
        nodes[containerPart] = { type: containerPart, children: [] };
    }

    for (let canContain of canContainParts) {
        const innerPart = canContain[3] || canContain[2];

        if (innerPart == 'no other') {
            continue
        }

        const innertPartyCount = Number(innerPart.split(' ')[0]);
        const innertPartyType = innerPart.split(' ')[1] + ' ' + innerPart.split(' ')[2];

        if (!nodes[innertPartyType]) {
            nodes[innertPartyType] = { type: innertPartyType, children: [] };
        }

        nodes[containerPart].children.push({
            count: innertPartyCount,
            node: nodes[innertPartyType]
        });
    }
}

// search tree
const sumChildren = (node) => {
    if (node.children.length === 0) {
        return 1;
    }
    
    const childSum = node.children.reduce((total, c) => total + (c.count * sumChildren(c.node)),0);
    
    return childSum + 1;
}

const shinyBag = nodes['shiny gold'];
console.log(sumChildren(shinyBag) - 1);