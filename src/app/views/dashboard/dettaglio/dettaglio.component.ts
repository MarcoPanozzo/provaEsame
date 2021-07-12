import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { BaseResponseDto } from '../../../interfaces/baseResponseDto';
import { ConsumiDto } from '../../../services/consumiService';
import { NastriDto, NastriService } from '../../../services/nastriService';
import { VelocitaDto } from '../../../services/velocitaService';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss'],
  providers: [MessageService, DatePipe]
})
export class DettaglioComponent implements OnInit {

  nastro: NastriDto;
  velocita: VelocitaDto[];
  consumi: ConsumiDto[];
  loading: boolean = true;
  id: number;
  columnsVelocita: any[] = [
    {
      header: "Orario",
      field: "orario"
    },
    {
      header: "Velocità",
      field: "velocitaAlMin"
    }
  ];
  columnsConsumi: any[] = [
    {
      header: "Orario",
      field: "orario"
    },
    {
      header: "Consumo",
      field: "consumo"
    }
  ];
  errors: any[] = [];

  constructor(
    private nastriService: NastriService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    console.log("dettaglio");
    this.route.params.subscribe(values => {
      this.id = Number.parseInt(values['id']);
    });
  }

  load() {
    this.nastriService.getById(this.id).subscribe((resp: BaseResponseDto<NastriDto>) => {
      if (resp.status == 200 && resp.success) {
        this.nastro = resp.response;
        this.velocita = this.nastro.velocita;
        this.velocita.forEach(v => {
          v.orario = this.datePipe.transform(v.orario, "dd/MM/yyyy HH:mm:ss")
        });
        this.consumi = this.nastro.consumi;
        this.consumi.forEach(c => {
          c.orario = this.datePipe.transform(c.orario, "dd/MM/yyyy HH:mm:ss")
        });
      }
      if (resp.error) {
        this.errors.push("Si è verificato un errore");
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Si è verificato un problema',
          detail: 'Impossibile caricare il nastro'
        });
      }
      this.loading = false;
    });
  }

}
