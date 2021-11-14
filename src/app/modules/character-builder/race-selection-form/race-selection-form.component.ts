import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {RaceService} from "../services/race-service/race.service";
import {Race} from "../model/race/race";
import {Constants} from "../../../shared/constants/constants";
import {MatTableDataSource} from "@angular/material/table";
import {Source} from "../model/source/source-model";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-race-selection-form',
  templateUrl: './race-selection-form.component.html',
  styleUrls: ['./race-selection-form.component.css']
})
export class RaceSelectionFormComponent implements OnInit {

  @Input() characterBuilderForm: FormGroup;

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ToastContainerDirective, {static: true}) private toastContainer: ToastContainerDirective;

  races: Race[];
  sourcesAllowed: Source[];
  private searchTableDataSource: MatTableDataSource<Race>;
  private searchTablePropertyMapping = Constants.classLevelManagerSearchTableColumnsMapping();

  constructor(private raceService: RaceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setSources();
    this.toastr.overlayContainer = this.toastContainer;
  }

  setSources() {
    this.characterBuilderForm.get(Constants.SOURCES_SELECTED).valueChanges.subscribe(value => {
      this.sourcesAllowed = value;
      this.fetchFirstPageOfRacesForSourcesProvided();
    })
  }

  private fetchFirstPageOfRacesForSourcesProvided() {
    this.raceService.getRacesForSources(this.sourcesAllowed).subscribe(res => {
        this.searchTableDataSource = new MatTableDataSource<Race>(res);
        this.searchTableDataSource.paginator = this.paginator;
        this.searchTableDataSource.sort = this.sort;
        this.setSortingDataAccessorForSearchTable();
        this.searchTableDataSource.filterPredicate = this.createFilter();
      },
      error => this.toastr.error(error.message, Constants.GENERIC_ERROR_TITLE));
  }

  private setSortingDataAccessorForSearchTable() {
    this.searchTableDataSource.sortingDataAccessor = (race, property) => {
      return race[this.searchTablePropertyMapping.get(property)];
    }
  }

  createFilter(): (data: any, filter: string) => boolean {
    return function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.source.readable.toLowerCase().indexOf(searchTerms.source) !== -1;
    };
  }

}
