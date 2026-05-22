import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  imageUrl: string;
  price?: string;
}

const EventCard = ({
  title,
  date,
  location,
  attendees,
  category,
  imageUrl,
  price = "Безкоштовно",
}: EventCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {/* Image Container - 400x250 aspect ratio (16:10) */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground border-0">
          {category}
        </Badge>
        <span className="absolute right-3 top-3 rounded-lg bg-card/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
          {price}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{attendees} учасників</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/0 opacity-0 transition-all duration-300 group-hover:bg-secondary/5 group-hover:opacity-100" />
    </article>
  );
};

export default EventCard;
