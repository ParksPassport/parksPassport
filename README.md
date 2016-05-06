# Parks Passport  
***Your Passport to our National Parks and Monuments***

This application leverages park data from the National Parks service to provide users with the ability to create a wish list of parks they would like to visit, and be notified when they are near features that appear on their wish list.

A user creates a new account and adds parks or landmarks to their list using the dropdown menu to search by state. Then, when the user logs in, the application uses geolocation data to determine which parks or landmarks are currently within 200 miles of their location.

## Application Dependencies

### Dependencies  

* bcrypt  
* body-parser  
* express  
* jsonwebtoken  
* mongoose  

### Dev Dependencies  

* angular  
* angular-animate
* angular-mocks
* angular-route
* angular-touch
* angular-ui-bootstrap
* chai
* chai-http
* css-loader
* gulp-cli
* gulp-eslint  
* gulp-karma  
* gulp-mocha  
* jasmine  
* jasmine-core  
* karma  
* karma-chrome-launcher  
* karma-jasmine  
* leaflet  
* morgan  
* style-loader
* webpack
* webpack-stream  


## Backend API Routes

### Authentication Routes (auth_routes.js)

  * **'/signup'** - Create a new user  

    **POST** body =

        {
          fullName: <name>,
          email: <name@example.com>,
          password: <password>
        }

  * **'/signin'** - Login an existing user

    **GET** Basic Authorization: email & password

### User Routes (user_routes.js)

  * **'/users'**

    **GET** Token Authorization, Admin User Only

        'Content-Type application/json'
        'token', <token>

  * **'/users/:user'** (where :user = ObjectId)

    **GET** Token Authorization, Existing User or Admin User

        'Content-Type application/json'
        'token', <token>

    **PUT** Token Authorization, Existing User or Admin User

        'Content-Type application/json'
        'token', <token>

        {
          fullName: <name>,
          authentication.email: <email>,
          authentication.password: <password>,
          admin: <boolean>,
          list: [
            {'item': <ObjectId>}
          ]
        }

    **DELETE** Token Authorization, Admin User only

        'Content-Type application/json'
        'token', <token>

  * **'/users/:user/list** - returns a user's list

    **GET** Token Authorization, Existing User or Admin User

        'Content-Type application/json'
        'token', <token>

### Parks Routes (parks_routes.js)

  * **'/parks'** - returns an array of parks

    **GET** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>

    **POST** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>

  * **'/parks/:id'**

    **GET** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>

  * **'/search'**

    **GET** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>

  * **'/state'**

    **GET** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>

### Geolocation Routes

  * **'/geolocation/?longitude=<longitude>&latitude=<latitude>'**

    **GET** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>

  * **'/userGeo/:user/geolocation/?longitude=<longitude>&latitude=<latitude>'**

    **GET** Token Authorization, Existing User

        'Content-Type application/json'
        'token', <token>


## Authors

[Samantha Prince] (https://github.com/samanthaprince)  
[Mikleane Chouinard] (https://github.com/mikleane)  
[Kevin Sulonen] (https://github.com/sulonen) (Backend Collaborator)
