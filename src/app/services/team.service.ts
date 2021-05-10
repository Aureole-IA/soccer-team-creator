import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamDb: AngularFireList<Team>;
  constructor(private Db: AngularFireDatabase) {
    this.teamDb = this.Db.list('/team', ref => ref.orderByChild('name'))
   }

   getTeams(): Observable<Team[]> {
     return this.teamDb.snapshotChanges().pipe(
       map(changes => {
          return changes.map(c=> ({$key: c.payload.key, ...c.payload.val()} as Team))
       })
     );
   }
   addTeam (team: Team){
     return this.teamDb.push(team);
   }

   deleteTeam(id: string){
      this.teamDb.remove(id)
   }

   editTeam(newTeamData: any){
     const $key = newTeamData.$key;
     delete(newTeamData.$key);
     this.teamDb.update($key, newTeamData);
   }
}

export const TeamsTableHeaders =["Name", "Country", "Players"];
