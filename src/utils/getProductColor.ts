export const getProductColor = (color: string) => {
  const normalizedColor = color.split(' ').join('');

  switch (normalizedColor) {
    case 'black':
      return 'bg-prod-black';
    case 'midnight':
      return 'bg-prod-midnight';
    case 'blue':
      return 'bg-prod-blue';
    case 'green':
      return 'bg-prod-green';
    case 'pink':
      return 'bg-prod-pink';
    case 'starlight':
      return 'bg-prod-starlight';
    case 'white':
      return 'bg-prod-white';
    case 'yellow':
      return 'bg-prod-yellow';
    case 'purple':
      return 'bg-prod-purple';
    case 'gold':
      return 'bg-prod-gold';
    case 'silver':
      return 'bg-prod-silver';
    case 'spacegray':
      return 'bg-prod-spacegray';
    case 'spaceblack':
      return 'bg-prod-spaceblack';
    case 'rosegold':
      return 'bg-prod-rosegold';
    case 'coral':
      return 'bg-prod-coral';
    case 'graphite':
      return 'bg-prod-graphite';
    case 'sierrablue':
      return 'bg-prod-sierrablue';
    case 'skyblue':
      return 'bg-prod-skyblue';
    case 'midnightgreen':
      return 'bg-prod-midnightgreen';
    case 'red':
      return 'bg-prod-red';
    default:
      return 'bg-prod-white';
  }
};
