import { createApiClient } from "./createApiClient";
import { API_BASE_URL } from "../config/api";

const bookingApi = createApiClient(API_BASE_URL);

export default bookingApi;
