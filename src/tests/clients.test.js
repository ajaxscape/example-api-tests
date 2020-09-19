'use strict'

const { createClient, getClient } = require('../helpers/clients')

describe('Sample Test', () => {
  it('should create and retrieve a client', async () => {
    const id = await createClient({})
    const client = await getClient({ id })

    expect(client.id).toEqual(id)
  })
})
