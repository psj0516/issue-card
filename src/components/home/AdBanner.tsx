import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import Flex from "@shared/Flex";
import Text from "@shared/Text";
import { colors } from "@styles/colorPalette";

import "swiper/css";
import Image from "next/image";
import Skeleton from "../shared/Skeleton";
import ErrorBoundary from "../shared/ErrorBoundary";
import withSusepnse from "@/hooks/withSuspense";

import useBanners from "./hooks/useBanners";

function AdBanners() {
  const { data } = useBanners();

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner, index) => {
          const backgroundColor = index % 2 === 0 ? colors.lightgray : colors.amber;
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex justify="space-between" css={bannerContainerStyles(backgroundColor)}>
                  <Flex direction="column">
                    <Text bold={true} color="deepblue">
                      {banner.title}
                    </Text>
                    <Text typography="t7" color="deepblue">
                      {banner.description}
                    </Text>
                  </Flex>
                  <Image src={banner.iconUrl} width={40} height={50} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary fallbackComponent={<></>}>
      <AdBanners />
    </ErrorBoundary>
  );
}

export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={80} style={{ borderRadius: 8 }} />
    </div>
  );
}

export default withSusepnse(WrapErrorBoundary, {
  fallback: <BannerSkeleton />,
});

const Container = styled.div`
  padding: 24px;
`;

const bannerContainerStyles = (backgroundColor: string) => css`
  padding: 16px;
  background-color: ${backgroundColor};
  border-radius: 4px;
`;
