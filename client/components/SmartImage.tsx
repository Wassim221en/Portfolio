export const SmartImage = ({ name, alt, className }) => (
  <picture>
    <source srcSet={`/Portfolio/images/avif_images/${name}.avif`} type="image/avif" />
    <img src={`/Portfolio/images/${name}.png`} alt={alt} className={className} />
  </picture>
);