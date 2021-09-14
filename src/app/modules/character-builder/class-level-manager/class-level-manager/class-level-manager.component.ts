import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CharacterClassService} from '../../services/character-class-service/character-class.service';
import {Source} from '../../model/source/source-model';
import {CharacterClass} from '../../model/character-class/character-class';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {LevelClassPair} from '../../model/level-class-pair/level-class-pair-model';
import {Constants} from '../../../../shared/constants/constants';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CharacterClassDetailComponent} from '../character-class-detail/character-class-detail.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-class-level-manager',
  templateUrl: './class-level-manager.component.html',
  styleUrls: ['./class-level-manager.component.css']
})
export class ClassLevelManagerComponent implements OnInit, AfterViewInit {

  @Input() sourcesAllowed: any[];
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  classLevels: LevelClassPair[] = [];
  characterBuildData: FormGroup;
  searchTableColumnsToDisplay: string[] = ['name', 'hitDie', 'baseAttackBonusProgression', 'fortSaveProgression', 'reflexSaveProgression', 'willSaveProgression', 'add'];
  classLevelTableColumnsToDisplay: string[] = ['level', 'characterClass'];
  searchTableDataSource: MatTableDataSource<CharacterClass>;
  classLevelTableDataSource: MatTableDataSource<LevelClassPair>;
  babDisplayValues: Map<number, string> = new Map<number, string>([
    [1, 'Full'],
    [.75, 'Three-Quarters'],
    [.5, 'Half']
  ]);
  isExpanded: boolean = false

  constructor(private characterClassService: CharacterClassService, private toastr: ToastrService,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    this.characterBuildData = this.data;
    this.toastr.overlayContainer = this.toastContainer;
  }

  ngAfterViewInit(): void {
    this.fetchFirstPageOfClassesForSourcesProvided();
  }

  private fetchFirstPageOfClassesForSourcesProvided() {
    this.characterClassService.getClassesFromSources(this.prepareSources()).subscribe(res => {
        this.searchTableDataSource = new MatTableDataSource<CharacterClass>(res);
        this.searchTableDataSource.paginator = this.paginator;
      },
      error => this.toastr.error(error.message, 'Here be dragons?'));
  }

  private prepareSources() {
    if (!this.sourcesAllowed) {
      const sources: string[] = [];
      Constants.allSources.forEach((source: Source) => sources.push(source.sourceEnum));
      return sources;
    } else {
      return this.sourcesAllowed;
    }
  }

  removeClass(row) {

  }

  addClass(row) {
    let classLevel = {
      level: this.classLevels.length + 1,
      characterClass: row
    }
    this.classLevels.push(classLevel);
    this.classLevelTableDataSource = new MatTableDataSource<LevelClassPair>(this.classLevels);
  }

  openDialog(row: CharacterClass) {
    this.dialog.open(CharacterClassDetailComponent, {
      data: row,
      width: '90%'
    });
  }
}
