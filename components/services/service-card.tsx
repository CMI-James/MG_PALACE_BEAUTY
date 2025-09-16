import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { Service } from "@/lib/supabase/queries";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/services/${service.slug}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={
                service.images?.[0] ||
                "/placeholder.svg?height=240&width=320&query=beauty service"
              }
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {service.is_bookable && (
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                Bookable
              </Badge>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/services/${service.slug}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {service.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {service.short_description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-xl text-primary">
            ₦{service.price.toLocaleString()}
          </span>
          {service.duration && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(service.duration)}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          size="sm"
          disabled={!service.is_bookable}
          asChild={service.is_bookable}
        >
          {service.is_bookable ? (
            <Link href={`/services/${service.slug}`}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Link>
          ) : (
            <>
              <Calendar className="h-4 w-4 mr-2" />
              Coming Soon
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
