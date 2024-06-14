# User API Spec

## Register User

Endpoint : POST / api/users

request body:

```json
{
    'username' : 'Hashfi',
    'password' : 'Password,
    'name' : 'Muhammad Hashfi'
}
```

Response Body:

```json
{
    "username" : "Hashfi",
    "name" : "Muhammad Hashfi"
}
```

Response Body (failed) :

```json  
{
    "erros" : "Username Must Not Blank"
}
```

## Login User

Endpoint : POST /api/users/login

request body:

```json
 {
    "username" : "Hashfi",
    "password" : "Password",
 }
```

Response Body (Success):

```json
{
    "username" : "Hashfi",
    "name" : "Muhammad Hashfi",
    "token" : "uuid"
}
```

Response Body (failed) :

```json
{
    "erros" : "Username or Password Wrong"
}
```

## Get USer

Endpoint : GET / api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
    'username' : 'Hashfi',
    'name' : 'Muhammad Hashfi'
}
```

Response Body (failed) :

```json
{
    'erros' : 'Unaouthorize'
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : Token

request body:

```json
{
    'password' : 'Password, //optional
    'name' : 'Muhammad Hashfi' //optional
}
```

Response Body (Success) :

```json
{
    'username' : 'Hashfi',
    'name' : 'Muhammad Hashfi'
}
```

Response Body (failed) :

```json
{
    'erros' : 'Unauthorized'
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : Token

Response Body (Success):

```json
{
    "data" : "OK"
}
```

Response Body (failed) :

```json
{
    "erros" : "Unauthorized"
}
```
