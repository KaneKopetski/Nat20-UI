import {Component, OnInit, ViewChild} from '@angular/core';
import {RaceService} from "../services/race-service/race.service";
import {Race} from "../model/race/race";
import {Constants} from "../../../shared/constants/constants";
import {MatTableDataSource} from "@angular/material/table";
import {Source} from "../model/source/source-model";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CharacterClass} from "../model/character-class/character-class";
import {MatDialog} from "@angular/material/dialog";
import {RaceDetailComponent} from "../race-detail/race-detail.component";
import {CharacterBuilderFormService} from "../services/characer-builder-form-service/character-builder-form.service";

@Component({
  selector: 'app-race-selection-form',
  templateUrl: './race-selection-form.component.html',
  styleUrls: ['./race-selection-form.component.css']
})
export class RaceSelectionFormComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ToastContainerDirective, {static: true}) private toastContainer: ToastContainerDirective;

  sourcesAllowed: Source[];
  searchTableDataSource: MatTableDataSource<Race>;
  private searchTablePropertyMapping = Constants.raceSearchTableColumnsMapping();
  searchTableColumnsToDisplay: string[] = Constants.raceSearchTableColumnsToDisplay;
  raceSelected: number;

  constructor(private raceService: RaceService, private toastr: ToastrService, private dialog: MatDialog, public cbFormService: CharacterBuilderFormService) { }

  ngOnInit(): void {
    this.setSources();
    this.toastr.overlayContainer = this.toastContainer;
  }

  setSources() {
    this.cbFormService.characterBuilderForm.get(Constants.SOURCES_SELECTED).valueChanges.subscribe(value => {
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
      },
      error => this.toastr.error(error.message, Constants.GENERIC_ERROR_TITLE));
  }

  private setSortingDataAccessorForSearchTable() {
    this.searchTableDataSource.sortingDataAccessor = (race, property) => {
      return race[this.searchTablePropertyMapping.get(property)];
    }
  }

  selectRace(race) {
    this.raceSelected = race.id;
    this.cbFormService.characterBuilderForm.get('raceSelected').setValue(race);
  }

  openDialog(row: CharacterClass) {
    this.dialog.open(RaceDetailComponent, {
      data: row,
      width: '90%'
    });
  }
}
