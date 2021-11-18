import { Injectable } from '@angular/core';
import {DBSchema, openDB} from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor() { 
    this.connectToDb();
  }
  db:any;
  async connectToDb(){
    this.db=await openDB<MyDB>('my-db',1,{
      upgrade(db:any){
        db.createObjectStore('user-store');
      }
  
    })
  }

  storeUsers(userList:string){
    return this.db.put('user-store',userList,'userList');
  }

  async getUser(){
    
    const transaction=this.db.transaction(['user-store']);
    const objectStore=transaction.objectStore('user-store');
    const request=await objectStore.get('userList');
    console.log(request,"reqqqqq")
    return request;
    // const request=await objectStore.get('userList').then((data:any)=>{
    //   console.log(data,"from indexed db");
    //   return data;
    // });  
  }

  

}

interface MyDB extends DBSchema{
  'user-store' : {
    key:string;
    value:string;
  }
}