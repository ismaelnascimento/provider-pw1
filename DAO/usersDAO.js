class UsersDAO {
    static async getAllUsers(client) {
        const cursor = await client.find().project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getUserByServiceId(client, id) {
        const cursor = await client.find({ serviceId: { id: id } }).project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results[0]
        } catch (e) {
            console.log(e)
        }
    }
    // static async getUserByUserNameAndPassword(client, id) {

    // }
    static async insertUser(client, doc) {
        const ok = await client.insertOne(doc)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async deleteUserById(client, id) {
        const ok = await client.deleteOne(id)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async updateUserById(client, id, doc) {
        const docs = await client.updateOne(id, doc)

        try {
            return docs
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = UsersDAO