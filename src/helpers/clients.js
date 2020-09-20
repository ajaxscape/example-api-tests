'use strict'

const request = require('supertest')
const merge = require('deepmerge')
const faker = require('faker')
const config = require('../config')

module.exports = {
  async createClient (args = {}, expectedCode = 201) {
    const { apiUrl } = { ...config, ...args }

    const body = merge({
      title: faker.name.prefix().split('.')[0],
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }, args)

    const res = await request(apiUrl)
      .post('/clients')
      .send(body)

    expect(res.statusCode).toEqual(expectedCode)

    return res.body
  },

  async updateClient (args = {}, expectedCode = 200) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .patch(`/clients/${id}`)
      .send({ ...args })

    expect(res.statusCode).toEqual(expectedCode)

    return res.body
  },

  async replaceClient (args = {}, expectedCode = 200) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .put(`/clients/${id}`)
      .send({ ...args })

    expect(res.statusCode).toEqual(expectedCode)

    return res.body
  },

  async deleteClient (args = {}, expectedCode = 200) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .delete(`/clients/${id}`)
      .send({ ...args })

    expect(res.statusCode).toEqual(expectedCode)

    return res.body
  },

  async getClient (args = {}, expectedCode = 200) {
    const { apiUrl, id } = { ...config, ...args }

    const path = `/clients/${id}`

    const res = await request(apiUrl)
      .get(path)

    expect(res.statusCode).toEqual(expectedCode)

    return res.statusCode === 200 ? res.body : undefined
  }
}
