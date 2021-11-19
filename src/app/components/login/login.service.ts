import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class LoginService{

    //default language
    private isLoginPage:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
    public getLan(){
      return this.isLoginPage.asObservable();
    }
  
    public updateLan(lan: boolean){
      this.isLoginPage.next(lan);
    }

    private loggedInUserName:BehaviorSubject<string> = new BehaviorSubject<string>('');
  
    public getUserName(){
      return this.loggedInUserName.asObservable();
    }
  
    public updateUserName(user: string){
      this.loggedInUserName.next(user);
    }
  }