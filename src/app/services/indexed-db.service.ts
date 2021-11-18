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

  storeTickets(ticketList:any){
    return this.db.put('user-store',ticketList,'ticketList');


  }

  async retrieveTicketList(){
    const transaction=this.db.transaction(['user-store']);
    const objectStore=transaction.objectStore('user-store');
    const request=await objectStore.get('ticketList');
    console.log(request,"reqqqqq")
    return request;

  }

  storeUpdateList(updateItem:any){
   return this.db.put('user-store',updateItem,'updateList');


  }

  async retrieveTicketById(id:any){
    this.connectToDb();
    const transaction=this.db.transaction(['user-store']);
    const objectStore=transaction.objectStore('user-store');
    const ticketList=await objectStore.get('ticketList');
    console.log(ticketList,"iddddddddddd")
    var ticket=ticketList.filter((cat:any) => cat.id == id)
    console.log(ticket,"Lollllllllllllllll")
    return ticket;



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