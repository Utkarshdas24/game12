import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GameManifestEntry {
  remoteEntry: string;
  exposedModule: string;
  type: string;
  displayName: string;
  popular: boolean;
  assets: string[];
  gameId?: string;
}

export interface GameManifest {
  [gameId: string]: GameManifestEntry;
}

@Injectable({
  providedIn: 'root',
})
export class FederationService {
  private manifest: GameManifest | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Load the federation manifest from assets
   * Called during app initialization via APP_INITIALIZER
   */
  async loadManifest(): Promise<void> {
    try {
      this.manifest = await firstValueFrom(
        this.http.get<GameManifest>('/assets/federation.manifest.json'),
      );
      console.log('Federation manifest loaded:', this.manifest);
    } catch (error) {
      console.error('Failed to load federation manifest:', error);
      throw error;
    }
  }

  /**
   * Get manifest entry for a specific game
   */
  getGameManifest(gameId: string): GameManifestEntry | null {
    return this.manifest?.[gameId] || null;
  }

  /**
   * Get the URL path for a game's index.html
   * In monolithic mode, games are served from /assets/games/{gameId}/index.html
   */
  getGameUrl(gameId: string): string | null {
    const entry = this.getGameManifest(gameId);
    if (!entry) return null;

    // Extract the base path from remoteEntry
    // e.g., "/assets/games/scramble-words/index.js" -> "/assets/games/scramble-words/"
    const basePath = entry.remoteEntry.substring(
      0,
      entry.remoteEntry.lastIndexOf('/') + 1,
    );
    return basePath + 'index.html';
  }

  /**
   * Get all available games
   */
  getAllGames(): GameManifestEntry[] {
    if (!this.manifest) return [];
    return Object.entries(this.manifest).map(
      ([id, entry]) =>
        ({
          ...entry,
          gameId: id,
        }) as GameManifestEntry,
    );
  }

  /**
   * Get popular games for prefetching
   */
  getPopularGames(): string[] {
    if (!this.manifest) return [];
    return Object.entries(this.manifest)
      .filter(([_, entry]) => entry.popular)
      .map(([id, _]) => id);
  }
}
