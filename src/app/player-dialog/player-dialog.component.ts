import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Country, SquadNumber } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';
// import {map} from ''

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  private team: Team = {country: Country.Ecuador , name:"", players:[], $key:""};
  public countries = Object.keys(Country).map((key:any) => ({label: key, key: Country[key]}))
  public squadNumber = Object.keys(SquadNumber).slice(Object.keys(SquadNumber).length/2).map(key=>({
    label: key,
    key: SquadNumber[key]
  }))
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      // var instances = M.FormSelect.init(elems, options);
    });
    this.teamService.getTeams().pipe(take(1)).subscribe(teams=>{
      if(teams.length>0){
        this.team= teams[0];
      }
    })
  }

  private newPlayer(playerFormValue: any){
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey ={
      ...playerFormValue,
      key
    };
    const formattedTeam={
      ...this.team,
      players:[...(this.team.players? this.team.players : [] ), playerFormValueKey]
    }
    this.teamService.editTeam(formattedTeam)
  }
}
