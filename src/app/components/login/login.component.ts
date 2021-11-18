import { Component, OnInit } from '@angular/core';

import { IndexedDBService } from 'src/app/services/indexed-db.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router,private indexedDBService:IndexedDBService) { }

  ngOnInit(): void {


  }

  readonly APIUrl="http://localhost:9290/api/";
  loginCorrect:boolean=true;

  async login(loginData:any)
  {

    this.http.get(this.APIUrl+'User').subscribe(
      (res)=>{
        console.log("result from http url",res);
        if(Array.isArray(res)){

                this.indexedDBService.storeUsers(JSON.stringify(res));
                var result = res.filter(function(o:any){return o.userName==loginData.username && o.password == loginData.password} );
                var user= result? result[0] : null;
                if(user)
                {
                  this.loginCorrect=true;
                  console.log(user,"http login");
                  console.log("login success")
                  //route to ticket page

                }
                else{
                  this.loginCorrect=false;
                  console.log("login unsuccessful")

                }
                
        }
        

      },
      async (err)=>{

        var userList=await this.indexedDBService.getUser();
        var users=JSON.parse(userList)
      
        if(Array.isArray(users)){
         
        var result = users.filter(function(o:any){return o.userName==loginData.username && o.password == loginData.password} );
        var user= result? result[0] : null;
        if(user)
        {
          this.loginCorrect=true;
          console.log(user,"indexed db login");
          console.log("login success")
          //route to ticket page

        }
        else{
          this.loginCorrect=false;
          console.log("login unsuccessful")

        }
        
        }

      }
      
    );
     
  }

}
