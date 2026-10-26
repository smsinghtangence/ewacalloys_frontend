import HomeBanner from "@/components/home/HomeBanner";
import AboutStats from "@/components/home/AboutStats";
import ProductsByCategory from "@/components/home/ProductsByCategory";
import OurServices from "@/components/home/OurServices";
import FindTheRightSolution from "@/components/home/FindTheRightSolution";
import IndustriesWeServe from "@/components/home/IndustriesWeServe";
import WhyChooseEwac from "@/components/home/WhyChooseEwac";
import UniSlider from "@/components/home/UniSlider";
import { BLOG_CARDS, NEWS_CARDS, CASE_STUDY_CARDS } from "@/components/home/uniSliderData";
import ClientsLogos from "@/components/home/ClientsLogos";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
import { getProductCategories, getServices, getIndustries } from "@/lib/catalog";

export default async function Home() {
  const [productCategories, services, industries] = await Promise.all([
    getProductCategories(),
    getServices(),
    getIndustries(),
  ]);

  return (
    <>
      {/* Home-only styles; React hoists this <link> into <head> */}
      <link rel="stylesheet" href="/assets/css/home.css" precedence="default" />
      <HomeBanner />
      <AboutStats />
      <ProductsByCategory productCategories={productCategories} />
      <OurServices services={services} />
      <FindTheRightSolution productCategories={productCategories} />
      <IndustriesWeServe industries={industries} />
      <WhyChooseEwac />
      <UniSlider
        heading="Blogs"
        cards={BLOG_CARDS}
        footerLabel="View all Blogs"
        footerHref="/blogs"
        sectionClassName="blog"
        decoration="gif"
      />
      <UniSlider
        heading="News"
        cards={NEWS_CARDS}
        footerLabel="View all News"
        footerHref="/insights#news-pane"
        sectionClassName="red-color"
        decoration="gears"
      />
      <UniSlider
        heading="Case Studies"
        cards={CASE_STUDY_CARDS}
        footerLabel="View all Case Studies"
        footerHref="/insights#case-pane"
        sectionClassName="case-study"
        decoration="gif"
      />
      <ClientsLogos />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
