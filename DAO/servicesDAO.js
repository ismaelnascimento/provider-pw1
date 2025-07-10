class ServicesDAO {
    static async getAllServices(client) {
        const cursor = await client.find().project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getServicesByLocal(client) {
        const cursor = await client.find().project({ _id: 0 })
    }
    static async getServicesBySearch(client) {
        const cursor = await client.find().project({ _id: 0 })
    }
    static async getServicesFavorites(client) {
        const cursor = await client.find().project({ _id: 0 })
    }
    static async getServicesPopular(client) {
        const cursor = await client.find().project({ _id: 0 })
    }
    static async insertService(client, doc) {
        const ok = await client.insertOne(doc)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async deleteServiceById(client, id) {
        const ok = await client.deleteOne(id)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async updateServiceById(client, id, doc) {
        const docs = await client.updateOne(id, doc)

        try {
            return docs
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = ServicesDAO