import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service'
import { Video } from "../../models/video";
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.css'],
  providers: [ VideoService]
})
export class VisualizeComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, private videoService:VideoService) { }
  id:string=""
  video:Video=new Video()
  linkvideo:string=`./../../assets/default.mp4`

  // TODO: Toma el /:id de la url y busca los datos correspondientes, ademas de pedir el video
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id']
      this.videoService.getVideo(this.id).subscribe(res=>{
        this.video= res as Video
        this.linkvideo=`${environment.backend}resource/${this.video.linkvideo}`
        console.log(`${environment.backend}resource/${this.video.linkvideo}`)
      },err=>{
        alert(err.message)
      })
    })
    if(localStorage.getItem("id")== null){
      window.location.replace(`${environment.baseUrl}landing`);
    }
  }

  // TODO: Eliminar video
  delete(){
    this.videoService.deleteVideo(this.id).subscribe(res=>{
      window.location.replace(`${environment.baseUrl}list`);
    },err=>{
      alert(err.message)
    })
  }

  // TODO: Cambiar caracteristica visualizada 
  next(position:number){
    let elements = document.getElementsByClassName("right__item")
    for (let i = 0;i<elements.length;i++){
      elements[i].classList.add("ocult")
    }
    elements[position].classList.remove("ocult")
  }

}
