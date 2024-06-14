import supertest from "supertest"
import { AddressTest, ContactTest, UserTest } from "./test-ustil"
import { web } from "../src/app/web"
import { logger } from "../src/app/logging"

describe('POST api/contacts/:contactId/addresses', ()=> {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id}/addresses`)
        .set('X-API-TOKEN', 'test')
        .send({
            street: "jalan",
            city: "surakarta",
            province: "jawa tengah",
            country: "indonesia",
            postal_code: "1234"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe("jalan")
        expect(response.body.data.city).toBe("surakarta")
        expect(response.body.data.province).toBe("jawa tengah")
        expect(response.body.data.country).toBe("indonesia")
        expect(response.body.data.postal_code).toBe("1234")
    })

    it('should be reject new address if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id}/addresses`)
        .set('X-API-TOKEN', 'test')
        .send({
            street: "jalan",
            city: "surakarta",
            province: "jawa tengah",
            country: "",
            postal_code: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject new address if request is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id + 1}/addresses`)
        .set('X-API-TOKEN', 'test')
        .send({
            street: "jalan",
            city: "surakarta",
            province: "jawa tengah",
            country: "indonesia",
            postal_code: "1234"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})


describe('GET api/contacts/:contactId/addresses/:addressId', ()=> {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to get address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe(address.street)
        expect(response.body.data.city).toBe(address.city)
        expect(response.body.data.province).toBe(address.province)
        expect(response.body.data.country).toBe(address.country)
        expect(response.body.data.postal_code).toBe(address.postal_code)
    })

    it('should reject get address if address is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject get address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe('PUT api/contacts/:contactId/addresses/:addressId', ()=> {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to update address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "test",
            postal_code: "1234"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(address.id)
        expect(response.body.data.street).toBe("test")
        expect(response.body.data.city).toBe("test")
        expect(response.body.data.province).toBe("test")
        expect(response.body.data.country).toBe("test")
        expect(response.body.data.postal_code).toBe("1234")
    })

    it('should reject update address data is invalid', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "",
            postal_code: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject update address if address is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
        .set('X-API-TOKEN', "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "indonesia",
            postal_code: "111"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject update address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "indonesia",
            postal_code: "111"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe('DELETE api/contacts/:contactId/addresses/:addressId', ()=> {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to delete address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("ok")
    })

    it('should reject remove address if address is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .delete(`/api/contacts/${contact.id}/addresses/${address.id + 2}`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject remove address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()

        const response = await supertest(web)
        .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe('GET api/contacts/:contactId/addresses', ()=> {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to list addresses', async () => {
        const contact = await ContactTest.get()

        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
    })

    it('should reject list address if contact not found', async () => {
        const contact = await ContactTest.get()

        const response = await supertest(web)
        .get(`/api/contacts/${contact.id + 1}/addresses`)
        .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

})