# Fonts

The PDF and the share card are rendered without a browser and without the
network, so the fonts they draw in live here as TTF files. The HTML outputs
(email, page, print HTML) reference the same families as web fonts instead —
see `webFonts` in `src/theme.ts`.

| File | Family | Source |
| --- | --- | --- |
| `PlayfairDisplay-Bold.ttf` | Playfair Display 700 | Google Fonts (OFL) |
| `PlayfairDisplay-MediumItalic.ttf` | Playfair Display 500 italic | Google Fonts (OFL) |
| `Inter-Regular.ttf` | Inter 400 | Google Fonts (OFL) |
| `Inter-SemiBold.ttf` | Inter 600 | Google Fonts (OFL) |
| `Inter-Bold.ttf` | Inter 700 | Google Fonts (OFL) |
| `IBMPlexMono-Medium.ttf` | IBM Plex Mono 500 | Google Fonts (OFL) |
| `IBMPlexMono-Bold.ttf` | IBM Plex Mono 700 | Google Fonts (OFL) |

All seven are licensed under the SIL Open Font License 1.1, which permits
redistribution. Playfair Display and Inter came from the
`@expo-google-fonts` packages; IBM Plex Mono came from the
[google/fonts](https://github.com/google/fonts) repository (the Expo copies
of Plex Mono turned out to be unreadable by fontkit — even a space failed
to lay out — so they were replaced).
