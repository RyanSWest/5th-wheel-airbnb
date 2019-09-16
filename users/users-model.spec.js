const db = require('../database/dbConfig')

const Users = require('./users-model')

https://github.com/Build-Week-5th-wheel-airbnb/5th-wheel-airbnb/tree/ryan-west

describe('users-model', ()=> {
    describe('insert()', ()=> {
        beforeEach(async ()=> {
            await db('users').truncate();
        })
        it ('should insert 2 users', async()=> {
            await Users.add({username: 'Jerry', password :'guacamole', user_type:'rv-owner'})
            await Users.add({username: 'Tim', password :'queso', user_type:'rv-owner'})

            const users = await db('users');
            expect(users).toHaveLength(2)
        })
    })
})