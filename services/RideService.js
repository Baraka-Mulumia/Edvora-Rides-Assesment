import apiClient from "./axios_config";

const RideService = {
  async get() {
    return await apiClient.get("/rides");
  },
};

export default RideService;
