import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Footer from "../components/footer";
import BranchMap from "../components/branch-map";
import BranchInfo from "../components/branch-info";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

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
        setMapState({ center: [data.loc.lat, data.loc.long] });
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
                            <BranchInfo
                                data={mapInfo}
                                closeInfo={() => setMapInfo(false)}
                            />
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

export async function getServerSideProps({ req }) {
    const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`];

    const [categories] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}
