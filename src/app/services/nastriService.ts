import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ConsumiDto } from "./consumiService";
import { SezioniDto } from "./sezioniService";
import { VelocitaDto } from "./velocitaService";

export interface NastriDto {
    nastroId: number;
    descrizione: string;
    posizione: string;
    sezione: SezioniDto;
    velocita: VelocitaDto[];
    consumi: ConsumiDto[];
}

@Injectable({
    providedIn: 'root'
})
export class NastriService {

    constructor(
        private http: HttpClient
    ) {

    }

    getAll(page: number, resultsPerPage: number, sort: any): Observable<any> {
        const url = environment.host + environment.endpoint.nastri 
        '?page=' + (Number.isNaN(page) ? 0 : page - 1) +
        (resultsPerPage !== null ? '&resultsPerPage=' + resultsPerPage : '') +
        (sort ? '&order=' + sort : '');

        return this.http.get(url);
    }

    getById(id: number) {
        const url = environment.host + environment.endpoint.nastri + id;
        return this.http.get(url);
    }
    
}