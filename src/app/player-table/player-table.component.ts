import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  public players$: Observable<Player[]> = this.playerService.getPlayers()
  // public selcetdPlayer: Player;
  public showModal: boolean = false
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers()
  }
  newPLayer(){
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open');
    });
  }

}
