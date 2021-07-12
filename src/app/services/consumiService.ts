import { Injectable } from "@angular/core";

export interface ConsumiDto {
    consumoId: number;
    consumo: number;
    nastroId: number;
    orario: any;
}

@Injectable({
    providedIn: 'root'
})
export class ConsumiService {
    
}