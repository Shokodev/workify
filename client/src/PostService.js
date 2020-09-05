import axios from 'axios';
//import fs from 'fs';
const url = 'api/posts/';

class PostService{
    //Get Posts
    static getPosts(){
        return new Promise(((resolve, reject) =>
            axios.get(url).then((res) => {
            resolve(
                res.data
            );
        }).catch((err) => {
            reject(err);
        }
        )))
    }

    // Create Posts
    static insertPost(item){
        return axios.post(url, {
            item
        });
    }


    static editPost(item){
        return axios.put(`${url}${item._id}`, item )
    }

    // Delete Posts
    static deletePost(id){
        return axios.delete(`${url}${id}`)
    }

    // Get Excel sheet of all graphics
    static createExcel(){
        return new Promise(((resolve, reject) =>
            axios.get(url + 'excel',{responseType: 'arraybuffer'}).then((res) => {
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
