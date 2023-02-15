import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  public paginador: any;

  constructor(private clienteService: ClienteService,
              private activateroute: ActivatedRoute) { }

  ngOnInit() {
    this.activateroute.params.
      subscribe(params => {
        let page = params['page'];
        (!page)? page = 0 : page = page;
        this.clienteService.getClientes(page).
          pipe(
            tap((response) => {
              console.log(response);
            }),
          )
          .subscribe(response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          })
      })
  }

  delete(cliente: Cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente? ${cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id || 0)
          .subscribe(response => {
            this.clientes = this.clientes.filter(client => client !== cliente)
          })
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Cliente eliminado con éxito.',
          'success'
        )
      }
    })
  }


}
