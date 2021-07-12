import { Injectable } from "@angular/core";

export interface VelocitaDto {
    velocitaId: number;
    nastroId: number;
    orario: any;
    velocitaAlMin: number;
}

@Injectable({
    providedIn: 'root'
})
export class VelocitaService {
    
}