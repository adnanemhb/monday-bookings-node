const request = require('request');

const fetchMondayBookingsApi = async () => {
    const mondayApiUrl = process.env.API_ENDPOINT || '';
    const mondayApiToken = process.env.API_TOKEN || '';

    if (mondayApiUrl === '' || mondayApiToken === '') {
        return {
            status: 'failure',
            data: [],
            message: 'Monday api credentials missing'
        };
    }

    const options = {
        method: 'POST',
        url: mondayApiUrl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + mondayApiToken,
        },
        body: JSON.stringify({
            query:
                'query { boards (workspace_ids: 85401) {id name  items { id name group { title id } state created_at column_values {title value text additional_info }} } }',
        }),
    };

    try {
        const response = await new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ response, body });
                }
            });
        });

        const responseData = JSON.parse(response.body);
        if (responseData.hasOwnProperty('errors')) {
            return {
                status: 'failure',
                data: [],
                message: 'Error fetching Monday bookings'
            };
        }
        return {
            status: 'success',
            data: responseData,
        };
    } catch (error) {
        console.error('Error fetching Monday bookings:', error);
        return {
            status: 'failure',
            data: [],
            message: 'Error fetching Monday bookings:' + error.message,
        };
    }
};

module.exports = fetchMondayBookingsApi



