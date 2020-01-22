import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { INfrCategory } from '../../shared/model/nfr-category.model';
import { ThrowStmt } from '@angular/compiler';
import { PagerService } from '../../shared/service/pager.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {

  constructor(
  ) {

  }



  ngOnInit() {


  }
}
