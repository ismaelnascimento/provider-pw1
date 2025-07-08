class ServicesDAO {
    static async getServicesByLocal(client) {
        const cursor = await client.find().project({_id:0})
    }
    static async getServicesBySearch(client) {
        const cursor = await client.find().project({_id:0})
    }
    static async getServicesFavorites(client) {
        const cursor = await client.find().project({_id:0})
    }
    static async getServicesPopular(client) {
        const cursor = await client.find().project({_id:0})
    }
    static async insertServices(client) {

    }
    static async deleteService(client) {

    }
    static async updateService(client) {

    }
}

module.exports = ServicesDAO