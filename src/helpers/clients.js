'use strict'

const request = require('supertest')
const faker = require('faker')
const config = require('../config')

module.exports = {
  async createClient (args = {}) {
    const { apiUrl } = { ...config, ...args }

    const body = {
      title: faker.name.prefix().split('.')[0],
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }

    const res = await request(apiUrl)
      .post('/clients')
      .send(body)

    try {
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('id')
    } catch (err) {
      console.log(res.text)
      throw err
    }

    return res.body
  },

  async updateClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .patch(`/clients/${id}`)
      .send({ ...args })

    try {
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('id')
    } catch (err) {
      console.log(res.text)
      throw err
    }

    return res.body.id
  },

  async replaceClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .put(`/clients/${id}`)
      .send({ ...args })

    try {
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('id')
    } catch (err) {
      console.log(res.text)
      throw err
    }

    return res.body.id
  },

  async getClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const path = `/clients/${id}`

    const res = await request(apiUrl)
      .get(path)

    try {
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('id')
    } catch (err) {
      console.log(res.text)
      throw err
    }

    return res.body
  }
}
