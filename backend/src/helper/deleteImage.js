const fs = require('fs').promises;

const delateImage = async (userImagePath) =>{

    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        
        console.log('User Image Was Deleted')

    } catch (error) {
        console.error('User Image Was Not Exist')
    }
};

module.exports = {delateImage};