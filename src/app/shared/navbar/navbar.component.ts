import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLinkActive, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
