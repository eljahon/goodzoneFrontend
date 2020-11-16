import Page from "../components/page";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

export default function About() {
  return <Page slug="o-kompanii" />;
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
