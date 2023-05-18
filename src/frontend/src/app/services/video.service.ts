import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Video } from "../models/video";
import { environment } from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  readonly URL_API = environment.backend;
  token = localStorage.getItem('token');
  id = localStorage.getItem('id');
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };

  constructor(private http: HttpClient) { }

  getVideo(id:string) {
    return this.http.get<any>(this.URL_API + `video/${id}`,this.httpOptions);
  }
  getVideos(){
    this.id=localStorage.getItem('id');
    return this.http.get<any>(this.URL_API + `videos/${this.id}`,this.httpOptions);
  }

  postVideo(file:File,title:string) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
    // * Cuando se crea el usuario no se actualiza el header, asi que se hace manual por si las moscas
    this.httpOptions={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      })
    }
    // Se envia el archivo en FormData
    const fd = new FormData();
    fd.append('file',file)
    this.id=localStorage.getItem('id');
    return this.http.post<any>(this.URL_API + `uploadfile/${title}/${this.id}`,fd,this.httpOptions);
  }
  
  deleteVideo(id:string){
    return this.http.delete<any>(this.URL_API + `videos/${id}`,this.httpOptions);
  }


}
