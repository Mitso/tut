
function staircase(ar) {
  let n = ar.length,
    hash = '';
  if(n > 0 && n <= 100)
    for (let i = 0; i < ar.length; i++) {
      let decrement = (ar.length - 1) - i;
      console.log(' '.repeat(decrement) + '#'.repeat(i + 1));
    };
};

staircase(arr);



// for (let i = 1; i <= n; i++) {
//   console.log("#".repeat(i).padStart(n));
// };

// for(let i=0;i<n;i++){
//   console.log(" ".repeat(n-i-1) + "#".repeat(i+1))
// }

// for (let x = 1; x <= n; x++) {
//   console.log(" ".repeat(n - x) + "#".repeat(x));
// }

//repeat()
//padStart



//DID NOT SOLVE

function jumpingOnCloud(c) {
  let n = c.length,
    accum = 0;

  if(n >= 2 && n <= 100) {
    for(let i = 0; i < c.length - 1 ; i++) {
      accum++;
      if(i + 2 < c.length && c[i+2] == 0) {
        i++;
      }
    }
    return accum;
  }
};




/*=========================================*/


"use strict";

let last_known_scroll_pos = 0;
let ticking = false;


function doSomething(scroll_pos) {
  let name = 'Mitso'
  return alert(`My name is ${name} ${scroll_pos}`);
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_pos = window.scrollY;
  if(!ticking) {
    window.requestAnimationFrame(function() {

      doSomething(last_known_scroll_position);

      ticking = false;
    });

    ticking = true;
  }
});


/*=================*/

let ar = [-4, 3, -9, 0, 4, 1];

function plusMinus(arr) {
  let n = arr.length;
  if(n > 0 && n <= 100) {
    const obj = {
      positives: [],
      negatives: [],
      zeros: []
    }
    arr.forEach((v, i, ar) => {
      if(v >= -100 && v <= 100) {
        const { positives, negatives, zeros } = obj;
        if(v > 0) {
          positives.push(v);
        } else if(v < 0) {
          negatives.push(v);
        } else if(v == 0) {
          zeros.push(v);
        }
      }
    });
    console.log((obj.positives.length / n).toFixed(6));
    console.log((obj.negatives.length/ n).toFixed(6));
    console.log((obj.zeros.length/ n).toFixed(6));
  }
};


plusMinus(ar);
