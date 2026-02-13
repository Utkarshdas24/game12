import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FederationService,
  GameManifestEntry,
} from '../../core/services/federation.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lobby-container">
      <div class="lobby-header">
        <h1>🎮 Game Lobby</h1>
        <p>Select a game to play</p>
      </div>

      <div class="games-grid">
        <div
          *ngFor="let game of games"
          class="game-card"
          [class.popular]="game.popular"
          (click)="playGame(game.gameId)"
        >
          <div class="game-badge" *ngIf="game.popular">⭐ Popular</div>
          <div class="game-icon">🎯</div>
          <h3>{{ game.displayName }}</h3>
          <button class="play-btn">Play Now</button>
        </div>
      </div>

      <div *ngIf="games.length === 0" class="no-games">
        <p>No games available</p>
      </div>
    </div>
  `,
  styles: [
    `
      .lobby-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 20px;
        color: white;
      }

      .lobby-header {
        text-align: center;
        margin-bottom: 40px;
      }

      .lobby-header h1 {
        font-size: 3rem;
        margin-bottom: 10px;
        font-weight: 700;
      }

      .lobby-header p {
        font-size: 1.2rem;
        opacity: 0.9;
      }

      .games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 30px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .game-card {
        position: relative;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 40px 30px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
      }

      .game-card:hover {
        transform: translateY(-10px);
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      }

      .game-card.popular {
        border-color: #ffd700;
      }

      .game-badge {
        position: absolute;
        top: -10px;
        right: -10px;
        background: #ffd700;
        color: #333;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 700;
      }

      .game-icon {
        font-size: 60px;
        margin-bottom: 20px;
      }

      .game-card h3 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .play-btn {
        background: white;
        color: #667eea;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .play-btn:hover {
        background: #f0f0f0;
        transform: scale(1.05);
      }

      .no-games {
        text-align: center;
        padding: 60px 20px;
        font-size: 1.2rem;
        opacity: 0.7;
      }
    `,
  ],
})
export class LobbyComponent implements OnInit {
  games: (GameManifestEntry & { gameId: string })[] = [];

  constructor(
    private federationService: FederationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    const allGames = this.federationService.getAllGames();
    this.games = allGames.map((game: any) => ({
      ...game,
      gameId: game.gameId,
    }));
  }

  playGame(gameId: string) {
    this.router.navigate(['/play', gameId]);
  }
}
