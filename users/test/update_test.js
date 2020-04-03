const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 })

    joe.save()
      .then(() => done())
  })

  function assertName (operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  })

  it('instance type using updateOne', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done)
  })

  it('model class can updateOne', (done) => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done)
  })

  it('A user can have their postCount incremented by 1', () => {
    
  })
})
