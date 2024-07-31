interface Waveprop{
    src : string,
    className: string
}
export default function Wave  ({ src, className }: Waveprop) {
    return (
      <div
        className={` ${className}`}
        style={{ backgroundImage: `url(${src})` }}
      ></div>
    );
  };
  
  
  