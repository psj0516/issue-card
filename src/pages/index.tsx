import Head from "next/head";
import dynamic from "next/dynamic";
import { CreditScoreSkeleton } from "@components/home/CreditScore";
import { CardListSkeleton } from "@/components/home/CardList";
import { BannerSkeleton } from "@components/home/AdBanner";
import Spacing from "@/components/shared/Spacing";

const AdBanners = dynamic(() => import("@components/home/AdBanner"), {
  ssr: false,
  loading: () => <BannerSkeleton />,
});

const CreditScore = dynamic(() => import("@components/home/CreditScore"), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
});

const CardList = dynamic(() => import("@components/home/CardList"), {
  ssr: false,
  loading: () => <CardListSkeleton />,
});

export default function Home() {
  return (
    <>
      <AdBanners />
      <CreditScore />
      <Spacing size={8} />
      <CardList />
    </>
  );
}
