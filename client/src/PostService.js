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

    // Delete Posts
    static deletePost(id){
        return axios.delete(`${url}${id}`)
    }

    // Delete Posts
    static createExcel(){
        return new Promise(((resolve, reject) =>
            axios.get(url + 'excel',).then((res) => {
                resolve(
                    res
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }

}

export default PostService;
