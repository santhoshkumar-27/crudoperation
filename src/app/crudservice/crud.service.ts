import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  // postEmployee(data: {id: number, title: string, firstName:string, lastName:string, email:string, gender:string, mobile:string}[]){
  //   return this.http.post<{id: number, title: string, firstName:string, lastName:string, email:string, gender:string, mobile:string}[]>('http://localhost:3000/userlist', data).pipe(map((res:any)=>{return res}))
  // }
  
  postEmployee(data:any){
    return this.http.post<any>('http://localhost:3000/userlist', data).pipe(map((res:any)=>{return res}))
  }
  getEmployee(){
    return this.http.get<any>('http://localhost:3000/userlist').pipe(map((res:any)=>{return res}))
  }
  updateEmployee(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/userlist/'+id,data).pipe(map((res:any)=>{return res}))
  }
  deleteEmployee(id: number){
    return this.http.delete<any>('http://localhost:3000/userlist/'+id).pipe(map((res:any)=>{return res}))
  }
}
