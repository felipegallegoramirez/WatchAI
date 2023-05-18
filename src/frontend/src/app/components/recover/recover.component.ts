import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment"
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
  providers: [ UserService]
})
export class RecoverComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, private userService:UserService) { }
  ola:any={
    "password":"asd"
  }
  id:string=""


  // TODO: Coge el codigo /:id de la url
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id']
    })
    this.dinamic("No la olvides 🤨","")
  }

  // TODO: Verifica la contraseña y genera la peticion
  change(){
    let password = (<HTMLInputElement>document.getElementById("password")).value
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(!strongRegex.test(password)){
      alert(`Minimo una Mayuscula, 
      Minimo una minuscula,
      Minimo un numero,
      Minimo un Simbolo especial`)
    }else{
    this.ola.password=password
    this.userService.postRecover(this.ola,this.id).subscribe(res=>{
      window.location.replace(`${environment.baseUrl}landing`);
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
