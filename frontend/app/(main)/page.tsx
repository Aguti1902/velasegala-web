import { Hero } from "@/components/home/Hero";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { GoogleReviewsCarousel } from "@/components/reviews/GoogleReviewsCarousel";
import { BlogSection } from "@/components/home/BlogSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentsGrid />
      <DoctorsSection />
      <WhyChooseUs />
      <GoogleReviewsCarousel />
      <BlogSection />
      <CTASection />
    </>
  );
}

