const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ==========================================
// 1. DATABASE CONNECTION
// ==========================================
const dbURI = "mongodb+srv://admin_ritu:Rituraj2525@nivabackend.qbfasgy.mongodb.net/niva_follower?retryWrites=true&w=majority&appName=nivabackend";

mongoose.connect(dbURI)
  .then(() => console.log('✅ SUCCESS: Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MONGODB ERROR:', err.message));

// ==========================================
// 2. DATABASE MODELS
// ==========================================
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    instagramId: String,
    coins: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    posts: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    hasStory: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    referralCode: String,
    instagramSession: Object,
});

const User = mongoose.model('User', userSchema);

// ==========================================
// 3. INSTAGRAM SCRAPER (Real-time Stats)
// ==========================================
async function getLiveIGStats(username, cookies) {
    if (!cookies) return null;
    const cookieString = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');

    try {
        const response = await axios.get(`https://www.instagram.com/${username}/?__a=1&__d=dis`, {
            headers: {
                'Cookie': cookieString,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 10000
        });

        if (response.data && response.data.graphql) {
            const user = response.data.graphql.user;
            return {
                followers: user.edge_followed_by.count,
                following: user.edge_follow.count,
                posts: user.edge_owner_to_timeline_media.count,
                instaId: user.id,
                bio: user.biography,
                profilePic: user.profile_pic_url_hd,
                hasStory: user.has_public_story || false
            };
        }
    } catch (e) {
        console.error(`Stats Fetch Error for ${username}:`, e.message);
    }
    return null;
}

// ==========================================
// 4. API ROUTES
// ==========================================

app.get('/api/user/:username', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username });
        if (!user) {
            user = new User({
                username: req.params.username,
                referralCode: Math.random().toString(36).substring(7).toUpperCase()
            });
            await user.save();
        }

        if (user.instagramSession) {
            const stats = await getLiveIGStats(user.username, user.instagramSession);
            if (stats) {
                user.followers = stats.followers;
                user.following = stats.following;
                user.posts = stats.posts;
                user.instagramId = stats.instaId;
                user.bio = stats.bio;
                user.profilePic = stats.profilePic;
                user.hasStory = stats.hasStory;
                await user.save();
            }
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// AI Automation Task
app.post('/api/instagram/ai-task', async (req, res) => {
    const { username, taskType } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !user.instagramSession) return res.status(401).json({ error: "Login required" });

        const cookieString = Object.entries(user.instagramSession).map(([k, v]) => `${k}=${v}`).join('; ');
        const headers = {
            'Cookie': cookieString,
            'X-CSRFToken': user.instagramSession['csrftoken'] || '',
            'X-Instagram-AJAX': '1',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        };

        if (taskType === 'updateBio') {
            await axios.post('https://www.instagram.com/accounts/edit/',
                `biography=Automated with Niva AI ✨&chaining_enabled=on&email=${username}@example.com&external_url=&first_name=&gender=3&phone_number=&username=${username}`,
                { headers }
            );
            user.bio = "Automated with Niva AI ✨";
        } else if (taskType === 'uploadPost') {
            user.posts += 1;
        } else if (taskType === 'uploadStory') {
            user.hasStory = true;
        } else if (taskType === 'updateProfilePic') {
            user.profilePic = "https://niva.ai/default-avatar.png";
        }

        await user.save();
        res.json({ success: true, user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/user/upgrade-vip', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user && user.posts >= 6 && user.bio && user.profilePic && user.hasStory) {
        user.isVip = true;
        await user.save();
        res.json({ success: true });
    } else {
        res.status(400).json({ error: "Requirements not met" });
    }
});

app.post('/api/user/save-session', async (req, res) => {
    const { username, cookies } = req.body;
    await User.findOneAndUpdate({ username }, { instagramSession: cookies }, { upsert: true });
    res.json({ success: true });
});

app.post('/api/instagram/follow', async (req, res) => {
    const { username, targetUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const targetStats = await getLiveIGStats(targetUsername, user.instagramSession);
        const cookieString = Object.entries(user.instagramSession).map(([k, v]) => `${k}=${v}`).join('; ');
        const response = await axios.post(`https://www.instagram.com/web/friendships/${targetStats.instaId}/follow/`, {}, {
            headers: {
                'Cookie': cookieString,
                'X-CSRFToken': user.instagramSession['csrftoken'] || '',
                'X-Instagram-AJAX': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        if (response.data.status === 'ok') {
            user.coins += 4; await user.save();
            res.json({ success: true, newBalance: user.coins });
        } else { res.status(400).json({ error: "Blocked" }); }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Niva Backend running on port ${PORT}`));
