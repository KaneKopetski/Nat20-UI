import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../character-class-service/character-class.service';
import {RaceService} from '../race-service/race.service';
import {Race} from '../model/race/race';
import {CharacterBuild} from "../model/character-build/character-build-response-model";
import {CharacterBuildRequest} from "../model/character-build/character-build-request-model";
import {FeatService} from "../feat-service/feat.service";
import {Feat} from "../model/feat/feat-model";
import {DeityService} from "../deity-service/deity.service";
import {Deity} from "../model/deity/deity-model";
import {Skill} from "../model/skill/skill";
import {SkillService} from "../skill-service/skill.service";
import {Source} from "../model/source/source-model";
import {SourceService} from "../source-service/source.service";
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {
  characterBuilderForm: FormGroup;
  characterBuild: CharacterBuild;
  characterBuildRequest: CharacterBuildRequest;
  availableCharacterClasses: Array<CharacterClass>;
  availableRaces: Array<Race>;
  availableFeats: Array<Feat>;
  availableDeities: Array<Deity>;
  availableSkills: Array<Skill>;
  allSources: Array<Source>;

  selectable = true;
  removable = true;
  isLinear = false;
  selectAll: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService, private raceService: RaceService,
              private featService: FeatService, private deityService: DeityService, private skillService: SkillService,
              private sourceService: SourceService) {
  }

  ngOnInit(): void {
    // this.createForm();
    this.getFormSelectionValues();

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
      chipsControl: []
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.firstFormGroup.get('chipsControl').valueChanges.subscribe(res => console.log(res));
  }

  // private createForm() {
  //   this.characterBuilderForm = this.fb.group({
  //     buildName: ['',
  //       [Validators.required]
  //     ],
  //     characterClass: ['', Validators.compose([
  //       Validators.required
  //     ])],
  //     race: ['',
  //       [Validators.required]
  //     ],
  //     strengthScore: ['',
  //       [Validators.required]
  //     ],
  //     dexterityScore: ['',
  //       [Validators.required]
  //     ],
  //     constitutionScore: ['',
  //       [Validators.required]
  //     ],
  //     wisdomScore: ['',
  //       [Validators.required]
  //     ],
  //     intelligenceScore: ['',
  //       [Validators.required]
  //     ],
  //     charismaScore: ['',
  //       [Validators.required]
  //     ]
  //   });
  // }

  private getFormSelectionValues() {
    this.sourceService.getAllSources().subscribe(res => this.allSources = res);
    this.characterClassService.getCharacterClasses().subscribe(res => this.availableCharacterClasses = res);
    this.deityService.getAllDeities().subscribe(res => this.availableDeities = res);
    this.featService.getAllFeats().subscribe(res => this.availableFeats = res);
    this.raceService.getAllRaces().subscribe(res => this.availableRaces = res);
    this.skillService.getAllSkills().subscribe(res => this.availableSkills = res);
  }

  specialSourceHandling(specialChip: MatChip) {
    console.log(specialChip.value);

    if (specialChip.value === ' Select all ') {
      const values: string[] = [];
      this.allSources.forEach((source: Source) => values.push(source.sourceEnum));
      this.firstFormGroup.get('chipsControl').setValue(values);
      this.selectAll = true;
    } else if (specialChip.value === ' Select none ') {
      this.firstFormGroup.get('chipsControl').reset();
      this.selectAll = false;
    } else if (specialChip.value === ' Core Only ') {
      this.firstFormGroup.get('chipsControl').setValue(['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35']);
    } else {
      this.firstFormGroup.get('chipsControl').setValue(['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35', 'EXPANDED_PSIONICS_HANDBOOK']);
    }


  }
}


