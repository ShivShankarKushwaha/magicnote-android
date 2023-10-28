import axios from 'axios';
import qs from 'qs';
import config from './config'
export default axios.create({
    baseURL: config.URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [data => qs.stringify(data)], // Convert data to URL-encoded format
});
