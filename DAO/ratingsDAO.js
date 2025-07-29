const { ObjectId } = require("mongodb");

class RatingsDAO {
    static async getRatingByUserAndService(client, userId, serviceId) {
        try {
            return await client.findOne({ 
                userId: userId, 
                serviceId: new ObjectId(serviceId) 
            });
        } catch (e) {
            console.error("Error getting rating:", e);
            return null;
        }
    }

    static async insertRating(client, doc) {
        try {
            return await client.insertOne(doc);
        } catch (e) {
            console.error("Error inserting rating:", e);
            return null;
        }
    }

    static async updateRating(client, userId, serviceId, rating) {
        try {
            return await client.updateOne(
                { 
                    userId: userId, 
                    serviceId: new ObjectId(serviceId) 
                }, 
                { $set: { rating: rating, updatedAt: new Date() } }
            );
        } catch (e) {
            console.error("Error updating rating:", e);
            return null;
        }
    }

    static async getServiceRatings(client, serviceId) {
        try {
            const cursor = await client.find({ 
                serviceId: new ObjectId(serviceId) 
            });
            return await cursor.toArray();
        } catch (e) {
            console.error("Error getting service ratings:", e);
            return [];
        }
    }

    static async calculateAverageRating(client, serviceId) {
        try {
            const ratings = await this.getServiceRatings(client, serviceId);
            if (ratings.length === 0) return 0;
            
            const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
            return parseFloat((sum / ratings.length).toFixed(1));
        } catch (e) {
            console.error("Error calculating average rating:", e);
            return 0;
        }
    }
}

module.exports = RatingsDAO;
