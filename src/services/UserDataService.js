import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("http://localhost:80/api/pearson");
  }

  get(id) {
    return http.get(`http://localhost:80/api/pearson/${id}`);
  }

  create(data) {
    return http.post("http://localhost:80/api/pearson", data);
  }

  update(id, data) {
    console.log(data);
    return http.put(`http://localhost:80/api/pearson/${id}`, data);
  }

  delete(id) {
    return http.delete(`http://localhost:80/api/pearson/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new UserDataService();
