import Heading from "@/components/custom/Heading";
import HeroBanner from "@/components/custom/slider/HeroBanner";
import Slider from "@/components/custom/slider/Slider";


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
    </main>
  );
}
