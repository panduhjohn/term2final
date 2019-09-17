let officers = [
    { id: 20, name: 'Captain Piett'},
    { id: 24, name: 'General Veers'},
    { id: 56, name: 'Admiral Ozzel'},
    { id: 88, name: 'Commander Jerjerrod'},
]

let officerID_1 = []
let officerID_2 = []
let officerID_3 = []
let officerID_4 = []

// forEach to ..._1
officers.forEach(officer => officerID_1.push(officer.id))

console.log(`officerID_1: `, officerID_1);

// regular loop to ..._2
for (let i = 0; i < officers.length; i++) officerID_2.push(officers[i].id)

console.log(`officerID_2: `, officerID_2);

// for of to ..._3
for (let officer of officers) officerID_3.push(officer.id)

console.log(`officerID_3: `, officerID_3);

// for in to ..._4
for (let i in officers) officerID_4.push(officers[i].id)

console.log(`officerID_4: `, officerID_4);