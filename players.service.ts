import { Injectable } from '@angular/core';

export type Player = {
  _id: string;
  name: string;
  catches_made: number;
  made_field_goals: number;
  missed_field_goals: number;
  rushing_yards: number;
  sacks: number;
  touchdowns_thrown: number;
};

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor() {}
  get_all_players(): Player[] {
    return [];
  }
}
