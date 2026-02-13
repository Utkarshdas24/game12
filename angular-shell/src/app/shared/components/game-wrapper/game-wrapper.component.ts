import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FederationService } from '../../../core/services/federation.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-wrapper">
      <div *ngIf="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading game...</p>
      </div>
      <div *ngIf="error" class="error-container">
        <h2>Failed to Load Game</h2>
        <p>{{ errorMessage }}</p>
        <button (click)="retry()">Retry</button>
        <button (click)="goBack()">Return to Lobby</button>
      </div>
      <iframe
        *ngIf="gameUrl && !error"
        [src]="gameUrl"
        class="game-iframe"
        (load)="onIframeLoad()"
        frameborder="0"
        allow="autoplay; fullscreen"
        [hidden]="loading"
      ></iframe>
    </div>
  `,
  styles: [
    `
      .game-wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }

      .game-iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
      }

      .loading-container,
      .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .error-container h2 {
        margin-bottom: 1rem;
      }

      .error-container button {
        margin: 0.5rem;
        padding: 10px 20px;
        background: white;
        color: #667eea;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
      }

      .error-container button:hover {
        background: #f0f0f0;
      }
    `,
  ],
})
export class GameWrapperComponent implements OnInit, OnDestroy {
  gameUrl: SafeResourceUrl | null = null;
  private gameId: string = '';

  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private federationService: FederationService,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.loadGame();
  }

  private loadGame() {
    this.loading = true;
    this.error = false;

    const url = this.federationService.getGameUrl(this.gameId);

    if (!url) {
      this.error = true;
      this.errorMessage = `Game "${this.gameId}" not found in manifest`;
      this.loading = false;
      return;
    }

    // Sanitize the URL for iframe src binding
    this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(`Loading game "${this.gameId}" from: ${url}`);
  }

  onIframeLoad() {
    this.ngZone.run(() => {
      this.loading = false;
      console.log(`Game "${this.gameId}" loaded successfully`);
    });
  }

  retry() {
    this.loadGame();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    console.log(`Game "${this.gameId}" unloaded`);
  }
}
