const sverokModel = {
    createMember: async function getPast(req, res) {
        let api_key = process.env.SVEROK_API_KEY;
        console.log(req.body.member.member);
        try {
            const response = await fetch(`https://ebas.sverok.se/apis/submit_member.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    api_key: api_key,
                    member: req.body.member.member
                })
            });
            const data = await response.json();
            console.log(data.status);
            if (data.requested_result === "success") {
                console.log("User added");
                return res.json(data);
            } else {
                console.log("User not added");
                return res.status(400).json(data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = sverokModel;