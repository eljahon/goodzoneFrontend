import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Footer from "../components/footer";
import BranchMap from "../components/branch-map";
import BranchInfo from "../components/branch-info";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";

// const mapState = { center: [41.31, 69.31], zoom: 12 };
// const branches = [
//     {
//         name: "GOODZONE Шахристан",
//         loc: {
//             long: 41.355597,
//             lat: 69.287951,
//         },
//         address: "г. Ташкент, Юнусабадский р-н, ул. А. Тимура 129Б",
//         address2: 'станция метро "Шахристан"',
//         working_hours: "с 10-00 до 21-00 (без выходных)",
//         phone_number: "(+99871) 207−03−07",
//         image: "images/gz_shaxristan.jpg",
//     },
//     {
//         name: "GOODZONE Бунёдкор",
//         loc: {
//             long: 41.277907,
//             lat: 69.204256,
//         },
//         address: "г. Ташкент, массив Чиланзар-6, ТЦ Bunyodkor",
//         address2: "станция метро Мирзо-Улугбек",
//         working_hours: "с 10-00 до 21-00 (без выходных)",
//         phone_number: "(+99871) 207-03-07",
//         image: "images/gz_bunyodkor.jpeg",
//     },
//     {
//         name: "GOODZONE Atrium",
//         loc: {
//             long: 41.304487,
//             lat: 69.308208,
//         },
//         address: "г. Ташкент, Яшнободский р-н, ул. Махтумкули, ТРЦ Atrium",
//         address2: "Парк Ашхабад",
//         working_hours: "с 10-00 до 21-00 (без выходных)",
//         phone_number: "(+99871) 207−03−07",
//         image: "images/gz_atrium.jpeg",
//     },
//     {
//         name: "GOODZONE Кадышева",
//         loc: {
//             long: 41.284833,
//             lat: 69.350944,
//         },
//         address: "г. Ташкент, Яшнободский р-н, ул. Сивца",
//         address2: "Рынок Авиасозлар (Кадышева), магазин Havas",
//         working_hours: "с 10-00 до 21-00 (без выходных)",
//         phone_number: "(+99871) 207-03-07",
//         image: "images/gz_kadisheva.jpg",
//     },
//     {
//         name: "GOODZONE Самарканд",
//         loc: {
//             long: 39.649189,
//             lat: 66.935851,
//         },
//         address: "г. Самарканд, ул. Гагарина, 178",
//         address2: "Трастбанк",
//         working_hours: "с 09:00 до 21:00 (без выходных)",
//         phone_number: "(+99898) 1880014, (+99871) 207-03-07",
//         image: "images/gz_samarkand.jpg",
//     },
// ];

export default function Shops() {
  const [mapInfo, setMapInfo] = useState(false);
  const [branches, setBranches] = useState(null);
  const [mapState, setMapState] = useState({
    center: [41.31, 69.31],
    zoom: 12,
  });
  const router = useRouter();

  useEffect(() => {
    axios
      .get(process.env.SHOPS_API_URL)
      .then((res) => {
        console.log("res :>> ", res);
        const {
          data: { shops },
        } = res;
        console.log("shops :>> ", shops);
        setBranches(shops);
      })
      .catch((err) => console.error(err));
  }, []);

  const stateMapInfo = (e) => {
    const branch_name = e.originalEvent.target.properties._data.hintContent;
    const data = branches.find((branch) => branch.name === branch_name);
    setMapInfo(data);
  };
  const goToMap = (e) => {
    const branch_name = e.target.name;
    const data = branches.find((branch) => branch.name === branch_name);
    console.log("branch_name", branch_name);
    console.log("branches", branches);
    setMapInfo(data);
    setMapState({ center: [data.loc.long, data.loc.lat] });
    router.push("/shops#map");
  };
  return (
    branches && (
      <>
        <SEO />
        <section className="section_container">
          <div className="branches_list">
            {branches.map((branch, i) => {
              return branch.active ? (
                <button
                  key={i}
                  name={branch.name}
                  className="branch_card"
                  onClick={(e) => goToMap(e)}
                >
                  <div className="name">
                    <h3>{branch.name}</h3>
                  </div>
                  <div className="address">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: branch.address,
                      }}
                    ></div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: branch.address2,
                      }}
                    ></div>
                  </div>
                  <div className="time">
                    <p>Часы работы:</p>
                    <p>{branch.working_hours}</p>
                  </div>
                  <div className="location">
                    <FaMapMarkerAlt />
                  </div>
                </button>
              ) : null;
            })}
          </div>
        </section>
        <section className="map_block" id="map">
          <div className="branches_content">
            <BranchMap
              mapState={mapState}
              branches={branches}
              openInfo={stateMapInfo}
            />
            {mapInfo ? (
              <BranchInfo data={mapInfo} closeInfo={() => setMapInfo(false)} />
            ) : (
              ""
            )}
          </div>
        </section>
        <Footer />
      </>
    )
  );
}
