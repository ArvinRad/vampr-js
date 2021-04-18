class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this === 'rootVampire') return true;
    else if (vampire === 'rootVampire') return false;
    else if (this.yearConverted > vampire.yearConverted) {
      return true;
    } else return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let result = null;
    console.log("first:", this.name, name);
    if (name !== "") {
      if (this.name === name) {
      console.log("high level compare matched and will return:", this.name);
      return result = this;
      } else if (this.offspring.length > 0) {
        for (const item of this.offspring) { //Proble: For loop doesn't end root(c) hasn't been run
          console.log("inside search 1:",item.name, item.offspring.length, name);
          let mm = item.vampireWithName(name);
          console.log("result of inside search:", mm.name);
          if (mm && mm.name === name) {
            console.log("inside search matched for the item's name and returned:",mm.name, item.name);
            return result = mm;
          }
        }
      }
    } else return result;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = this.offspring.length;
    if (total > 0) {;
      for (const item of this.offspring) {
        let totalItem= item.totalDescendents;
        total += totalItem;
      }
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    console.log("111:",this.name, this.offspring.length)
    let allMillennial = [];
    if (this.offspring.length === 0) return allMillennial;
    else {
      for (const item of this.offspring) {
        if (item.yearConverted > 1980) allMillennial.push(item);
        let res = [];
        console.log("item:",item.name, item.offspring.length)
        if (item.offspring.length !== 0) res = item.allMillennialVampires();
        if(res.length > 0) allMillennial.push(res);
        console.log("res:",res.length)
      } //Problem: When inner function returns, the outer function return also(a, b run, but c doesn't run in the for loop)!!this.offspring.length
      console.log("allM:", allMillennial)
      return allMillennial;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {

  // }
}

const original = new Vampire("Original", "1980");
const bart = new Vampire("Bart", "1985");
const ansel = new Vampire("Ansel", "1986");
const elgort = new Vampire("Elgort", "1990");
const sarah = new Vampire("Sarah", "1993");

original.addOffspring(ansel);
original.addOffspring(bart);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);


module.exports = Vampire;

