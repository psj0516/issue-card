import AdBannerListAddButton from "@/components/test/AdBannerListAddButton";
import CardListAddButton from "@components/test/CardListAddButton";
import Flex from "@shared/Flex";
import Text from "@shared/Text";

function TestPage() {
  return (
    <Flex direction="column">
      <Text bold={true}>카드</Text>
      <CardListAddButton />
      <Text bold={true}>배너</Text>
      <AdBannerListAddButton />
    </Flex>
  );
}

export default TestPage;
