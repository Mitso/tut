"use strict";



var app = new Vue({
  el: '#app',
  data: {
    brand: 'Product',
    product: 'shoe',
    description: 'This product website will show you the list of available shoes.',
    footnote: 'Shoes are great for our feet',
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    msg: 'Type here'
  },
  computed: {
    title() {
      return  this.brand + ' ' + this.product;
    }
  }
});


let product = new Vue({
  el: '#product',
  data: {
    persons: [
      {
        id: 1,
        name: 'Mitso',
        surname: 'Qalaba'
      },
      {
        id: 2,
        name: 'Jacques',
        surname: 'Coetzee'
      }
    ],
    selectedIndex: 0,
    imageCollection: [
      {
        path: './assets/images/shoe-two.jpg',
        alt: 'Shoe one',
        title: 'Heel shoe',
        label: 'heel',
        stock: true
      },
      {
        path: './assets/images/shoe-one.jpeg',
        alt: 'Shoe two',
        title: 'Running shoes',
        label: 'running',
        stock: false
      }
    ]
  },
  methods: {
    someFuncMethod(index) {
      return this.selectedIndex = index;
    }
  },
  computed: {
    image() {
     return this.imageCollection[this.selectedIndex].path
    },
    alt() {
      return this.imageCollection[this.selectedIndex].alt
    },
    title() {
      return this.imageCollection[this.selectedIndex].title
    },
    label() {
      return this.imageCollection[this.selectedIndex].label
    },
    stock() {
      return this.imageCollection[this.selectedIndex].stock
    }
  }
});
