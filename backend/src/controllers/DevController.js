const Dev = require('../models/Dev');
const axios = require('axios');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.like } },
                { _id: { $nin: loggedDev.dislike } },
            ]
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }
        
        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url : avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar    
        })

        return res.json(dev)
    }
}