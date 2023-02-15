import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { Router } from '@angular/router';
import { CLIENTES } from './clientes.json';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl:String ="http://localhost:8080/api"
  private htttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  public errores: string[] = [];
  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};
  
  constructor(private http: HttpClient,
              private router:Router) { }

  getErrores(): string[] {
     return this.errores!;
  }

  
  getClientes(page: number):Observable<any>{
    const urlClient = `${this.apiUrl}/clientes/page/` + page;
    return this.http.get<any>(urlClient).
    pipe(
      tap((resp:any) => {
        console.log(urlClient);
        (resp.content as Cliente[]).forEach(cliente=>{
          console.log(cliente.nombre)
        })
      }),
      map((resp: any) =>{
        (resp.content as Cliente[]).map(cliente =>{
          cliente.apellido = cliente.apellido?.toLowerCase();
          return cliente;
        })
        return resp;
      })
      
    )}
  

  getCliente(id:number):Observable<Cliente>{
    const urlClient = `${this.apiUrl}/clientes`
    return this.http.get<Cliente>(`${urlClient}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(() => new Error(e.error.message));
      })
    );
  }

  update(cliente:Cliente):Observable<Cliente>{
    const urlClient = `${this.apiUrl}/clientes`
    return this.http.put<Cliente>(`${this.apiUrl}/clientes/${cliente.id}`, cliente, this.httpOptions).pipe(
      map((resp : any) => resp.data as Cliente),
      catchError(e => {
        if(e.status ==400){
          this.errores = e.error.errors as string[];
          return throwError(()=>new Error(e))
        }
        Swal.fire('Error al Editar el cliente', e.error.message, 'error');
        return throwError(() => new Error(e.error.message));
      })
    );
  }


  create(cliente:Cliente):Observable<Cliente>{    
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente, this.httpOptions).pipe(
      map((response: any)=>response.data as Cliente),
      catchError(e => {
        if(e.status ==400){
           this.errores = e.error.errors as string[];
           console.error(e.error.errors);
           return throwError(()=>{e})
        }

        Swal.fire('Error al crear el cliente', e.error.message, 'error');
        return throwError(() => new Error(e.error.message));
      })
    );
  }

  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.apiUrl}/clientes/${id}`, this.httpOptions).pipe(
      catchError(e => {
        Swal.fire('Error al crear el eliminar', e.error.message, 'error');
        return throwError(() => new Error(e.error.message));
      })
    )
  }

}
