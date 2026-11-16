import Image from "next/image";
import { cn } from "@/lib/utils";

const OPTIMISED_HOSTS = ["https://images.unsplash.com/", "https://lh3.googleusercontent.com/"];

type BlogPostImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its (relatively positioned) parent. Photos from the site or from the known image hosts use
 * next/image; posts written in the admin panel may point at any host, so those use a plain img.
 */
export function BlogPostImage({ src, alt, sizes, priority = false, className }: BlogPostImageProps) {
  const known = src.startsWith("/") || OPTIMISED_HOSTS.some((host) => src.startsWith(host));
  if (known) {
    return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", className)} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={cn("absolute inset-0 h-full w-full object-cover", className)} />
  );
}
