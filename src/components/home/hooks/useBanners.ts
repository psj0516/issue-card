import { useQuery } from "react-query";

import { getAdBanners } from "@remote/banner";

function useEventBanners() {
  return useQuery(["event-banners"], () => getAdBanners(), {
    suspense: true,
  });
}

export default useEventBanners;
