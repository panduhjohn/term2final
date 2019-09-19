let globalThis = this

function functionThis() {
    console.log('global This vs local This: ', globalThis === this)
    
    this.someVar = 'some var'
}

let fatArrowThis = () => {
    console.log('global This vs local This: ', globalThis === this)
    
    this.someVar2 = 'some var'
}

functionThis()
fatArrowThis()

console.log('someVar: ',  this.someVar);
console.log('someVar2: ', this.someVar2);