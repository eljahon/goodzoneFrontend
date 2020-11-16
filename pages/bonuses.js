import Page from "../components/page";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

export default function Bonuses() {
  return <Page slug="bonusy" />;
}
export async function getServerSideProps({ req }) {
  const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`];

  const [categories] = await fetchMultipleUrls(urls);

  return {
    props: {
      categories,
    },
  };
}
