import axios from 'axios';
import qs from 'qs';

export default axios.create({
    // baseURL: 'https://magicnoteandroidserver.onrender.com', // Replace with your API base URL
    baseURL: 'https://magicnoteandroidserver-7x6l.onrender.com', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [data => qs.stringify(data)], // Convert data to URL-encoded format
});
