import { Injectable } from '@angular/core';

//importar modulos de firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';

//importar modelo
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angulaFirestore:AngularFirestore) { }

  //metodos para el crud
  getPosts(){
   return this.angulaFirestore.collection("posts").snapshotChanges();
  }
  getPostById(id){
    return this.angulaFirestore.collection("posts").doc(id).valueChanges();
  }
  createPost(post:Post){
    return new Promise<any>((resolve,reject)=>{
      this.angulaFirestore
      .collection("posts")
      .add(post)
      .then((response)=>{
        console.log(response)
      },
      (error) => {
        reject(error)
      })
    })
  }
  updatePost(post:Post, id){
    return this.angulaFirestore
    .collection("posts")
    .doc(id)
    .update({
      title: post.title,
      content:post.content,
      author:post.author
    });
  }
  deletePost(post){
    return this.angulaFirestore
    .collection("posts")
    .doc(post.id)
    .delete()
  }

}
