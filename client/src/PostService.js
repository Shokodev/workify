import axios from 'axios';

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

}

export default PostService;
