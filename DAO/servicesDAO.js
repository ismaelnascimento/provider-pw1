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
    static async getFavoritesByService(client, serviceId) {
        const cursor = await client.find({ serviceId }).project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getServicesByLocal(client, location) {
        const cursor = await client.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [location.longitude, location.latitude]
                    },
                    $maxDistance: location.maxDistance
                }
            }
        }).project({ _id: 0 })
        // https://leafletjs.com/examples/quick-start/
        // https://www.mongodb.com/resources/basics/databases/database-search
        // https://www.mongodb.com/docs/manual/geospatial-queries/
        try {
            const results = await cursor.toArray();
            console.log(results)
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getServicesBySearch(client) {
        const cursor = await client.find().project({ _id: 0 })
        // https://www.mongodb.com/resources/basics/full-text-search
    }
    static async getServicesFavorites(client) {
        const cursor = await client.find({ favorite: true }).project({ _id: 0 })
        // db.favorites.aggregate([
        //   {
        //     $match: { userId: ObjectId("userA") } // Filtra pelos favoritos do usuário logado
        //   },
        //   {
        //     $lookup: {
        //       from: "services", // A outra coleção
        //       localField: "serviceId", // Campo da coleção 'favorites'
        //       foreignField: "_id", // Campo da coleção 'services'
        //       as: "serviceDetails" // Nome do novo array com os detalhes do serviço
        //     }
        //   },
        //   {
        //     $unwind: "$serviceDetails" // Desconstrói o array para ter um objeto por resultado
        //   },
        //   {
        //     $replaceRoot: { newRoot: "$serviceDetails" } // Promove os detalhes do serviço para o nível raiz
        //   }
        // ])
        try {
            const results = await cursor.toArray();
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getServicesPopular(client) {
        const cursor = await client.find({ stars: { $gt: 4.0 } }).project({ _id: 0 })
        try {
            const results = await cursor.toArray();
            return results
        } catch (e) {
            console.log(e)
        }
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
