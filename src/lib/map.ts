export function buildMapLinks(address: string) {
  const query = encodeURIComponent(address);
  return [
    { label: '네이버지도', href: `https://map.naver.com/p/search/${query}` },
    { label: '카카오맵', href: `https://map.kakao.com/link/search/${query}` },
  ];
}
