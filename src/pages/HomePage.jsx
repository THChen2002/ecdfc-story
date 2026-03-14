import HeroSection from '@/components/home/HeroSection/HeroSection'
import HighlightCards from '@/components/home/HighlightCards/HighlightCards'
import StatsCounter from '@/components/home/StatsCounter/StatsCounter'
import LatestNews from '@/components/home/LatestNews/LatestNews'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestNews />
      <HighlightCards />
      <StatsCounter />
    </>
  )
}
