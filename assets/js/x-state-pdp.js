
  // Available variables:
  // - Machine
  // - interpret
  // - assign
  // - send
  // - sendParent
  // - spawn
  // - raise
  // - actions
  // - XState (all XState exports)

  const fetchMachine = Machine({
    id: 'pdp',
   initial: 'user',
   context: {
       available: false
   },
   states: {
       user: {
           initial: 'selectVariation',
           on: {
               SELECT_VARIATION: [
                    {
                       target: '#pdp.user.available',
                       cond: 'available'
                    },
                    {
                        target: '#pdp.user.notAvailable'
                    }
                ],
                DESELECT: '#pdp.user.selectVariation'
           },
           states: {
               selectVariation: {
                   on: {
                       ADD_TO_WISHLIST: {
                           actions: ['notifySelectVariation']
                       },
                       ADD_TO_WAITLIST: {
                           actions: ['notifySelectVariation']
                       },
                       ADD_TO_CART: {
                           actions: ['notifySelectVariation']
                       }
                   }
               },
               available: {
                   entry: assign({
                       available: () => true
                   }),
                   on: {
                       ADD_TO_CART: '#pdp.computer.cart',
                       ADD_TO_WISHLIST: '#pdp.computer.wishlist'
                   }
               },
               notAvailable: {
                   entry: assign({
                       available: () => false
                   }),
                   on: {
                       ADD_TO_WAITLIST: '#pdp.computer.waitlist'
                   }
               }
           }
       },
       computer: {
           states: {
               cart: {
                   invoke: {
                       src: 'addToCart',
                       onDone: '#pdp.user.available'
                   }
               },
               waitlist: {
                   invoke: {
                       src: 'addToWaitlist',
                       onDone: [
                           { target: '#pdp.user.available', cond: 'available'},
                           { target: '#pdp.user.notAvailable'}
                       ]
                   }
               },
               wishlist: {
                   invoke: {
                       src: 'addToWishlist',
                       onDone: [
                           { target: '#pdp.user.available', cond: 'available'},
                           { target: '#pdp.user.notAvailable'}
                       ]
                   }
               }
           }
       }
   }
 },
 {
   actions: {
       notifySelectVariation: () => Promise.resolve()
   },
   services: {
       addToCart: () => Promise.resolve(),
       addToWaitlist: () => Promise.resolve(),
       addToWishlist: () => Promise.resolve()
   },
   guards: {
       available: (context, event) => !!Obj.get(event, 'variation.quantity', context.available)
   }
 });
 const Obj = {get: ()=>{}}
