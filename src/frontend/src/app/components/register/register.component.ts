import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { VideoService } from '../../services/video.service'
import { environment } from "../../../environments/environment"

import { User } from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService,VideoService ]
})
export class RegisterComponent implements OnInit {

  constructor( private userService:UserService, private videoService:VideoService) { }

  ngOnInit(): void {
    this.titleText(0)
  }

  // Variable que comprueba si la cuenta existe para mostrar el texto "Recupera Contraseña" 
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

  //! title

  titleText(position:number){

    switch (position) {
      case 0:
        this.dinamic("Hola,Tu amaras esto 😎","")
        break;
      case 1:
        this.dinamic("Tengo mis ojos cerrados 🙈","Hola,Tu amaras esto 😎")
        break;
      case 2:
        this.dinamic("Que gran titulo 🤩","Tengo mis ojos cerrados 🙈")
        break
      case 3:
        this.dinamic("Esto es increible 😲","Que gran titulo 🤩")
        break;
      case 4:
          this.dinamic("Lo estamos revisando 🤖","Esto es increible 😲")
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


  // ! register

  // TODO: Verifica el email
  email(){
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if (!emailRegex.test(email)){
      alert("correo invalido")
    }else{
      // * Verifica si el correo existe para mostrar "Recuperar contraseña"
      this.userService.getExist(email).subscribe((res) =>{
        this.exist=  res.exist
        this.next(1)
      },err=>{
        alert(err.message)
      })

    }

    
  }

  // TODO: Verifica el email y la contraseña y procede a enviar la peticion
  register(){
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    if (!emailRegex.test(email)){
      alert("correo invalido")
    }
    else if(!strongRegex.test(password)){
      alert(`Minimo una Mayuscula, 
      Minimo una minuscula,
      Minimo un numero,
      Minimo un Simbolo especial`)
    }
    else{
      let x = new User(undefined,email,password)
      this.userService.postLogin(x).subscribe((res) =>{
        let id=res.id || 0 
        localStorage.setItem('id',id.toString());
        localStorage.setItem('token',res.code);
        this.next(2)
      })
    }
  }
  // ! Title

  // TODO: Verifica el titulo 
  title(){
    var title = (<HTMLInputElement>document.getElementById("title")).value;
    if(title.length>25 ||title.length<3){
      alert("El titulo debe tener entre 3 y 25 caracteres")
    }else{
      this.next(3)
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
          window.location.replace(`${environment.baseUrl}/video/${res.id}`);
      },err=>{
        alert(err.message)
      })
      this.next(4)
    }
  }

  //TODO: Si se clickea hace la peticion para generar el codigo
  recuperar(){
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    this.userService.getRecoverUser(email).subscribe((res) =>{
      alert("Verifica el correo 😊")
    },err=>{
      alert(err.message)
    })
  }

}
