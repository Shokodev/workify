import axios from 'axios';
//import fs from 'fs';

const baseUrl = 'api/';
const postUrl = 'api/posts/';

class PostService{


    //Get Posts
    static getPosts(){
        return new Promise(((resolve, reject) =>
            axios.get(postUrl).then((res) => {
            resolve(
                res.data
            );
        }).catch((err) => {
            reject(err);
        }
        )))
    }

    //Get Dashboard info
    static getDashboard(data){
        return new Promise(((resolve, reject) =>
            axios.get(baseUrl + "dashboard/" + data).then((res) => {
                resolve(
                    res.data
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }

    // Get Settings
    static getSettings(){
        return new Promise(((resolve, reject) =>
            axios.get(baseUrl+"settings").then((res) => {
                resolve(
                    res.data
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }

    static updateSettings(settings, id){
        return axios.put(`${baseUrl + "settings/"}${id}`, settings)
    }

    // Create Posts
    static insertPost(item){
        return axios.post(postUrl, {
            item
        });
    }


    static editPost(post){
        return axios.put(`${postUrl}${post._id}`, {post} )
    }

    // Delete Posts
    static deletePost(id){
        return axios.delete(`${postUrl}${id}`)
    }

    // Get Excel sheet of all graphics
    static createExcel(){
        return new Promise(((resolve, reject) =>
            axios.get(baseUrl + 'excel',{responseType: 'arraybuffer'}).then((res) => {
                resolve(
                    this.forceFileDownload(res)
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }

    static forceFileDownload(response){
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'graphics.xlsx') //or any other extension
        document.body.appendChild(link)
        link.click()
    }


}

export default PostService;
