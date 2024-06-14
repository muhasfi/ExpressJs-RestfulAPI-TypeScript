# Contac API Spect

## Create contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : Token

Request Body:

```json
{
  "first_name": "Muhammad Hashfii",
  "last_name": "Rafid",
  "email": "muhamadhasfi@gmail.com",
  "Phone": "9234785456783"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad Hashfii",
    "last_name": "Rafid",
    "email": "muhamadhasfi@gmail.com",
    "Phone": "9234785456783"
  }
}
```

Response body (Failed) :

```json
{
  "errors": "first_name must not blank"
}
```

## Get Contact

Endpoint : GET /api/contacts

Request Header :

- X-API-TOKEN : Token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad Hashfii",
    "last_name": "Rafid",
    "email": "muhamadhasfi@gmail.com",
    "Phone": "9234785456783"
  }
}
```

Response body (Failed) :

```json
{
  "errors": "Contact Is Not Found"
}
```

## Upadate Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : Token

Request Body:

```json
{
  "first_name": "Muhammad Hashfii",
  "last_name": "Rafid",
  "email": "muhamadhasfi@gmail.com",
  "Phone": "9234785456783"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad Hashfii",
    "last_name": "Rafid",
    "email": "muhamadhasfi@gmail.com",
    "Phone": "9234785456783"
  }
}
```

Response body (Failed) :

```json
{
  "errors": "first_name must not blank"
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :

- X-API-TOKEN : Token

Response Body (Success):

```json
{
  "data": "ok"
}
```

Response body (Failed) :

```json
{
  "errors": "Contact Is Not Found"
}
```

## Search contact

Endpoint : GET /api/contacts

QUERY Parameters:

- name : string, contact frist name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : default 10

Request Header :

- X-API-TOKEN : Token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Muhammad Hashfii",
      "last_name": "Rafid",
      "email": "muhamadhasfi@gmail.com",
      "Phone": "9234785456783"
    },
    {
      "id": 1,
      "first_name": "Muhammad Hashfii",
      "last_name": "Rafid",
      "email": "muhamadhasfi@gmail.com",
      "Phone": "9234785456783"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
