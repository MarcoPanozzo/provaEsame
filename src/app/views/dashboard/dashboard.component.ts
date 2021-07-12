import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { BaseResponseDto } from '../../interfaces/baseResponseDto';
import { PageableDto } from '../../interfaces/pageableDto';
import { DatePipe } from '@angular/common';
import { NastriDto, NastriService } from '../../services/nastriService';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DatePipe, MessageService]
})
export class DashboardComponent implements OnInit {

  nastri: any[] = [];
  page: number = 1;
  resultsPerPage: number = 10;
  totalRecords: number;
  loading: boolean = true;
  first: number = 0;
  rowId: string = "nastroId";
  lastLazyLoad: LazyLoadEvent = null;
  request: any = null;
  columns: any[] = [
    {
      header: "ID",
      field: "nastroId"
    },
    {
      header: "Descrizione",
      field: "descrizione"
    },
    {
      header: "Posizione",
      field: "posizione"
    },
    {
      header: "Sezione",
      field: "sezione"
    }
  ];
  errors: any[] = [];

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private nastriService: NastriService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  load(event: LazyLoadEvent = null) {
    if (event === null) {
      event = this.lastLazyLoad;
    }

    this.loading = true;
    this.lastLazyLoad = event;

    if (this.request) {
      this.request.unsubscribe();
    }

    this.nastriService.getAll(
      this.page,
      this.resultsPerPage,
      this.orderService.parse(event)
    ).subscribe((resp: BaseResponseDto<PageableDto<NastriDto[]>>) => {
      if (resp.status == 200 && resp.success) {
        this.nastri = resp.response.data;
        this.totalRecords = resp.response.totalCount;
        this.resultsPerPage = resp.response.resultsPerPage;
        event.rows = resp.response.resultsPerPage;
        event.first = 0;
      }
      if (resp.error) {
        this.errors.push("Si è verificato un errore");
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Si è verificato un problema',
          detail: 'Impossibile caricare i nastri'
        });
      }
      this.loading = false;
    });
  }

  onPage(event) {
    this.page = event.first / event.rows + 1;
    this.load();
  }

  onClick(nastro: NastriDto) {
    console.log(nastro);
    this.router.navigate(["dashboard", nastro.nastroId]);
  }

  getStato(nastro: NastriDto) {
    if (nastro.consumi.length > 0) {
      return "Attenzione ai consumi";
    } else {
      return "Tutto ok";
    }
  }

}
