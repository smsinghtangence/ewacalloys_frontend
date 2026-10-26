
import { BLOG_POSTS } from "@/components/blogs/blogPosts";

const BLOG_LIST_BASE = [
  {
    image: "/assets/images/blogs/blog-hvof-coating-advantages.webp",
    title: "Why Choose HVOF Coating? Key Advantages for Industrial Efficiency and Durability",
  },
  {
    image: "/assets/images/blogs/blog-thermal-spray-powder-efficiency.webp",
    title: "Maximizing Work Efficiency with Thermal Spray Powder: A Guide to Its Benefits",
  },
  {
    image: "/assets/images/blogs/blog-welding-electrodes-industrial-success.webp",
    title: "Why Welding Electrodes Are Essential for Industrial Success: Benefits and Applications",
  },
  {
    image: "/assets/images/blogs/blog-ss-fabrication-electrodes-impact.webp",
    title: "The Impact of SS Fabrication Electrodes on Industrial Work: Improvement and Benefits",
  },
  {
    image: "/assets/images/blogs/blog-welding-products-construction.webp",
    title: "Choosing the Right Welding Products for Safe Architectural and Automotive Construction Projects",
  },
  {
    image: "/assets/images/blogs/blog-welding-products-efficiency.webp",
    title: "High-Quality Welding Products: Why They Are Essential for Efficiency and Long-Term Success",
  },
  {
    image: "/assets/images/blogs/blog-ss-fabrication-aerospace.webp",
    title: "Why SS Fabrication Electrodes are Crucial for High-Performance Welding in Aerospace and Construction",
  },
  {
    image: "/assets/images/blogs/blog-wear-plates-mining.webp",
    title: "The Importance of Wear Plates in Protecting Mining Machinery from Harsh Conditions",
  },
  {
    image: "/assets/images/blogs/blog-ss-fabrication-guide.webp",
    title: "What Are SS Fabrication Electrodes? A Complete Guide for Fabricators",
  },
  {
    image: "/assets/images/blogs/blog-hvof-coating-petrochemical.webp",
    title: "The Role of HVOF Coating in Boosting the Longevity of Petrochemical Equipment",
  },
  {
    image: "/assets/images/blogs/blog-hvof-coatings-high-stress.webp",
    title: "How to Optimize the Performance of HVOF Coatings in High-Stress Environments",
  },
  {
    image: "/assets/images/blogs/blog-thermal-spraying-coating.webp",
    title: "Thermal Spraying: A Game-Changer for Innovative Coating Applications",
  },
  {
    image: "/assets/images/blogs/blog-thermal-spray-powder-protection.webp",
    title: "How Thermal Spray Powder Enhances Surface Protection in Industrial Applications",
  },
  {
    image: "/assets/images/blogs/blog-welding-products-workshop.webp",
    title: "How to Identify High Quality Welding Products for Your Workshop",
  },
  {
    image: "/assets/images/blogs/blog-thermal-spray-powder-trends.webp",
    title: "Current Trends in Thermal Spray Powder Applications across Various Sectors",
  },
];

// Each card links to its post page, /blogs/<slug>.
export const BLOG_LIST = BLOG_LIST_BASE.map((card) => {
  const post = BLOG_POSTS.find((p) => p.title === card.title);
  return post ? { ...card, href: `/blogs/${post.slug}` } : card;
});

export const INSIGHTS_BLOG_CARDS = BLOG_LIST.slice(0, 9);

export const INSIGHTS_NEWS_CARDS = [
  {
    image: "/assets/images/news1.webp",
    title: "Why Choose HVOF Coating? Key Advantages for Industrial Efficiency and Durability",
    href: "/news",
  },
  {
    image: "/assets/images/news2.webp",
    title: "Maximizing Work Efficiency with Thermal Spray Powder: A Guide to Its Benefits",
    href: "/news",
  },
  {
    image: "/assets/images/news3.webp",
    title: "Why Welding Electrodes Are Essential for Industrial Success: Benefits and Applications",
    href: "/news",
  },
];

export const INSIGHTS_CASE_CARDS = [
  {
    image: "/assets/images/case1.webp",
    title: "Why Choose HVOF Coating? Key Advantages for Industrial Efficiency and Durability",
    href: "/case-studies",
  },
  {
    image: "/assets/images/case2.webp",
    title: "Maximizing Work Efficiency with Thermal Spray Powder: A Guide to Its Benefits",
    href: "/case-studies",
  },
  {
    image: "/assets/images/case3.webp",
    title: "Why Welding Electrodes Are Essential for Industrial Success: Benefits and Applications",
    href: "/case-studies",
  },
];
