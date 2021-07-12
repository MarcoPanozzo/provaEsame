import { Injectable } from "@angular/core";

export interface SezioniDto {
    sezioneId: number;
    descrizione: string;
}

@Injectable({
    providedIn: 'root'
})
export class SezioniService {

}