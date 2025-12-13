import { Hero } from "@/components/home/Hero";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { GoogleReviewsCarousel } from "@/components/reviews/GoogleReviewsCarousel";
import { BlogSection } from "@/components/home/BlogSection";
import { BeforeAfterGallery } from "@/components/gallery/BeforeAfterGallery";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentsGrid />
      <DoctorsSection />
      <WhyChooseUs />
      <BeforeAfterGallery />
      <GoogleReviewsCarousel />
      <BlogSection />
      <CTASection />
    </>
  );
}

