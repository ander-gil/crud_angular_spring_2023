import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();

   titulo: String = "Formulario de clientes";
   public errores?:string[]=[];

  constructor(private clienteservice:ClienteService,
              private router:Router,
              private activateroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

 

  cargarCliente(){
    this.activateroute.params
    .subscribe(params=>{
      let id = params['id'];
      if(id){
        this.clienteservice.getCliente(id)
        .subscribe(cliente=>{
          this.cliente = cliente;
        })
      }
    })
  }

  public create(): void {
  this.clienteservice.create(this.cliente)
  .subscribe({
    next: (respForm) => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Nuevo cliente',
        text: 'Cliente ' + this.cliente.nombre + ' creado con exito!',
        icon: 'success'
      })
    },
    error: (err) => {
      this.errores = this.clienteservice.getErrores();      
    }
  })

}


  update(): void{
    this.clienteservice.update(this.cliente)
    .subscribe({
      next:(respForm)=>{
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Cliente actualizado',
          text: 'Cliente ' + this.cliente.nombre + ' actualizado con exito!',
          icon: `success`
        })
      },
      error: (err)=>{
        this.errores = this.clienteservice.getErrores();
      }

      })
  }



}
