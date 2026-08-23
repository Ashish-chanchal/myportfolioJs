import macosTahoeDawn from '../../assets/macos/wallpapers/tahoe_dawn_5k.jpg';
import macosTahoeDusk from '../../assets/macos/wallpapers/tahoe_dusk_5k.jpg';
import macosTahoeBeach from '../../assets/macos/wallpapers/tahoe_beach.jpg';
import macosGoldenLight from '../../assets/macos/wallpapers/golden_peak_light.png';
import macosGoldenDark from '../../assets/macos/wallpapers/golden_peak_dark.png';
import macosBigSurPeaks from '../../assets/macos/wallpapers/big_sur_peaks.jpg';

export interface MacOSWallpaper {
  id: string;
  name: string;
  category: 'Dynamic' | 'Landscape' | 'Abstract' | 'Minimal';
  thumbnail: string;
  url: string;
}

export const MACOS_WALLPAPERS: MacOSWallpaper[] = [
  {
    id: 'tahoe-dawn',
    name: 'macOS Tahoe Dawn (5K)',
    category: 'Landscape',
    thumbnail: macosTahoeDawn,
    url: macosTahoeDawn,
  },
  {
    id: 'tahoe-dusk',
    name: 'macOS Tahoe Dusk (5K)',
    category: 'Dynamic',
    thumbnail: macosTahoeDusk,
    url: macosTahoeDusk,
  },
  {
    id: 'golden-dark',
    name: 'macOS Golden Peak Dark (4.5K)',
    category: 'Landscape',
    thumbnail: macosGoldenDark,
    url: macosGoldenDark,
  },
  {
    id: 'golden-light',
    name: 'macOS Golden Peak Light (4.5K)',
    category: 'Landscape',
    thumbnail: macosGoldenLight,
    url: macosGoldenLight,
  },
  {
    id: 'tahoe-beach',
    name: 'macOS Tahoe Emerald Beach',
    category: 'Landscape',
    thumbnail: macosTahoeBeach,
    url: macosTahoeBeach,
  },
  {
    id: 'lake-evening',
    name: 'macOS Big Sur Evening Peaks (4K)',
    category: 'Abstract',
    thumbnail: macosBigSurPeaks,
    url: macosBigSurPeaks,
  },
  {
    id: 'sequoia-sunrise',
    name: 'macOS Sequoia Sunrise',
    category: 'Landscape',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=800&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=2600&auto=format&fit=crop',
  },
  {
    id: 'sequoia-night',
    name: 'macOS Sequoia Redwood Night',
    category: 'Dynamic',
    thumbnail: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=800&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=2600&auto=format&fit=crop',
  },
];
