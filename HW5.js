/*
----------------- Class Order -----------------
*/
function Order() {
  this.positions = [];
  this.editable = true;
}

Order.prototype.addPosition = function(newPosition) {
  if (this.editable) {
    this.positions.push(newPosition);
  };
};
Order.prototype.deletePosition = function(positionIndex) {
  if (this.positions[positionIndex] && this.editable)  {
    this.positions.splice(positionIndex, 1);
  }
};
Order.prototype.calculatePrice = function() {
  return this.positions.reduce(function(sum, current) {
    return sum + current.calculatePrice();
  }, 0)
};
Order.prototype.calculateCalories = function() {
  return this.positions.reduce(function(sum, current) {
    return sum + current.calculateCalories();
  }, 0)
};
Order.prototype.pay = function() {
  this.editable = false;
};

Order.prototype.displayAll = function() {
  this.positions.forEach(function(element) {
    console.log(element.getName());
  });
};

/*
----------------- Class OrderPosition -----------------
*/
function OrderPosition(type) {
  this.type = type;
};

OrderPosition.prototype.calculatePrice = function() {
  return this.type.price;
};

OrderPosition.prototype.calculateCalories = function() {
   return this.type.calories;
};

OrderPosition.prototype.getName = function() {
  return this.type.name;
}

/*
----------------- Class Hamburger -----------------
*/
function Hamburger(size, stuffing) {
  this.size = size;
  this.stuffing = stuffing;
};

Hamburger.prototype.calculatePrice = function() {
  return this.size.price + this.stuffing.price;
};

Hamburger.prototype.calculateCalories = function() {
  return this.size.calories + this.stuffing.calories;
};

Hamburger.prototype.getSize = function() {
  return this.size;
};

Hamburger.prototype.getStuffing = function() {
  return this.stuffing;
};

Hamburger.prototype.getName = function() {
  return this.size.name + " hamburger with " + this.stuffing.name;
}

Hamburger.SIZE_SMALL = {
  price: 50,
  calories: 20,
  name: "Small",
};
Hamburger.SIZE_LARGE = {
  price: 100,
  calories: 40,
  name: "Large",
};
Hamburger.STUFFING_CHEESE = {
  price: 10,
  calories: 20,
  name: "stuffing cheese",
};
Hamburger.STUFFING_SALAD = {
  price: 20,
  calories: 5,
  name: "stuffing salad",
};
Hamburger.STUFFING_POTATO = {
  price: 15,
  calories: 10,
  name: "stuffing potato",
};

/*
----------------- Class Salad -----------------
*/
function Salad(type) {
  this.type = type;
};

Salad.CAESAR = {
  price: 100,
  calories: 20,
  name: "caesar",
};

Salad.OLIVIER = {
  price: 50,
  calories: 80,
  name: "olivier",
};

Salad.prototype = Object.create(OrderPosition.prototype);
Salad.prototype.constructor = Salad;

/*
----------------- Class Drink -----------------
*/
function Drink(type) {
  this.type = type;
};

Drink.COLA = {
  price: 50,
  calories: 40,
  name: "cola",
};

Drink.COFFEE = {
  price: 80,
  calories: 20,
  name: "coffee",
};

Drink.prototype = Object.create(OrderPosition.prototype);
Drink.prototype.constructor = Drink;

/*
-----------------  -----------------
*/
let myOrder = new Order();
myOrder.addPosition(new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE));
myOrder.addPosition(new Salad(Salad.OLIVIER));
myOrder.addPosition(new Drink(Drink.COFFEE));
myOrder.deletePosition(1);
myOrder.displayAll();
myOrder.pay();
myOrder.addPosition(new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE));
myOrder.displayAll();
myOrder.deletePosition(2);
myOrder.displayAll();