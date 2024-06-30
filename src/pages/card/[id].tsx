import { GetServerSidePropsContext } from "next";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

import { getCard } from "@remote/card";
import { Card } from "@models/card";
import Top from "@shared/Top";
import ListRow from "@shared/ListRow";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import ThreeScene from "@/components/card/ThreeScene";
import Spacing from "@/components/shared/Spacing";

const FixedBottomButton = dynamic(() => import("@shared/FixedBottomButton"), {
  ssr: false,
});

interface CardDetailPageProps {
  initialCard: Card;
}

function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams();

  const { data } = useQuery(["card", id], () => getCard(id as string), {
    initialData: initialCard,
  });

  if (data == null) {
    return;
  }

  const { name, corpName, promotion, tags, benefit, color, image } = data;
  const subTitle = promotion != null ? removeHtmlTags(promotion.title) : tags.join(",");

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ThreeScene color={color} image={image} />
      <Spacing size={30} />
      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow as="div" left={<IconCheck />} contents={<ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />} />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <>
          <Spacing size={10} />
          <Flex direction="column" style={{ marginTop: "30px", padding: "0 24px 80px 24px" }}>
            <Text bold={true}>유의사항</Text>
            <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
          </Flex>
        </>
      ) : (
        <Spacing size={100} />
      )}

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={() => {
          // TODO:
        }}
      />
    </div>
  );
}

function IconCheck() {
  return (
    <svg fill="none" height="20" viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
      <rect fill="white" fill-opacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        stroke-linejoin="round"
        stroke-width="4"
      />
      <path d="M16 24L22 30L34 18" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" />
    </svg>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const cardId = query.id as string;

  const card = await getCard(cardId);

  return {
    props: {
      initialCard: card,
    },
  };
}

function removeHtmlTags(text: string) {
  let output = "";

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "<") {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === ">") {
          i = j;
          break;
        }
      }
    } else {
      output += text[i];
    }
  }

  return output;
}

export default CardDetailPage;
