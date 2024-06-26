import axios from "axios";
import configs from "@constants/configs";

axios.defaults.baseURL = configs.apiURL;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.headers.common = { "Content-Transfer-Encoding": "application/gzip" };
axios.defaults.headers.common = { "Access-Control-Allow-Headers": "Origin, Content-Type" };
axios.defaults.headers.common = { "Access-Control-Allow-Origin": "*" };
axios.defaults.responseType = "json";
// axios.defaults.timeout = 25000;

export default axios;