export const rootDir = new URL('../../', import.meta.url);
export const srcDir = new URL('src/', rootDir);
export const ZeroWidthSpace = '\u200B';

export const RandomLoadingMessage = ['Computing...', 'Thinking...', 'Cooking some food', 'Give me a moment', 'Loading...'];

export const enum Emojis {
  Loading = '<a:_:730555789730775042>',
  GreenTick = '<:_:637706251253317669>',
  RedCross = '<:_:637706251257511973>',
  /** This is the default Twemoji, uploaded as a custom emoji because iOS and Android do not render the emoji properly */
  MaleSignEmoji = '<:2642:845772713770614874>',
  /** This is the default Twemoji, uploaded as a custom emoji because iOS and Android do not render the emoji properly */
  FemaleSignEmoji = '<:2640:845772713729720320>'
}
