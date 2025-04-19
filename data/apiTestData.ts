export const apiBaseUrl = 'https://restful-booker.herokuapp.com';

export const usersAPI = {
    admin: { username: 'admin', password: 'password123' },
    invalid: { username: 'invalid_user', password: 'wrong_password' },
    empty: { username: '', password: '' },
    missingUsername: { username: '', password: 'password123' },
    missingPassword: { username: 'admin', password: '' },
  };

export const partialUpdateData = {
    "firstname": "Jane",
    "lastname": "Doe"
};

export const bookingData = {
    validBooking: {
      "firstname" : "Jim",
      "lastname" : "Brown",
      "totalprice" : 111,
      "depositpaid" : true,
      "bookingdates" : {
          "checkin" : "2018-01-01",
          "checkout" : "2019-01-01"
      },
      "additionalneeds" : "Breakfast"
    },
    updatedBooking: {
      "firstname": "Tulani",
      "lastname": "Makhonco",
      "totalprice": 2000,
      "depositpaid": false,
      "bookingdates": {
          "checkin": "2020-01-01",
          "checkout": "2021-01-01"
      },
      "additionalneeds": "Dinner"
    }
  }