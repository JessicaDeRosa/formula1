const axios = require('axios');

//import data from api to DataBase
const importData = async (connection) => {
    try {
        const response = await axios.get('http://ergast.com/api/f1/2019/drivers.json');
        const drivers = response?.data?.MRData?.DriverTable?.Drivers;

        if (!drivers || !Array.isArray(drivers)) {
            console.error('Error fetching driver data: Invalid API response format');
            return;
        }

        drivers.forEach(driver => {
            const { permanentNumber, givenName, familyName, nationality, dateOfBirth } = driver;
            const sql = `INSERT INTO drivers (permanent_number, first_name, last_name, nationality, dateOfBirth)
             SELECT ?, ?, ?, ?, ?
             FROM drivers
             WHERE NOT EXISTS (SELECT * FROM drivers WHERE permanent_number = ?)`;
            connection.query(sql, [permanentNumber, givenName, familyName, nationality, dateOfBirth, permanentNumber], (err, results) => {
                if (err) {
                    console.error('Error saving driver data: ', err);
                    return;
                }
                console.log(`Driver ${givenName} ${familyName} saved to database!`);
            });
        });
    } catch (err) {
        console.error('Error fetching driver data: ', err);
    }
};



module.exports = {
    importDataFromAPI: importData
};
