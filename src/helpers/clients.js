'use strict'

const request = require('supertest')
const merge = require('deepmerge')
const faker = require('faker')
const config = require('../config')

module.exports = {
  async createClient (args = {}) {
    const { apiUrl } = { ...config, ...args }

    const body = merge({
      title: faker.name.prefix().split('.')[0],
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }, args)

    const res = await request(apiUrl)
      .post('/clients')
      .send(body)

    return res.body
  },

  async updateClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .patch(`/clients/${id}`)
      .send({ ...args })

    return res.body.id
  },

  async replaceClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .put(`/clients/${id}`)
      .send({ ...args })

    return res.body.id
  },

  async deleteClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const res = await request(apiUrl)
      .delete(`/clients/${id}`)
      .send({ ...args })

    return res.body.id
  },

  async getClient (args = {}) {
    const { apiUrl, id } = { ...config, ...args }

    const path = `/clients/${id}`

    const res = await request(apiUrl)
      .get(path)

    return res.statusCode === 200 ? res.body : undefined
  }
}
