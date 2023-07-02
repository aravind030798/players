import { Component, OnInit } from '@angular/core';
import { Player } from '../players.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  new_player_form: FormGroup = new FormGroup({});
  players: Player[] = [];

  player_to_update: Player | null = null;

  show_add_player: boolean = false;

  ngOnInit(): void {
    this.new_player_form = new FormGroup({
      name: new FormControl(this.player_to_update ?? ''),
      catches_made: new FormControl(this.player_to_update ?? 0),
      made_field_goals: new FormControl(this.player_to_update ?? 0),
      missed_field_goals: new FormControl(this.player_to_update ?? 0),
      rushing_yards: new FormControl(this.player_to_update ?? 0),
      sacks: new FormControl(this.player_to_update ?? 0),
      touchdowns_thrown: new FormControl(this.player_to_update ?? 0),
    });

    (async () => {
      this.load_players();
    })();
  }

  async load_players() {
    const players: Player[] = await fetch('http://localhost:3000/').then((x) =>
      x.json()
    );

    this.players = players;
  }

  async update_player(player: Player) {
    this.player_to_update = player;
    this.show_add_player = true;

    this.new_player_form = new FormGroup({
      name: new FormControl(this.player_to_update.name ?? ''),
      catches_made: new FormControl(this.player_to_update.catches_made ?? 0),
      made_field_goals: new FormControl(
        this.player_to_update.made_field_goals ?? 0
      ),
      missed_field_goals: new FormControl(
        this.player_to_update.missed_field_goals ?? 0
      ),
      rushing_yards: new FormControl(this.player_to_update.rushing_yards ?? 0),
      sacks: new FormControl(this.player_to_update.sacks ?? 0),
      touchdowns_thrown: new FormControl(
        this.player_to_update.touchdowns_thrown ?? 0
      ),
    });
  }

  async delete_player(player: Player) {
    console.log(player);

    await fetch(`http://localhost:3000/player/${player._id}`, {
      method: 'DELETE',
    });

    await this.load_players();
  }

  update_show_add_player() {
    this.show_add_player = true;
  }

  async on_submit(form: FormGroup) {
    console.log(form.value);

    if (this.player_to_update === null) {
      await fetch('http://localhost:3000/player/', {
        method: 'POST',
        body: JSON.stringify(form.value),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (this.player_to_update) {
      await fetch(`http://localhost:3000/player/${this.player_to_update._id}`, {
        method: 'PUT',
        body: JSON.stringify(form.value),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    await this.load_players();
    this.show_add_player = false;
    this.player_to_update = null;
  }
}
