import HomeBanner from "@/components/home/HomeBanner";
import AboutStats from "@/components/home/AboutStats";
import ProductsByCategory from "@/components/home/ProductsByCategory";
import OurServices from "@/components/home/OurServices";
import FindTheRightSolution from "@/components/home/FindTheRightSolution";
import IndustriesWeServe from "@/components/home/IndustriesWeServe";
import WhyChooseEwac from "@/components/home/WhyChooseEwac";
import UniSlider from "@/components/home/UniSlider";
import ClientsLogos from "@/components/home/ClientsLogos";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
import { getProductCategories, getServices, getIndustries } from "@/lib/catalog";
import { getBlogPostCards, getNewsArticleCards, getCaseStudyCards } from "@/lib/insights";

export default async function Home() {
  const [productCategories, services, industries, blogCards, newsCards, caseStudyCards] =
    await Promise.all([
      getProductCategories(),
      getServices(),
      getIndustries(),
      getBlogPostCards(),
      getNewsArticleCards(),
      getCaseStudyCards(),
    ]);

  return (
    <>
      <HomeBanner />
      <AboutStats />
      <ProductsByCategory productCategories={productCategories} />
      <OurServices services={services} />
      <FindTheRightSolution productCategories={productCategories} />
      <IndustriesWeServe industries={industries} />
      <WhyChooseEwac />
      <UniSlider
        heading="Blogs"
        cards={blogCards}
        footerLabel="View all Blogs"
        footerHref="/blogs"
        sectionClassName="blog"
        decoration="gif"
      />
      <UniSlider
        heading="News"
        cards={newsCards}
        footerLabel="View all News"
        footerHref="/insights#news-pane"
        sectionClassName="red-color"
        decoration="gears"
      />
      <UniSlider
        heading="Case Studies"
        cards={caseStudyCards}
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
