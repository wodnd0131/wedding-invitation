'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Divider } from '@/design-system';
import { MusicPlayer } from '@/components/MusicPlayer';
import Hero from '@/components/sections/Hero';
import Invitation from '@/components/sections/Invitation';
import WeddingDay from '@/components/sections/WeddingDay';
import Location from '@/components/sections/Location';
import Gallery from '@/components/sections/Gallery';
import Guestbook from '@/components/sections/Guestbook';
import Account from '@/components/sections/Account';
import RsvpWreath from '@/components/sections/RsvpWreath';
import Ending from '@/components/sections/Ending';

export default function Home() {
  const scrollRef = useScrollReveal();

  return (
    <div className="flex justify-center bg-panel">
      <div ref={scrollRef} className="relative min-h-screen w-full max-w-[480px] overflow-hidden bg-ivory">
        <MusicPlayer />
        <Hero />
        <Divider />
        <Invitation />
        <Divider />
        <WeddingDay />
        <Divider />
        <Location />
        <Divider />
        <Gallery />
        <Divider />
        <Guestbook />
        <Divider />
        <Account />
        <Divider />
        <RsvpWreath />
        <Divider />
        <Ending />
      </div>
    </div>
  );
}
