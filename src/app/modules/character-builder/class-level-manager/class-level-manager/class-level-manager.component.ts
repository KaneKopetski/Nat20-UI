import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CharacterClassService} from "../../services/character-class-service/character-class.service";
import {Source} from "../../model/source/source-model";
import {CharacterClass} from "../../model/character-class/character-class";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {LevelClassPair} from "../../model/level-class-pair/level-class-pair-model";
import {Constants} from "../../../../shared/constants/constants";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-class-level-manager',
  templateUrl: './class-level-manager.component.html',
  styleUrls: ['./class-level-manager.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClassLevelManagerComponent implements OnInit {

  @Input()sourcesAllowed: any[];
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  public availableClasses: CharacterClass[];
  private classLevels: LevelClassPair[] = [];
  columnsToDisplay: string[] = ['name', 'hitDie', 'baseAttackBonusProgression', 'fortSaveProgression', 'reflexSaveProgression', 'willSaveProgression', 'add'];
  expandedElement: CharacterClass | null;

  constructor(private characterClassService: CharacterClassService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    this.fetchFirstPageOfClassesForSourcesProvided();
  }

  private fetchFirstPageOfClassesForSourcesProvided() {
    this.characterClassService.getClassesFromSources(this.prepareSources()).subscribe(
      res => this.availableClasses = res,
      error => this.toastr.error(error.message, 'Here be dragons?'))
  }

  private prepareSources() {
    if (!this.sourcesAllowed) {
      let sources: string[] = [];
      Constants.allSources.forEach((source: Source) => sources.push(source.sourceEnum))
      return sources;
    } else
      return this.sourcesAllowed;
  }

  removeClass(row) {

  }

  addClass(row) {

  }
}
