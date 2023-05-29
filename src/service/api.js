import axios from "axios";
import { API_NOTIFICATION_MESSAGES } from "../constants/config";
import { SERVICE_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";

const API_URL = 'https://blogapp-backend-production-6e87.up.railway.app';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

// interceptor for request case
axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// interceptor for response case
axiosInstance.interceptors.response.use(
    function (response) {
        // stop global loader here
        return processResponse(response);
    },
    function (error) {
        // stop global loader here
        return Promise.reject(processError(error));
    }
)

//////////////////////
// if success -> return { isSucess: true, data: object }
// if fail -> return {isFailure: true, status: string, msg: string, code: int }
const processResponse = (response) => {
    if(response?.status === 200){
        return { isSuccess: true, data: response.data }
    }else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        } 
    }
}


//////////////////////
// if success -> return { isSucess: true, data: object }
// if fail -> return {isFailure: true, status: string, msg: string, code: int }
const processError = (error) => {
    if(error.response){
        // Request made and server responded with a status other
        // that falls out of the range 2.x.x 
        console.log('Error in response: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }

    }else if(error.request){
        // Request made but no response was recieved
        console.log('Error in request: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: ""
        }
    }else{
        // something happend in setting up request that trigger error
        console.log('Error in network: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },

            TYPE: getType(value, body),

            onUploadProgress: function (progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },

            onDownloadProgress: function (progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}

export {API};