import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-banner-principal',
  templateUrl: './banner-principal.component.html',
  styleUrls: ['./banner-principal.component.css']
})
export class BannerPrincipalComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
  }

  goToInicio(){
    window.location.reload();
  }
}
