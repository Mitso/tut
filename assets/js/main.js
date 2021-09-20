/*
  Plugin to expose Methods to the developer


  Use to define:
    Navigation keys
    Parent div
    Elements div

*/
"use strict";
function ImageNav (options) {
  let defaultOptions = {
    name: 'Whatsup'
  }
  options = {...defaultOptions, ...options}

  let _this = this;
  this.init = function() {
    return options;
  }
  console.log('Function constructor:', options);
  this.init();
};

let myName = new ImageNav('Mitso Q.');
console.log(myName);


class ImageNavigation {
  constructor(basicName) {
    this.basicName = basicName
  }
};
let name = new ImageNavigation('Mitso');
console.log('Class based:',name, name.basicName);
