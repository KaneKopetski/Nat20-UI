import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ErrorResponse} from "../model/error-response/error-response-model";
import {MatChip} from "@angular/material/chips";
import {Constants} from "../../../shared/constants/constants";
import {Source} from "../model/source/source-model";
import {SourceService} from "../services/source-service/source.service";
import {ToastrService} from "ngx-toastr";
import {CharacterClassService} from "../services/character-class-service/character-class.service";
import {RaceService} from "../services/race-service/race.service";
import {FeatService} from "../services/feat-service/feat.service";
import {DeityService} from "../services/deity-service/deity.service";
import {SkillService} from "../services/skill-service/skill.service";
import {Race} from "../model/race/race";
import {Feat} from "../model/feat/feat-model";
import {Deity} from "../model/deity/deity-model";
import {Skill} from "../model/skill/skill";
import {CharacterClass} from "../model/character-class/character-class";
import {CharacterBuilderFormService} from "../services/characer-builder-form-service/character-builder-form.service";

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.css']
})
export class SourceFormComponent implements OnInit {

  allSources: Array<Source>;
  selectAll = false;
  availableRaces: Array<Race>;
  availableFeats: Array<Feat>;
  availableDeities: Array<Deity>;
  availableSkills: Array<Skill>;
  availableCharacterClasses: Array<CharacterClass>;

  get sourceChipsSelected() {
    return this.cbFormService.characterBuilderForm.get(Constants.SOURCES_SELECTED);
  }

  constructor(private sourceService: SourceService, private toastr: ToastrService,
              private characterClassService: CharacterClassService, private raceService: RaceService,
              private featService: FeatService, private deityService: DeityService, private skillService: SkillService,
              public cbFormService: CharacterBuilderFormService) { }

  ngOnInit(): void {
    this.getSourceOptions();
  }

  private getSourceOptions() {
    this.sourceService.getAllSources().subscribe(res => {
      this.allSources = res;
    }, (error: ErrorResponse) => this.handleError(error));
  }

  public specialSourceHandling(specialChip: MatChip) {
    const chipValue: string = specialChip.value.trim();
    switch (chipValue) {
      case Constants.specialSourceCases.selectAll: {
        const values: string[] = [];
        this.allSources.forEach((source: Source) => values.push(source.sourceEnum));
        this.sourceChipsSelected.setValue(values);
        this.selectAll = true;
      }
        break;
      case Constants.specialSourceCases.selectNone: {
        this.sourceChipsSelected.reset();
        this.selectAll = false;
      }
        break;
      case Constants.specialSourceCases.coreOnly: {
        this.sourceChipsSelected.setValue(Constants.coreOnlySources);
        this.selectAll = false;
      }
        break;
      case Constants.specialSourceCases.srdOnly: {
        this.sourceChipsSelected.setValue(Constants.srdOnlySources);
        this.selectAll = false;
      }
        break;
      default: {
        this.handleError(Constants.defaultErrorResponse);
      }
    }
  }

  private handleError(error: ErrorResponse) {
    let errorMessage;
    let errorTitle;
    switch (error.status) {
      case 500: {
        errorMessage = Constants.GENERIC_ERROR_MSG;
        errorTitle = Constants.ERROR_TITLE_MSG;
      }         break;
      case 404: {
        errorTitle = Constants.RESOURCE_NOT_FOUND_MSG;
        errorMessage = Constants.CHARACTER_BUILDER_RESOURCE_ERROR_MSG;
      }         break;
    }
    this.toastr.error(errorMessage, errorTitle);
  }

  public getCharacterBuilderFormSelectionValues() {
    this.characterClassService.getCharacterClasses().subscribe(res => this.availableCharacterClasses = res, (error: ErrorResponse) => this.handleError(error));
    this.deityService.getAllDeities().subscribe(res => this.availableDeities = res, (error: ErrorResponse) => this.handleError(error));
    this.featService.getAllFeats().subscribe(res => this.availableFeats = res, (error: ErrorResponse) => this.handleError(error));
    this.raceService.getAllRaces().subscribe(res => this.availableRaces = res, (error: ErrorResponse) => this.handleError(error));
    this.skillService.getAllSkills().subscribe(res => this.availableSkills = res, (error: ErrorResponse) => this.handleError(error));
  }
}
