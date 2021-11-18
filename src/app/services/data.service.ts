import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { GlobalService } from '../global.service';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'my-auth-token'
//     })
// };

export class DataService<T> {
    constructor(
        protected httpClient: HttpClient,
        protected endPoint: string,
    ) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        })
    };


    // Obtiene todos los objetos
    public getAll$(): Observable<any> {
        return this.httpClient.get<any>(this.endPoint, this.httpOptions);
        // return this.httpClient.get<any>(this.endPoint, { observe: 'response' });
    }

    public postImagen$(vc_imagen: any): Observable<Blob> {
        // console.log('vc_imagen data service: ' + (this.env + vc_imagen));
        return this.httpClient.post<Blob>(this.endPoint + vc_imagen, { responseType: 'blob' as 'json' });
        // return this.httpClient.get<Blob>(this.env + vc_imagen, { responseType: 'blob' as 'json' });
    }

    // Obtiene un objeto por filtros
    public getWithQuery$(params: any): Observable<any> {
        return this.httpClient.get<T>(this.endPoint, { params: params, headers: this.httpOptions.headers });
    }

    // Obtiene un objeto por id
    public getById$(id: string): Observable<any> {
        return this.httpClient.get<T>(`${this.endPoint}/${id}/`);
    }

    public getWithPost$(params: any): Observable<any> {
        return this.httpClient.post<T>(this.endPoint, params);
    }

    public setFileWithPost$(formData: FormData): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            })
        };
        return this.httpClient.post<T>(this.endPoint, formData);
    }

    // Agrega un nuevo objeto
    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }

    // Actualiza el objeto parcialmente
    public patch$(id: string, partialEntity: T): Observable<T> {
        return this.httpClient.patch<T>(`${this.endPoint}/${id}/`, partialEntity);
    }

    // Actualiza toda el objeto
    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}/${id}/`, entity);
    }

    // Elimina un objeto
    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}/`);
    }


    public obtenerToken$(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded"
            })
        };

        const httpBoody = new URLSearchParams();
        httpBoody.append('username', 'appDSDRenovacion');
        httpBoody.append('password', '$2a$10$YVqdOqpbTglvx3.MPFKAf.0L.u0GSFYQtdCpm8pmAfVxYJ9cB8Gmq');
        httpBoody.append('grant_type', 'password');
        httpBoody.append('client_id', 'sel');
        httpBoody.append('client_secret', '$2a$10$0YL0Sl6U0IxPl5viuRyRZ.xGa4Va3tG0LcPv0sT8nHfotKngQMn2W');
        return this.httpClient.post<T>(this.endPoint, httpBoody.toString(), httpOptions);
    }
}
