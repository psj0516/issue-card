import { QueryClient, dehydrate, useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback } from "react";
import { useRouter } from "next/router";
import flatten from "lodash.flatten";

import { getCards } from "@remote/card";
import ListRow from "@shared/ListRow";
import Badge from "@shared/Badge";
import Top from "@shared/Top";

function CardListPage() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(["cards"], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible;
    },
  });

  const navigate = useRouter();

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetching]);

  if (data == null) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <InfiniteScroll dataLength={cards.length} hasMore={hasNextPage} loader={<ListRow.Skeleton />} next={loadMore} scrollThreshold="100px">
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={<ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />}
              right={card.payback != null ? <Badge label={card.payback} /> : null}
              withArrow={true}
              onClick={() => {
                navigate.push(`/card/${card.id}`);
              }}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export async function getServerSideProps() {
  const client = new QueryClient();

  await client.prefetchInfiniteQuery(["cards"], () => getCards());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  };
}

export default CardListPage;
