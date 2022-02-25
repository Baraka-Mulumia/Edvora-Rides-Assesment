import apiClient from "./axios_config";

const UserService = {
  async get() {
    return await apiClient.get("/user");
  },
};

export default UserService;
