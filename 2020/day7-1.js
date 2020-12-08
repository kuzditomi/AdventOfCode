const input = require('./day7.input.json');

const nodes = {};

// create tree
for (let rule of input) {
    const parts = rule.split(' bags contain ');
    const containerPart = parts[0];
    const canContainParts = parts[1].matchAll(/(\d )?([a-z]+ [a-z]+) bag[s]?[,\.]/g);

    if (!nodes[containerPart]) {
        nodes[containerPart] = { type: containerPart, children: [] };
    }

    for (let canContain of canContainParts) {
        const innerPart = canContain[2] || canContain[1];

        if (innerPart == 'no other') {
            continue
        }
        if (!nodes[innerPart]) {
            nodes[innerPart] = { type: innerPart, children: [] };
        }

        nodes[containerPart].children.push(nodes[innerPart]);
    }
}

const canContain = (parent, bagtype) => {
    const nodesToCheck = [...parent.children];

    while (nodesToCheck.length > 0) {
        const node = nodesToCheck.pop();
        if (node.type === bagtype) {
            return true;
        }

        node.children.forEach(element => {
            nodesToCheck.push(element);
        });
    }

    return false;
}

const answer = Object.values(nodes).reduce((sum, node) => sum + (canContain(node, 'shiny gold') ? 1 : 0), 0);

console.log(answer);