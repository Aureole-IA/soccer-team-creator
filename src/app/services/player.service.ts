import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerDb: AngularFireList<Player>;
  constructor(private Db: AngularFireDatabase) {
    this.playerDb = this.Db.list('/players', ref => ref.orderByChild('name'))
   }

   getPlayers(): Observable<Player[]> {
     return this.playerDb.snapshotChanges().pipe(
       map(changes => {
          return changes.map(c=> ({$key: c.payload.key, ...c.payload.val()} as Player))
       })
     );
   }
   addPlayer (player: Player){
     return this.playerDb.push(player);
   }

   deletePlayer(id: string){
      this.playerDb.remove(id)
   }

   editPlayer(newPlayerData: any){
     const $key = newPlayerData.$key;
     delete(newPlayerData.$key);
     this.playerDb.update($key, newPlayerData);
   }
}
