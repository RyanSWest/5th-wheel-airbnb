const db = require('../database/dbConfig')

const Users = require('./users-model');




describe('users-model', ()=> {
    describe('insert()', ()=> {
        beforeEach(async ()=> {
            await db('users').truncate();
        })
        it ('should insert 2 users', async()=> {
            await Users.insert({username: 'Jerry', password :'guacamole', user_type:'rv-owner'})
            await Users.insert({username: 'Tim', password :'queso', user_type:'rv-owner'})

            const Users = await db('users');
            expect(users).toHaveLength(10)
        })
    })
})