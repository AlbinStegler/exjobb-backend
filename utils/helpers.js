// Function to check if API Key is present
// 
// @param {*} req 
// @param {*} res 
// @param {*} next 
// @returns
function checkApiKey(key) {
    if (key !== process.env.API_KEY) {
        return false;
    } else {
        return true;
    }
}
module.exports = checkApiKey;
