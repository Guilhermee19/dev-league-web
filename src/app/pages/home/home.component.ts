import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerCardsComponent } from '@app/components/shared/player-cards/player-cards.component';
import { PLAYERCARDS } from '@app/constants/player-cards';
import { IPlayerCard } from '@app/models/player-card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    PlayerCardsComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public player_cards: IPlayerCard[] = PLAYERCARDS;
}
