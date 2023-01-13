import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {
listTarjeta: any[] = [
  { titulo: 'asas',numeroTarjeta: '3243434324',fechaExpiracion: '11/28', cvv:'233'},
  { titulo: 'assdsdas',numeroTarjeta: '2132323323',fechaExpiracion: '09/28', cvv:'554'},
  { titulo: 'sadasd',numeroTarjeta: '43543545435',fechaExpiracion: '07/28', cvv:'432'},


];

form: FormGroup;

constructor(private fb: FormBuilder,private toastr: ToastrService) {
  this.form = this.fb.group({
    titulo: ['',Validators.required],
    numeroTarjeta: ['',[Validators.required, Validators.maxLength(16),Validators.minLength(16)]],
    fechaExpiracion: ['',[Validators.required]],
    cvv: ['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]],


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

eliminarTarjeta(index: number){
  this.listTarjeta.splice(index, 1);
  this.toastr.error('Tarjeta Eliminada con exito', 'Tarjeta Eliminada');

}



}
