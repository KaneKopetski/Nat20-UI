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

export class ClassLevelTableRow {
  level: number;
  characterClassName: string;
  babTotal: string;
  fortSaveTotal: number;
  reflexSaveTotal: number;
  willSaveTotal: number;
  classFeatures: string;
}

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
  classLevelTableColumnsToDisplay: string[] = ['level', 'characterClass', 'babTotal', 'fortSaveTotal', 'reflexSaveTotal', 'willSaveTotal', 'classFeatures'];
  searchTableDataSource: MatTableDataSource<CharacterClass>;
  classLevelTableDataSource;
  babDisplayValues: Map<number, string> = Constants.babDisplayValues;
  savingThrows: Map<string, number> = new Map([['fortSave', 0], ['reflexSave', 0], ['willSave', 0]]);
  isExpanded: boolean = false;
  tableData: ClassLevelTableRow[] = [];

  constructor(private characterClassService: CharacterClassService, private toastr: ToastrService,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data) {
  }

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

  //TODO change all sources to sources selected
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
    this.calculateClassLevelChanges(classLevel);
  }

  private calculateClassLevelChanges(classLevel: LevelClassPair) {
    let row = new ClassLevelTableRow()

    row.level = classLevel.level;
    row.characterClassName = classLevel.characterClass.name;
    row.babTotal = this.constructBabDescription();
    row.fortSaveTotal = this.getSavingThrowBonus('fortSaveProgression');
    row.reflexSaveTotal = this.getSavingThrowBonus('reflexSaveProgression');
    row.willSaveTotal = this.getSavingThrowBonus('willSaveProgression');
    row.classFeatures = this.getClassFeaturesForClassLevelsSelected();

    this.tableData.push(row)

    this.classLevelTableDataSource = new MatTableDataSource<ClassLevelTableRow>(this.tableData);
  }

  openDialog(row: CharacterClass) {
    this.dialog.open(CharacterClassDetailComponent, {
      data: row,
      width: '90%'
    });
  }


  private getClassFeaturesForClassLevelsSelected(): string {
    return "";
  }

  private constructBabDescription(): string {
    let babTotal: number = 0;

    this.classLevels.forEach((classLevel: LevelClassPair) => {
      babTotal = babTotal + classLevel.characterClass.baseAttackBonusProgression;
    })

    let babString: string = Math.floor(babTotal).toString();

    if (babTotal >= 16) {
      babString = babTotal + '/' + (babTotal - 5) + '/' + (babTotal - 10) + '/' + (babTotal - 15);
    } else if (babTotal >= 11) {
      babString = babTotal + '/' + (babTotal - 5) + '/' + (babTotal - 10);
    } else if (babTotal >= 6) {
      babString = babTotal + '/' + (babTotal - 5);
    }
    return babString;
  }

  private getSavingThrowBonus(savingThrowToCalculate: string): number {
    let classCount: Map<CharacterClass, number> = new Map();
    let saveBaseAbilityMap: Map<string, string> = new Map([
      ['fortSaveProgression', 'constitutionScore'],
      ['reflexSaveProgression', 'dexterityScore'],
      ['willSaveProgression', 'wisdomScore']
    ])

    this.classLevels.forEach((levelClassPair: LevelClassPair) => {
      if (classCount.has(levelClassPair.characterClass))
        classCount.set(levelClassPair.characterClass, classCount.get(levelClassPair.characterClass) + 1);
      else
      classCount.set(levelClassPair.characterClass, 1);
    });

    let totalSaveBonus: number = 0;

    classCount.forEach((count: number, characterClass: CharacterClass) => {
      if (characterClass[savingThrowToCalculate] === 'GOOD')
        totalSaveBonus = totalSaveBonus + (Math.floor(2 + Math.floor(count / 2)));
      else
        totalSaveBonus = totalSaveBonus + (Math.floor(count / 3));
    })

    let baseAbilityBonus: number = Math.floor((Math.floor(this.characterBuildData.controls[saveBaseAbilityMap.get(savingThrowToCalculate)].value - 10)) / 2);

    return totalSaveBonus + baseAbilityBonus;
  }
}
