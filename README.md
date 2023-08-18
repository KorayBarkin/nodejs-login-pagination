Solutions:

games.js

-The pageSize parameter specifies the number of elements in the page.
-page parameter specifies the page number

login.js

first sending post request to the /users endpoint with the following parameters creates a new user stored in the users array. (user id is incremented by 1 for every user created)

{
    "username": "koray",
    "password": "koray123"
}

then sending post request to the /login endpoint with the following parameters will check the existing user if it exists logs in otherwise gives an error message

{
    "username": "koray",
    "password": "koray123"
}

finally to retrieve the user information by sending the user id to the /users endpoint with the following parameters will return the user information.

localhost:3007/users/1

will display the corresponding user information.



