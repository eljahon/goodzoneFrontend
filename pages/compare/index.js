import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import CompareCard from "../../components/compare";

export default function Compare(categories) {
  return (
    <>
      <div className="compare_body">
        <Container fluid className="compare_container">
          <CompareCard />
        </Container>
      </div>
      <Footer />
    </>
  );
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
