export function makeID(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    return Array.from({length})
      .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
      .join('');
  }