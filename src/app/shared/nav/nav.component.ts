import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../auth/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser: User = null;

  constructor(private userService:UserService, private authService:AuthService) {}

  ngOnInit(): void {
      this.userService.currentUserSubject.subscribe((user:User)=>{
        this.currentUser = user;
      })
  }

  onLogout() {
    this.authService.logout();
  }



}
