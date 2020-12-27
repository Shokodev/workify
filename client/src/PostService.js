import axios from "axios";
//import fs from 'fs';

const baseUrl = "api/";
const postUrl = "api/posts/";
const userUrl = "api/users/";

class PostService {
  //Get Posts
  static getPosts() {
    return new Promise((resolve, reject) =>
      axios
        .get(postUrl)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  }

  //Get Dashboard info
  static getDashboard(data) {
    return new Promise((resolve, reject) =>
      axios
        .get(baseUrl + "dashboard/" + data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  }

  // Get Settings
  static getSettings() {
    return new Promise((resolve, reject) =>
      axios
        .get(baseUrl + "settings", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  }
  // Get Users
  static getUsers() {
    return new Promise((resolve, reject) =>
      axios
        .get(userUrl + "users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  }

  static updateSettings(settings, id) {
    return axios.put(`${baseUrl + "settings/"}${id}`, settings, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  // Create Posts
  static insertPost(item) {
    return axios.post(
      postUrl,
      {
        item,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  static editUser(user) {
    return axios.put(
      `${userUrl}${user._id}`,
      { user },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  static resetPassword(id, password) {
    return axios.put(
      `${userUrl + "reset/password/"}${id}`,
      { password: password },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  static deleteUser(user) {
    return axios.put(
      `${userUrl + "delete/"}${user._id}`,
      { user },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  static editPost(post) {
    return axios.put(
      `${postUrl}${post._id}`,
      { post },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  // Delete Posts
  static deletePost(id) {
    return axios.delete(`${postUrl}${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  // Get Excel sheet of all graphics
  static createExcel() {
    return new Promise((resolve, reject) =>
      axios
        .get(baseUrl + "excel", { responseType: "arraybuffer" })
        .then((res) => {
          resolve(this.forceFileDownload(res));
        })
        .catch((err) => {
          reject(err);
        })
    );
  }

  static forceFileDownload(response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "graphics.xlsx"); //or any other extension
    document.body.appendChild(link);
    link.click();
  }
}

export default PostService;
