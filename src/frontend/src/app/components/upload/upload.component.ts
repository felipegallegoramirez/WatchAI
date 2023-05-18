import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service'
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [ VideoService ]
})
export class UploadComponent implements OnInit {
  constructor( private videoService:VideoService) { }

  ngOnInit(): void {
    if(localStorage.getItem("id")== null){
      window.location.replace(`${environment.baseUrl}landing`);
    }
    this.titleText(0)
  }
  exist:boolean=true

  // TODO: oculta el input actual y lo cambia por el siguiente
  next(position:number){
    this.titleText(position)
    let elements = document.getElementsByClassName("preinput")
    for (let i = 0;i<elements.length;i++){
      elements[i].classList.add("oculto")
    }
    setTimeout(() => {
      elements[position].classList.remove("oculto")
    }, 1990);
  }

  // ! Title
  // TODO: Centro para manejar el titulo
  titleText(position:number){
    switch (position) {
      case 0:
        this.dinamic("Buen titulo 🧐","")
        break;
      case 1:
        this.dinamic("Otro, Eres el mejor 🥳","Buen titulo 🧐")
        break;
      case 3:
          this.dinamic("Un mirada Robotica 🤖","Otro, Eres el mejor 🥳")
      break;
    }
    

  }
  // TODO: Funcion recursiva que va cambiando el titulo de forma progresiva (Texto a colocar, Texto Actual, Letra actual)
  async dinamic(text:string,first:string,i:number=1){
    setTimeout(() => {
      var act = ""
      var title = (<HTMLElement>document.getElementById("tit"));
      if(first.length>0){
        act=first.substring(0, first.length - 1);
      }
      else{
        act=text.substring(0,i);
      }
      console.log(act)
      title.innerHTML=act
      
      if(i<text.length){
        if(first.length>0){
          this.dinamic(text,act)
        }
        else{
          this.dinamic(text,"",i+1)
        }
      }
    }, 50);
  }

  
  // TODO: Verifica el titulo 
  title(){
    var title = (<HTMLInputElement>document.getElementById("title")).value;
    if(title.length>25 ||title.length<3){
      alert("El titulo debe tener entre 3 y 25 caracteres")
    }else{
      this.next(1)
    }


  }

  // TODO: Verifica el archivo y el titulo y porcede con la peticion 
  video(){
    var file = (<HTMLInputElement>document.getElementById("file")).files?.item(0)
    var title = (<HTMLInputElement>document.getElementById("title")).value;
    if(!file){
      alert("Archivo Necesario")
    }
    else{
      this.videoService.postVideo(file,title).subscribe((res) =>{
        setTimeout(() => {
          window.location.replace(`${environment.baseUrl}/video/${res.id}`);
        }, 5000);

      },err=>{
        alert(err.message)
      })
      this.next(2)
    }
  }



}
