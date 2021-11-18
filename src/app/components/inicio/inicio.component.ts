import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvanzadaService } from 'src/app/services/avanzada.service';
import { SimpleService } from 'src/app/services/simple.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';


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

  blBotonBuscarSimple : boolean=false;

  blBotonBuscarAvanzado : boolean=false;



  constructor(    private router: Router,
                  private route: ActivatedRoute,
                  private _avanzadaService: AvanzadaService,
                  private _simpleService: SimpleService,
                  private formBuilder: FormBuilder,
                  private _spinner: NgxSpinnerService,
                  private tokenService : TokenService,
                  private toastr: ToastrService,
                  private _excelService : ExcelService
                  ) {
                    this.obtenerToken();
                   }

  // vcManual: string;


  ngOnInit() {

  }


  doValidarSimple(){
    let blBotonBuscarSimple=false;
    if(!!this.frmSimple.value.vcTexto && this.frmSimple.value.vcTexto.length>1){
      blBotonBuscarSimple=true;
    }else{
      blBotonBuscarSimple=false;
    }
    return blBotonBuscarSimple;
    }

  doValidarAvanzado(){
    let blBotonBuscarAvanzado=false;
    if(!!this.frmAvanzado.value.vcNombreComercial && this.frmAvanzado.value.vcNombreComercial.length>1){
      blBotonBuscarAvanzado=true;
    }else{
      if(!!this.frmAvanzado.value.vcDocIdentidad && this.frmAvanzado.value.vcDocIdentidad.length>8){
        blBotonBuscarAvanzado=true;
      }else{
        if(!!this.frmAvanzado.value.vcExpediente && this.frmAvanzado.value.vcExpediente.length>2){
          blBotonBuscarAvanzado=true;
        }else{
          if(!!this.frmAvanzado.value.vcNumeroResComision && this.frmAvanzado.value.vcNumeroResComision.length>2){
            blBotonBuscarAvanzado=true;
          }else{
            if(!!this.frmAvanzado.value.vcNumeroResSala && this.frmAvanzado.value.vcNumeroResSala.length>2){
              blBotonBuscarAvanzado=true;
            }else{
              blBotonBuscarAvanzado=false;
            }
          }
        }
      }
    }

    return blBotonBuscarAvanzado;
  }

  bindEventsForm() {
    this.frmAvanzado.valueChanges.subscribe(value => {
      this.doValidarAvanzado();
    });
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
    if(this.doValidarSimple()){
    this._spinner.show();
    let param={
      vcRazonSocial:this.frmSimple.value.vcTexto
    }
    this._simpleService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstInfractorSimple=resp.lstInfractor;

        if(this.lstInfractorSimple.length>0){
          this.toastr.success('Se han encontrado '+this.lstInfractorSimple.length+' resultados', 'Información');
        }else{
          this.toastr.warning('No se ha encontrado ningun resultado', 'Información');
        }

      },
      error=>{
        this._spinner.hide();
        this.toastr.error('Tenemos un problema con el servicio, intentelo nuevamente en unos minutos', 'Información');
      }
    );
    }else{
      this.toastr.warning('Ingrese al menos 2 caracteres', 'Información');
    }
  }

  doBusAvanzada(){
    if(this.doValidarAvanzado()){
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

        if(this.lstInfractorAvanzado.length>0){
          this.toastr.success('Se han encontrado '+this.lstInfractorAvanzado.length+' resultados', 'Información');
        }else{
          this.toastr.warning('No se ha encontrado ningún resultado', 'Información');
        }
      },
      error=>{
        this._spinner.hide();
        this.toastr.error('Tenemos un problema con el servicio, intentelo nuevamente en unos minutos', 'Información');
      }
    );
    }else{
      this.toastr.warning('Debe ingresar almenos un parametro', 'Información');
    }
  }

  exportAsXLSXSimple():void {
    let lstReporteExcel : any=[];
    for(let i=0; i<this.lstInfractorSimple.length; i++){
      let objExcel : any={}

      objExcel.NRO=i+1;
      objExcel.NRO_EXPEDIENTE=this.lstInfractorSimple[i].vcExpediente;
      objExcel.DOC_IDENTIDAD=this.lstInfractorSimple[i].vcDocIdentidad.replace("<b>", '').replace("</b>", ': ');
      objExcel.SANCIONADO=this.lstInfractorSimple[i].vcNombreComercial;
      objExcel.SANCION='N° DE UIT: '+this.lstInfractorSimple[i].vcTotalMontoUit;
      objExcel.ESTADO_DEUDA=this.lstInfractorSimple[i].vcEstadoDeuda;
      objExcel.MATERIA=this.lstInfractorSimple[i].vcSubMateria;
      objExcel.NRO_RESOL_CDA=this.lstInfractorSimple[i].vcNumeroResComision;
      objExcel.FECHA_RESOL_CDA=this.lstInfractorSimple[i].vcFechResComision;
      objExcel.NRO_RESOL_SPI=this.lstInfractorSimple[i].vcNumeroResSala;
      objExcel.FECHA_RESOL_SPI=this.lstInfractorSimple[i].vcFechResSala;

      lstReporteExcel.push(objExcel);
    }

    if(lstReporteExcel.length>0)
     this._excelService.exportAsExcelFile(lstReporteExcel, 'Búsqueda simple');
     else
     this.toastr.warning('No se han encontrado registros para exportar', 'Información');

  }

  exportAsXLSXSAvanzada():void {
    let lstReporteExcel : any=[];
    for(let i=0; i<this.lstInfractorAvanzado.length; i++){
      let objExcel : any={}

      objExcel.NRO=i+1;
      objExcel.NRO_EXPEDIENTE=this.lstInfractorAvanzado[i].vcExpediente;
      objExcel.DOC_IDENTIDAD=this.lstInfractorAvanzado[i].vcDocIdentidad.replace("<b>", '').replace("</b>", ': ');
      objExcel.SANCIONADO=this.lstInfractorAvanzado[i].vcNombreComercial;
      objExcel.SANCION='N° DE UIT: '+this.lstInfractorAvanzado[i].vcTotalMontoUit;
      objExcel.ESTADO_DEUDA=this.lstInfractorAvanzado[i].vcEstadoDeuda;
      objExcel.MATERIA=this.lstInfractorAvanzado[i].vcSubMateria;
      objExcel.NRO_RESOL_CDA=this.lstInfractorAvanzado[i].vcNumeroResComision;
      objExcel.FECHA_RESOL_CDA=this.lstInfractorAvanzado[i].vcFechResComision;
      objExcel.NRO_RESOL_SPI=this.lstInfractorAvanzado[i].vcNumeroResSala;
      objExcel.FECHA_RESOL_SPI=this.lstInfractorAvanzado[i].vcFechResSala;

      lstReporteExcel.push(objExcel);
    }

    if(lstReporteExcel.length>0)
     this._excelService.exportAsExcelFile(lstReporteExcel, 'Búsqueda avanzada');
     else
     this.toastr.warning('No se han encontrado registros para exportar', 'Información');

  }

}
