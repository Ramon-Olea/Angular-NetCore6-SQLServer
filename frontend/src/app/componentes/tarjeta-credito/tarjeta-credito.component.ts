import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  accion = "agregar";
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private _tarjetaService: TarjetaService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],


    })


  }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {

    this._tarjetaService.getListTarjetas().subscribe(data => {
      this.listTarjeta = data;
    }, error => {
      console.log(error);

    })
  }


  agregarTarjeta() {
    const tarjeta: any = {
      titulo: this.form.get('titulo')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,

    }
    if (this.id == undefined) {
      /* AGREGAR */
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('Tarjeta Registrada', 'Tarjeta registrada');
        this.form.reset();
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })

    } else {
      /* editar */
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Tarjeta actualizada', 'Tarjeta actualizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }


  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('Tarjeta Eliminada con exito', 'Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    })

  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'EDITAR';
    this.id = tarjeta.id;
    this.form.patchValue({
      titulo: tarjeta.titulo,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })



  }

}
