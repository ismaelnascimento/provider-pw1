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
    static async insertServices(client, doc) {
        const ok = await client.insertOne(doc)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async deleteService(client) {

    }
    static async updateService(client) {

    }
}

module.exports = ServicesDAO