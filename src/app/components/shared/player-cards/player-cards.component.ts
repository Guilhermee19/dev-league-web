import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPlayerCard } from '@app/models/player-card';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-player-cards',
  standalone: true,
  imports: [FormsModule, RatingModule],
  templateUrl: './player-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardsComponent {
  @Input() public player: IPlayerCard = {} as IPlayerCard;
}
