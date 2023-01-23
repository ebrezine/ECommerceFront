import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  YourInfo?:User;
  email='';
  question='abc';
  answer?:string;
  password='';
  confirmPassword='';
  questionVisibility = false;
  emailVisibility = true;
  errorVisibility = false;
  newPasswordVisibility = false;
  emailErrorVisibility = false;
  notConfirmedVisibility = false;
  confirmedVisibility = false;


  constructor(private authService:AuthService,private router:Router) { }

  
  ngOnInit(): void {
    
  }

  getInfo() {
    if (this.email == null) {
      console.log("Bad Request");
    }
    this.authService.getUserByEmail(this.email).subscribe({
      next:(data:User)=> {
        this.YourInfo = data;
        this.question = data.question;
          this.questionVisibility=true;
          this.emailVisibility=false;
          this.emailErrorVisibility = false;
      }, 
      error:(error)=>{
        console.log("Unable to get user information: "+error);
        this.emailErrorVisibility = true;
      }
    });
  }
  
  compare() {
    if (this.YourInfo?.answer != this.answer) {
      this.errorVisibility = true;
    } else {
      this.errorVisibility = false;
      this.questionVisibility = false;
      this.newPasswordVisibility = true;
    }
  }
  
  changePassword(): void  {
    if (this.password != this.confirmPassword) {
      console.log(this.password);
      console.log(this.confirmPassword);
      this.notConfirmedVisibility = true;
      return;
    }
    this.authService.changePassword(this.YourInfo?.email,this.password).subscribe({
       next:()=>{
        console.log("Success");
        this.notConfirmedVisibility = false;
        this.confirmedVisibility = true;
        setTimeout(()=> {
          this.router.navigate(["/login"]);
        }, 1000)
       },
       error:()=>{
        console.log("Error");
       }
   });
  }

goBack(): void {
  this.router.navigate(["/login"]);
}
}
