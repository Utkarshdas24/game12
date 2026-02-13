import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface JWTPayload {
  gameId: string;
  exp: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private token: string | null = null;
  private payload: JWTPayload | null = null;

  constructor(private router: Router) {}

  /**
   * Extract JWT from query parameter and validate it
   * @param token JWT token string
   * @returns gameId if valid, null if invalid
   */
  authenticateWithToken(token: string): string | null {
    try {
      this.token = token;
      this.payload = jwtDecode<JWTPayload>(token);

      // Validate expiration
      const currentTime = Math.floor(Date.now() / 1000);
      if (this.payload?.exp && this.payload.exp < currentTime) {
        console.error('JWT token has expired');
        this.clearAuthentication();
        return null;
      }

      // Extract gameId
      if (!this.payload?.gameId) {
        console.error('JWT does not contain gameId claim');
        this.clearAuthentication();
        return null;
      }

      return this.payload.gameId;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      this.clearAuthentication();
      return null;
    }
  }

  /**
   * Navigate to game and scrub token from URL for security
   * @param gameId Game identifier to navigate to
   */
  secureNavigateToGame(gameId: string): void {
    // Navigate to clean URL without token
    this.router.navigate(['/play', gameId], {
      replaceUrl: true, // This removes the token from browser history
    });
  }

  /**
   * Get current gameId from stored payload
   */
  getCurrentGameId(): string | null {
    return this.payload?.gameId || null;
  }

  /**
   * Clear stored token and payload
   */
  clearAuthentication(): void {
    this.token = null;
    this.payload = null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.token !== null && this.payload !== null;
  }
}
