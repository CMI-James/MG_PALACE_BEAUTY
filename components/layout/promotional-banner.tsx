"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Gift, Percent, Truck } from "lucide-react";
import Link from "next/link";

interface PromotionalBanner {
  id: string;
  title: string;
  message: string;
  discount_percentage?: number;
  discount_code?: string;
  background_color: string;
  text_color: string;
  link_url?: string;
  link_text?: string;
  priority: number;
}

export function PromotionalBanner() {
  const [banners, setBanners] = useState<PromotionalBanner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [dismissedBanners, setDismissedBanners] = useState<string[]>([]);

  useEffect(() => {
    // Load dismissed banners from localStorage
    const dismissed = localStorage.getItem("dismissedBanners");
    if (dismissed) {
      setDismissedBanners(JSON.parse(dismissed));
    }

    // Fetch active banners
    fetchBanners();
  }, []);

  useEffect(() => {
    // Auto-rotate banners every 5 seconds if there are multiple
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(prev => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const fetchBanners = async () => {
    try {
      const response = await fetch("/api/promotional-banners");
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  const dismissBanner = (bannerId: string) => {
    const newDismissed = [...dismissedBanners, bannerId];
    setDismissedBanners(newDismissed);
    localStorage.setItem("dismissedBanners", JSON.stringify(newDismissed));

    // If all banners are dismissed, hide the component
    if (newDismissed.length >= banners.length) {
      setIsVisible(false);
    }
  };

  const getIcon = (banner: PromotionalBanner) => {
    if (banner.discount_percentage) return <Percent className="h-4 w-4" />;
    if (banner.message.toLowerCase().includes("shipping"))
      return <Truck className="h-4 w-4" />;
    return <Gift className="h-4 w-4" />;
  };

  // Filter out dismissed banners
  const activeBanners = banners.filter(
    banner => !dismissedBanners.includes(banner.id)
  );

  if (!isVisible || activeBanners.length === 0) {
    return null;
  }

  const currentBanner =
    activeBanners[currentBannerIndex % activeBanners.length];

  return (
    <div
      className="relative px-4 py-3 text-center text-sm font-medium transition-all duration-300"
      style={{
        backgroundColor: currentBanner.background_color,
        color: currentBanner.text_color,
      }}
    >
      <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
        {getIcon(currentBanner)}

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-semibold">{currentBanner.title}</span>
          <span>{currentBanner.message}</span>

          {currentBanner.discount_code && (
            <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-xs font-mono">
              Code: {currentBanner.discount_code}
            </span>
          )}

          {currentBanner.link_url && currentBanner.link_text && (
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="ml-2 bg-white/20 hover:bg-white/30 text-current border-white/30"
            >
              <Link href={currentBanner.link_url}>
                {currentBanner.link_text}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Dismiss Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-white/20 text-current"
        onClick={() => dismissBanner(currentBanner.id)}
      >
        <X className="h-3 w-3" />
      </Button>

      {/* Banner Indicators */}
      {activeBanners.length > 1 && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                index === currentBannerIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentBannerIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
