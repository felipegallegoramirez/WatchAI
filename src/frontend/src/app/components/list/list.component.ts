import { Component, OnInit } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../services/video.service'
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private videoService:VideoService) { }
  items:Video[]=[]
  filter:Video[]=[]

  // TODO: Pide a la base de datos todos los videos asociados
  ngOnInit(): void {
    if(localStorage.getItem("id")== null){
      window.location.replace(`${environment.baseUrl}landing`);
    }
    this.videoService.getVideos().subscribe(res=>{
      this.items= res as Video[]
      this.filter= res as Video[]
    },err=>{
      alert(err.message)
    })
  }

  // TODO: Actualiza los datos que se muestran, segun con el parametro de busqueda
  search(){
    this.items=[]
    let search = (<HTMLInputElement>document.getElementById("search")).value
    this.items=this.filter.filter(video => video.title.includes(search)==true);
  }

}
