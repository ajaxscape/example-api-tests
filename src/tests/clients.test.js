'use strict'

const { createClient, getClient, updateClient, replaceClient, deleteClient } = require('../helpers/clients')

describe('Sample Test', () => {
  it('should successfully create and retrieve a client', async () => {
    const { id } = await createClient()
    const client = await getClient({ id })

    expect(client).not.toEqual(undefined)
    expect(client.id).toEqual(id)
  })

  it('should fail to retrieve a non existent client', async () => {
    await getClient({ id: 'unknown' }, 404)
  })

  it('should successfully create and update a client', async () => {
    const { id, lastName } = await createClient()
    const client = await updateClient({ id, firstName: 'Fred', age: '10' })

    expect(client).not.toEqual(undefined)
    expect(client.id).toEqual(id)
    expect(client.firstName).toEqual('Fred')
    expect(client.lastName).toEqual(lastName)
  })

  it('should fail to update a non existent client', async () => {
    await updateClient({ id: 'unknown', firstName: 'Fred', age: '10' }, 404)
  })

  it('should successfully create and replace a client', async () => {
    const { id } = await createClient()
    const data = { id, firstName: 'Fred', age: '10' }
    const client = await replaceClient(data)

    expect(client).not.toEqual(undefined)
    expect(client).toEqual(data)
  })

  it('should fail to replace a non existent client', async () => {
    await replaceClient({ id: 'unknown', firstName: 'Fred', age: '10' }, 404)
  })

  it('should successfully create and delete a client', async () => {
    const { id } = await createClient()
    const client = await deleteClient({ id })

    expect(client).not.toEqual(undefined)
    expect(client.id).toEqual(id)
  })

  it('should fail to delete a non existent client', async () => {
    await deleteClient({ id: 'unknown' }, 404)
  })
})
