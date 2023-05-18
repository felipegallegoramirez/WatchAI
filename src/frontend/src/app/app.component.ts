import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WatchAI';


  // TODO: Para ocultar la barra de nav
  nav:number=0
  ocult(){
    let r= document.getElementById("nav")
    if(this.nav==0){
      r?.classList.remove("ocult")
      this.nav=1
    }else{
      r?.classList.add("ocult")
      this.nav=0
    }
  }

}
