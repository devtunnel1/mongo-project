const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.Promise = global.Promise // ES6 Promise

before((done) => {
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error)
    })
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done()
  })
})
