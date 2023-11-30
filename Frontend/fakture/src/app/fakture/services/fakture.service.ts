import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FaktureService {
  

  constructor(private http:HttpClient) { }
  
  getFakture(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get('https://localhost:44354/Products/Get',{headers:headers})
  }

  deleteFaktura(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`https://localhost:44354/Products/DeleteInvoice?fakturaId=${id}`,{headers:headers})
  }
  createFaktura(data:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`https://localhost:44354/Products/PostInvoice`,data,{headers:headers});
    
  }
  getFakturaId(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`https://localhost:44354/Products/GetId?fakturaId=${id}`,{headers:headers});
  }
  getArtikalId(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`https://localhost:44354/Products/GetItemId?aritkalId=${id}`,{headers:headers});
  }
  deleteArtikalId(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`https://localhost:44354/Products/DeleteItem?artikalId=${id}`,{headers:headers});
  }
  updateArtikalId(data:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`https://localhost:44354/Products/PutItem`,data,{headers:headers});
  }
  createArtikal(fakId:number,data:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`https://localhost:44354/Products/PostItem?fakturaId=${fakId}`,data,{headers:headers});
  }
  updateFaktura(data:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`https://localhost:44354/Products/PutInvoice`,data,{headers:headers});
  }
}
  

