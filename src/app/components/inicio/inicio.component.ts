import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvanzadaService } from 'src/app/services/avanzada.service';
import { SimpleService } from 'src/app/services/simple.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  frmSimple = this.formBuilder.group({
    vcTexto: ['', ],
  });

  frmAvanzado = this.formBuilder.group({
    vcNombreComercial: ['', ],
    vcDocIdentidad: ['', ],
    vcExpediente: ['', ],
    vcNumeroResComision: ['', ],
    vcNumeroResSala: ['', ],
  });


  lstInfractorSimple: any[]=[];
  lstInfractorAvanzado: any[]=[];

  isShowTable: boolean = false;
  isShowAll: boolean = false;
  idShow: any = -1;


  paginaActualSimple :number=1;
  paginaActualAvanzado :number=1;

  showTab1: boolean=true;
  showTab2: boolean=false;



  constructor(    private router: Router,
                  private route: ActivatedRoute,
                  private _avanzadaService: AvanzadaService,
                  private _simpleService: SimpleService,
                  private formBuilder: FormBuilder,
                  private _spinner: NgxSpinnerService,
                  private tokenService : TokenService,
                  private toastr: ToastrService,
                  ) {
                    this.obtenerToken();
                   }

  // vcManual: string;


  ngOnInit() {

  }

  imprimir() {
    window.print();
  }

  selectTab(valor : number){
    // console.log("valor="+valor)
    switch(valor){
      case 1:
        this.showTab1=true;
        this.showTab2=false;
        break;
      case 2:
        this.showTab1=false;
        this.showTab2=true;
        break;
    }
  }

  showOne(id: any) {
    if (this.idShow == id) {
      this.idShow = -1;
    } else {
      this.idShow = id;
    }
  }

  showAll() {
    this.isShowAll = !this.isShowAll;
  }

  obtenerToken() {

    this._spinner.show();
      this.tokenService.obtenerToken$().subscribe(
        resp => {
          this._spinner.hide();
          if (resp.access_token) {
            //console.log(resp.access_token);
            sessionStorage.setItem("access_token", resp.access_token);
          }
        },
        error => {
          this._spinner.hide();
        },
      );

  }

  doBusSimple(){
    this._spinner.show();
    let param={
      vcRazonSocial:this.frmSimple.value.vcTexto
    }
    this._simpleService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstInfractorSimple=resp.lstInfractor;
        if(this.lstInfractorSimple.length>1){
          this.toastr.success('Hello world!', 'Toastr fun!');
        }else{
          this.toastr.warning('Hello world!', 'Toastr fun!');
        }
      },
      error=>{
        this._spinner.hide();
        this.toastr.warning('Hello world!', 'Toastr fun!');
      }
    );
  }

  doBusAvanzada(){
    this._spinner.show();
    let param={
      vcNombreComercial: this.frmAvanzado.value.vcNombreComercial,
      vcDocIdentidad: this.frmAvanzado.value.vcDocIdentidad,
      vcExpediente: this.frmAvanzado.value.vcExpediente,
      vcNumeroResComision: this.frmAvanzado.value.vcNumeroResComision,
      vcNumeroResSala: this.frmAvanzado.value.vcNumeroResSala,
    }
    this._avanzadaService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstInfractorAvanzado=resp.lstInfractor;
      },
      error=>{
        this._spinner.hide();
        // this.validarFormulario();
      }
    );
  }

}
