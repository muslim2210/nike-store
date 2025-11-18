import Heading from "@/components/layout/Heading";
import HeroBanner from "@/components/custom/slider/HeroBanner";
import Slider from "@/components/custom/slider/Slider";
import Wrapper from "@/components/layout/Wrapper";
import CollectionSection from "@/components/section/CollectionSection";
import Image from "next/image";
import ProductList from "@/components/section/ProductList";


export default function Home() {
  return (
    <main>
      <Slider/>
      <Heading
        span={"Lifestyle Running Shoes"}
        title={"Extra Ordinary"}
        subtitle={
          "Meet the latest collection of retro running inspired shoes.The unlikely heroes of your easiest styling hack."
        }
      />
      <HeroBanner />
      <CollectionSection />
      <Heading
        span={"The Best Air Jordans"}
        title={"all comfort. no pressure."}
        subtitle={
          "Based on the design of the original outsole, the integrated traction pattern includes a forefoot pivot circle."
        }
      />
      <Wrapper className="mb-16">
        <Image
          src="/banner_nike.jpg"
          alt="banner"
          priority
          width={1360}
          height={300}
        />
      </Wrapper>
      <ProductList />
    </main>
  );
}
