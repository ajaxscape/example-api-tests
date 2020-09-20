'use strict'

const { createClient, getClient, updateClient, replaceClient, deleteClient } = require('../helpers/clients')

describe('Sample Test', () => {
  it('should create and retrieve a client', async () => {
    const { id } = await createClient({})
    const client = await getClient({ id })

    expect(client.id).toEqual(id)
  })

  it('should create, patch and retrieve a client', async () => {
    const { id, lastName } = await createClient({})
    await updateClient({ id, firstName: 'Fred', age: '10' })
    const client = await getClient({ id })

    expect(client.id).toEqual(id)
    expect(client.firstName).toEqual('Fred')
    expect(client.lastName).toEqual(lastName)
  })

  it('should create, put and retrieve a client', async () => {
    const { id } = await createClient({})
    const data = { id, firstName: 'Fred', age: '10' }
    await replaceClient(data)
    const client = await getClient({ id })

    expect(client).toEqual(data)
  })

  it('should create, retrieve and delete a client', async () => {
    const { id } = await createClient({})
    await deleteClient({ id })
    try {
      const client = await getClient({ id })
      expect(client).toEqual(undefined)
    } catch (err) {
      console.log(err)
    }
  })
})
