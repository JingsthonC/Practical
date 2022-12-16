import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  faLock = faLock;
  constructor(private router: Router,
              private auth: AuthService) {
  }

  goBack() {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['login']);
    }
  }
}
