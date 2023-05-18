import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { environment } from "../../environments/environment"

import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = environment.backend;
  token = localStorage.getItem('token');
  id = localStorage.getItem('id');
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };

  constructor(private http: HttpClient) { }

  postLogin(user:User) {
    return this.http.post<any>(this.URL_API + `login`,user,this.httpOptions);
  }

  getExist(email:string) {
    return this.http.post<any>(this.URL_API + `exist/?email=${email}`,null);
  }

  getUser() {
    return this.http.get<any>(this.URL_API + `user/${this.id}`,this.httpOptions);
  }

  getRecoverUser(email:string) {
    return this.http.get<any>(this.URL_API + `recover/${email}`,this.httpOptions);
  }

  putUser(user:User) {
    return this.http.put<any>(this.URL_API + `user/${this.id}`,user,this.httpOptions);
  }

  postRecover(user:any,id:string) {
    return this.http.post<any>(this.URL_API + `recover/${id}`,user,this.httpOptions);
  }
  
}
