    // Create Dino Constructor
    // Comments on the Constructors
    // There are three possibilities
    // You can declare the Dinos and the Humans differently
    // You can declare a LifeForm and adding Features for the Dinos and the Humans
    // You can declare a LifeForm - giving it alle the Features and set the missing Human features to ""

    function Dino(species, weight, height, diet, where, when, fact, image) {

        this.species = species;
        this.weight  = weight;
        this.height  = height;
        this.diet    = diet;
        this.where   = where;
        this.when    = when;
        this.fact    = fact;
        this.image   = image;
    };

    // Create Dino Objects

    let dinos = [];

    let getDinos = fetch("dino.json")
    .then(response => response.json())
    .then(json => dinos = json.Dinos.map(dino => new Dino (dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact )));

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function addImage (Dinos) {
        Dinos.forEach(function(Dino){
            switch(Dino.species) {
                case "Anklyosaurus"       : Dino.image = "./images/anklyosaurus.png";       break;
                case "Brachiosaurus"      : Dino.image = "./images/brachiosaurus.png";      break;
                case "Elasmosaurus"       : Dino.image = "./images/elasmosaurus.png";       break;
                case "Pigeon"             : Dino.image = "./images/pigeon.png";             break;
                case "Pteranodon"         : Dino.image = "./images/pteranodon.png";         break;
                case "Stegosaurus"        : Dino.image = "./images/stegosaurus.png";        break;
                case "Triceratops"        : Dino.image = "./images/triceratops.png";        break;
                case "Tyrannosaurus Rex"  : Dino.image = "./images/tyrannosaurus rex.png";  break;
            }
        });
    };

    function expandFacts (Dinos) {
        Dinos.forEach(function(Dino){
            Dino.where = `The ${Dino.species} roamed the Land of ${Dino.where}`;
            Dino.when  = `The ${Dino.species} was active during the ${Dino.when} time`;
        });
    };

    // Create Human Object
    function Human(name, weight, height, diet, fact, image) {

        this.species = name;
        this.weight  = weight;
        this.height  = height;
        this.diet    = diet;
        this.fact    = fact;
        this.image   = image;
    };

    let human = new Human();

    // Use IIFE to get human data from form
    (function parseHumanData() {

        let name   = document.querySelector('#name').value;
        let height = parseInt(document.querySelector('#feet').value) * 12 + parseInt(document.querySelector('#inches').value);
        let weight = document.querySelector('#weight').value;
        let diet   = document.querySelector('#diet').value.toLowerCase();
       
		human.species = name;
		human.height  = height;
		human.weight  = weight;
		human.diet    = diet;
        human.fact    = "";
        human.image   = "./images/human.png"
    })();

    // Needed to reset the form, otherwise not possible, since you cannot manually call an IIFE...
    function reParseHumanData() {

        let name   = document.querySelector('#name').value;
        let height = parseInt(document.querySelector('#feet').value) * 12 + parseInt(document.querySelector('#inches').value);
        let weight = document.querySelector('#weight').value;
        let diet   = document.querySelector('#diet').value.toLowerCase();
       
		human.species = name;
		human.height  = height;
		human.weight  = weight;
		human.diet    = diet;
        human.fact    = "";
        human.image   = "./images/human.png"
    };

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Dino.prototype.compareHeight = function (humanHeight) {
        let heightDiff = Math.trunc(this.height - humanHeight);
        return result = (heightDiff > 0) ? `The human is ${Math.abs(heightDiff)} inches smaller than the ${this.species}` : (heightDiff < 0) ? `The human is ${Math.abs(heightDiff)} inches taller than the ${this.species}` : `The ${this.species} and you have both the same size`;
    };
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareWeight = function (humanWeight) {
        let weightDiff = Math.trunc(this.weight - humanWeight);
        return result = (weightDiff > 0) ? `The human is ${Math.abs(weightDiff)} lbs lighter than the ${this.species}` : (weightDiff < 0) ? `The human is ${Math.abs(weightDiff)} lbs heavier than the ${this.species}` : `The ${this.species} and you have both the same weight`;
    };
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareDiet = function (humanDiet) {
        return result = (this.diet == humanDiet) ? `The human and the ${this.species} are ${this.diet}s` : `The human ist a ${humanDiet} and the ${this.species} is a ${this.diet}`;
    };

    // Randomize Dinos

    function randomizeDinos (Dinos) {
        Dinos.forEach(function(Dino){
            if(Dino.species != 'Pigeon') {
                switch(getRandomInt(6)) {
                    case 0 : Dino.fact = Dino.compareDiet(human.diet);     break;
                    case 1 : Dino.fact = Dino.compareHeight(human.height); break;
                    case 2 : Dino.fact = Dino.compareWeight(human.weight); break;
                    case 3 : Dino.fact = Dino.where;                       break;
                    case 4 : Dino.fact = Dino.when;                        break;
                    case 5 : Dino.fact = Dino.fact;                        break;
                }
        }})
        const pigeon = Dinos.pop();
        Dinos.sort(() => (Math.random() > .5) ? 1 : -1);
        Dinos.splice(4,0,human);
        Dinos.push(pigeon);
    };
    
    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen

    function createGrid (Dinos, Grid) {
        Dinos.forEach(function(Dino){
            Grid.insertAdjacentHTML('beforeend',`<div class="grid-item"><h3>${Dino.species}</h3><img src="${Dino.image}"><p>${Dino.fact}</p></div>`);
        })
    };


// On button click, prepare and display infographic

document.getElementById('btn').addEventListener('click', function() {
    //Need, otherwise it is not possible to reset the form...
    reParseHumanData();
    addImage(dinos);
    expandFacts(dinos);
    randomizeDinos(dinos);
    console.log(dinos);
    document.getElementById('dino-compare').style.display = 'none';
    const thegrid = document.getElementById("grid");
    createGrid(dinos, thegrid);
    thegrid.insertAdjacentHTML('afterend','<div id="reset" style="width: 55px\; height: 20px\; display: block\; background: #ccc\; padding: 0.8em\; margin: 1.2em auto\; transition: ease 0.3s all\;">Reset</div>');
    // Reset Procedure 
    document.getElementById('reset').addEventListener('click', function() {
        thegrid.innerHTML = '';
        document.getElementById('reset').remove();
        document.querySelector('#name').value   = '';
        document.querySelector('#feet').value   = '';
        document.querySelector('#inches').value = '';
        document.querySelector('#weight').value = '';
        document.querySelector('#diet').value = 'Herbavor';
        document.getElementById('dino-compare').style.display = 'block';
        window.location.reload();
    });
});