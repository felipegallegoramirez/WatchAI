import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LadingComponent } from './components/lading/lading.component';
import { ListComponent } from './components/list/list.component';
import { VisualizeComponent } from './components/visualize/visualize.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverComponent } from './components/recover/recover.component';
import { EditComponent } from './components/edit/edit.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [  
  { path: '', component: LadingComponent },
  { path: 'login-register', component: RegisterComponent },
  { path: 'landing', component: LadingComponent },
  { path: 'list', component: ListComponent },
  { path: 'video/:id', component: VisualizeComponent },
  { path: 'porfile', component: EditComponent },
  { path: 'recover/:id', component: RecoverComponent },
  { path: 'upload', component: UploadComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    LadingComponent,
    ListComponent,
    VisualizeComponent,
    RegisterComponent,
    RecoverComponent,
    EditComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash:true}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
