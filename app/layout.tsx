import type { Metadata } from 'next';
import './globals.css';
import KakaoInit from '@/components/KakaoInit';
import { invitationData } from '@/data/invitation';
import { formatWeddingDateShort } from '@/lib/date';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const { groom, bride, venue, weddingDate, images } = invitationData;
const ogImage = images.og || `${siteUrl}/images/og-image.jpg`;

export const metadata: Metadata = {
  title: `${groom.name} · ${bride.name} 결혼합니다`,
  description: `${formatWeddingDateShort(weddingDate)} · ${venue.name}`,
  openGraph: {
    title: `${groom.name} ❤ ${bride.name} 결혼합니다`,
    description: `${formatWeddingDateShort(weddingDate)}\n${venue.name}`,
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '결혼식 대표 이미지',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={siteUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <KakaoInit />
      </body>
    </html>
  );
}
