import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {
listTarjeta: any[] = [

];

form: FormGroup;

constructor(private fb: FormBuilder,private toastr: ToastrService,
  private _tarjetaService: TarjetaService
  ) {
  this.form = this.fb.group({
    titulo: ['',Validators.required],
    numeroTarjeta: ['',[Validators.required, Validators.maxLength(16),Validators.minLength(16)]],
    fechaExpiracion: ['',[Validators.required]],
    cvv: ['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]],


  })


}
ngOnInit(): void {
this.obtenerTarjetas();
}

obtenerTarjetas(){

  this._tarjetaService.getListTarjetas().subscribe(data => {
    this.listTarjeta = data ;
  },error => {
    console.log(error);

  })
}


agregarTarjeta(){
  const tarjeta: any ={
    titulo: this.form.get('titulo')?.value,
    numeroTarjeta: this.form.get('numeroTarjeta')?.value,
    fechaExpiracion: this.form.get('fechaExpiracion')?.value,
    cvv: this.form.get('cvv')?.value,

  }
  this.listTarjeta.push(tarjeta);
  this.toastr.success('Tarjeta Registrada', 'Tarjeta registrada');
  this.form.reset();

}

eliminarTarjeta(id: number){
  this._tarjetaService.deletearjeta(id).subscribe(data =>{
    this.toastr.error('Tarjeta Eliminada con exito', 'Tarjeta Eliminada');
    this.obtenerTarjetas();
  },error => {
    console.log(error);
  })

}



}
