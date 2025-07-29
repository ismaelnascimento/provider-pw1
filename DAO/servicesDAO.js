const { dbFavorites } = require("../database");
const { ObjectId } = require("mongodb");

class ServicesDAO {
    static filterLocation(location) {
        return {
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [location.longitude, location.latitude]
                    },
                    $maxDistance: location.maxDistance
                }
            }
        }
    }
    static async getAllServicesByFilter(client, filter) {
        const cursor = await client.find(filter)
        try {
            const results = await cursor.toArray();
            // console.log(results)
            return results
        } catch (e) {
            console.log(e)
            return [];
        }
    }
    static async getServicesByLocal(client, location) {
        // dbServices.createIndex({ "location": "2dsphere" })
        return await ServicesDAO.getAllServicesByFilter(client, ServicesDAO.filterLocation(location))
    }
    static async getServicesByLocalAndCategory(client, location, category) {
        if (location) {
            return await ServicesDAO.getAllServicesByFilter(client, {
                ...ServicesDAO.filterLocation(location),
                category: { $regex: '^' + category + '$', $options: 'i' }
            })
        } else {
            return await ServicesDAO.getAllServicesByFilter(client, {
                category: { $regex: '^' + category + '$', $options: 'i' }
            })
        }
    }
    static async getServicesBySearch(client, search) {
        const cursor = await client.find(
            {
                $text: {
                    $search: search?.toLowerCase(),
                }
            },
        )
        try {
            const results = await cursor.toArray();
            // console.log(results)
            return results
        } catch (e) {
            console.log(e)
            return [];
        }
        // https://www.mongodb.com/resources/basics/full-text-search
    }
    static async insertFavoriteByService(client, doc) {
        // db.favorites.createIndex({ "userId": 1 });
        // db.favorites.createIndex({ "serviceId": 1 });
        // db.favorites.createIndex({ "userId": 1, "serviceId": 1 }, { unique: true });
        // favorite:
        // {
        //   "_id": ObjectId("fav001"),
        //   "id": "asdad",
        //   "userId": "asdasd",
        //   "serviceId": "asdsad",
        //   "createdAt": 2025-07-24T19:30:00Z
        // }
        // POST services/:id/favorite
        const ok = await client.insertOne(doc)
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async deleteFavoriteById(client, userId, serviceId) {
        // DELETE /services/:id/favorite
        const ok = await client.deleteOne({ userId, serviceId })
        try {
            return ok
        } catch (e) {
            console.log(e)
        }
    }
    static async getFavoritesByService(client, serviceId) {
        return await ServicesDAO.getAllServicesByFilter(client, { serviceId })
    }
    static servicesWithFavorites = async (services, user) => {
        if (!user) return services;
        let favoriteServiceIds = [];
        if (user) {
            const favorites = await ServicesDAO.getFavoritesByUserId(dbFavorites, user.id);
            favoriteServiceIds = favorites.map(fav => fav.serviceId.toString());
        }

        return services.map(service => ({
            ...service,
            favorite: favoriteServiceIds.includes(service._id.toString())
        }));
    }
    static async getFavoritesByUserId(client, userId) {
        const cursor = await client.find({ userId })
        try {
            const results = await cursor.toArray();
            // console.log(results)
            return results
        } catch (e) {
            console.log(e)
            return [];
        }
    }
    static async getServicesFavorites(client, userId) {
        const cursor = await client.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            {
                $unwind: "$serviceDetails"
            },
            {
                $replaceRoot: { newRoot: "$serviceDetails" }
            }
        ])

        try {
            const results = await cursor.toArray();
            // console.log("Services Favorites:", results)
            return results
        } catch (e) {
            console.log(e)
        }
    }
    static async getServicesPopular(client) {
        return await ServicesDAO.getAllServicesByFilter(client, { stars: { $gte: 4.0 } })
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
    static async updateServiceStars(client, serviceId) {
        try {
            const favoritesCount = await dbFavorites.countDocuments({ serviceId: new ObjectId(serviceId) });

            const uniqueUsersCursor = await dbFavorites.aggregate([
                { $group: { _id: "$userId" } },
                { $count: "uniqueUsers" }
            ]);

            const uniqueUsersResult = await uniqueUsersCursor.toArray();
            const totalUniqueUsers = uniqueUsersResult.length > 0 ? uniqueUsersResult[0].uniqueUsers : 1;

            const starRating = Math.min(5, Math.max(1, (favoritesCount / totalUniqueUsers) * 5));

            const stars = Math.round(starRating * 10) / 10;

            await this.updateServiceById(
                client,
                { _id: new ObjectId(serviceId) },
                { $set: { stars: stars } }
            );

            return stars;
        } catch (e) {
            console.error("Error updating service stars:", e);
            return 0;
        }
    }
}

module.exports = ServicesDAO
