# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Request body :

```json
{
  "street": "jalan test",
  "city": "kota test",
  "provice": "Provinsi test",
  "country": "kota test",
  "postal_code": "13567"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "jalan test",
    "city": "kota test",
    "provice": "Provinsi test",
    "country": "kota test",
    "postal_code": "13567"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "postal code is not found"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "jalan test",
    "city": "kota test",
    "provice": "Provinsi test",
    "country": "kota test",
    "postal_code": "13567"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "address Is Not Found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request body :

```json
{
  "street": "jalan test",
  "city": "kota test",
  "provice": "Provinsi test",
  "country": "kota test",
  "postal_code": "13567"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "jalan test",
    "city": "kota test",
    "provice": "Provinsi test",
    "country": "kota test",
    "postal_code": "13567"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "address Is Not Found"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "ok"
}
```

Response Body (Failed) :

```json
{
  "errors": "Address Is Not Found"
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan test",
      "city": "kota test",
      "provice": "Provinsi test",
      "country": "kota test",
      "postal_code": "13567"
    },
    {
      "id": 1,
      "street": "jalan test",
      "city": "kota test",
      "provice": "Provinsi test",
      "country": "kota test",
      "postal_code": "13567"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Contact Is Not Found"
}
```
