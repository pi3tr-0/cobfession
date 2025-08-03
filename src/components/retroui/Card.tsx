import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
 
interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  src?: string;
  alt?: string;
}
 
const Card = ({ className, src, alt, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        "inline-block border-2 transition-all bg-white shadow-[4px_4px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000] overflow-hidden",
        className,
      )}
      {...props}
    >
      {src && (
        <img 
          src={src} 
          alt={alt || ""} 
          className="block w-full h-full object-cover"
        />
      )}
    </div>
  );
};
 
const CardHeader = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn("flex flex-col justify-start p-4", className)}
      {...props}
    />
  );
};
 
const CardContent = ({ className, ...props }: ICardProps) => {
  return <div className={cn("p-4", className)} {...props} />;
};
 
const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Content: CardContent,
});
 
export { CardComponent as Card };