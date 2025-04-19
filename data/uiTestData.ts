export const uiBaseUrl = 'https://www.saucedemo.com/';

const PASSWORD = 'secret_sauce';

export const usersUI = {
    standard: { username: 'standard_user', password: PASSWORD },
    locked: { username: 'locked_out_user', password: PASSWORD},
    problem: { username: 'problem_user', password: PASSWORD },
    performance: { username: 'performance_glitch_user', password: PASSWORD },
    error: { username: 'error_user', password: PASSWORD},
    visual: { username: 'visual_user', password: PASSWORD },
    empty: { username: '', password: '' },
    missingUsername: { username: '', password: PASSWORD},
    missingPassword : { username: 'visual_user', password: '' },
    incorrectCombination : {username: 'test', password: PASSWORD }
  };

export const  checkoutInfo = {
    user1: {firstname: 'Tulani', lastname: 'Makhonco', postalCode: '7784'}
};

//titles
export const TITLE = {
  CHECKOUT_YOUR_CART: 'Your Cart',
  PRODUCTS: 'Products',
  CHECKOUT_YOUR_INFORMATION: 'Checkout: Your Information',
  CHECKOUT_OVERVIEW: 'Checkout: Overview',
  CHECKOUT_COMPLETE: 'Checkout: Complete!'
};

//Checkout complete message
export const CHECKOUT_COMPLETE_MESSAGE = {
  HEADER: 'Thank you for your order!',
  TEXT: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
};

//error messages
export const ERROR_MESSAGE = {
        FIRST_NAME_REQUIRED: 'Error: First Name is required',
        LAST_NAME_REQUIRED: 'Error: Last Name is required',
        POSTAL_CODE_REQUIRED: 'Error: Postal Code is required'
    };

  
  