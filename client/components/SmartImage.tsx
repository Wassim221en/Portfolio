export const SmartImage = ({ name, alt, className }) => (
  <picture>
    <source srcSet={`/images/avif_images/${name}.avif`} type="image/avif" />
    <img src={`/images/${name}.png`} alt={alt} className={className} />
  </picture>
);