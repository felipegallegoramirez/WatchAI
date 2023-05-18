import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { environment } from "../../../environments/environment"

import { User } from "../../models/user";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ UserService]
})
export class EditComponent implements OnInit {

  constructor(private userService:UserService) { }


  // TODO: Rellena el campo email
  ngOnInit(): void {
    if(localStorage.getItem("id")== null){
      window.location.replace(`${environment.baseUrl}landing`);
    }
    this.userService.getUser().subscribe(res=>{
      let email = (<HTMLInputElement>document.getElementById("email"))
      email.value=res.email
    })
    this.dinamic("😜 Soy batman 🦇","")
  }
  // TODO: Verifica el email y la contraseña y procede a enviar la peticion
  edit(){
    let email = (<HTMLInputElement>document.getElementById("email")).value
    let password = (<HTMLInputElement>document.getElementById("password")).value
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if (!emailRegex.test(email)){
      alert("correo invalido")
    }
    else if(password.length>0){
      if(!strongRegex.test(password)){
        alert(`Minimo una Mayuscula, 
        Minimo una minuscula,
        Minimo un numero,
        Minimo un Simbolo especial`)
      }
      else{
        let x = new User(undefined,email,password)
        this.userService.putUser(x).subscribe(res=>{
          window.location.replace(`${environment.baseUrl}list`);
        },err=>{
          alert(err.message)
        })
      }
    }
    else{
      let x = new User(undefined,email,password)
      this.userService.putUser(x).subscribe(res=>{
        window.location.replace(`${environment.baseUrl}list`);
      },err=>{
        alert(err.message)
      })
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

}
