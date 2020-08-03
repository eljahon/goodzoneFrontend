import React, { useState } from 'react'
import SEO from "../components/seo";
import Footer from "../components/footer";
import BranchMap from '../components/branch-map';
import BranchInfo from '../components/branch-info';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/router'

// const mapState = { center: [41.31, 69.31], zoom: 12 };
const branches = [
    {
        name: 'GOODZONE Шахристан',
        long: 41.355597,
        lat: 69.287951,
        address: 'г. Ташкент, Юнусабадский р-н, ул. А. Тимура 129Б',
        landmark: 'станция метро "Шахристан"',
        work_time: 'с 10-00 до 21-00 (без выходных)',
        phone_number: '(+99871) 207−03−07',
        image: 'images/gz_shaxristan.jpg',
    },
    {
        name: 'GOODZONE Бунёдкор',
        long: 41.277907,
        lat: 69.204256,
        address: 'г. Ташкент, массив Чиланзар-6, ТЦ Bunyodkor',
        landmark: 'станция метро Мирзо-Улугбек',
        work_time: 'с 10-00 до 21-00 (без выходных)',
        phone_number: '(+99871) 207-03-07',
        image: 'images/gz_bunyodkor.jpeg',
    },
    {
        name: 'GOODZONE Atrium',
        long: 41.304487,
        lat: 69.308208,
        address: 'г. Ташкент, Яшнободский р-н, ул. Махтумкули, ТРЦ Atrium',
        landmark: 'Парк Ашхабад',
        work_time: 'с 10-00 до 21-00 (без выходных)',
        phone_number: '(+99871) 207−03−07',
        image: 'images/gz_atrium.jpeg',
    },
    {
        name: 'GOODZONE Кадышева',
        long: 41.284833,
        lat: 69.350944,
        address: 'г. Ташкент, Яшнободский р-н, ул. Сивца',
        landmark: 'Рынок Авиасозлар (Кадышева), магазин Havas',
        work_time: 'с 10-00 до 21-00 (без выходных)',
        phone_number: '(+99871) 207-03-07',
        image: 'images/gz_kadisheva.jpg',
    },
    {
        name: 'GOODZONE Самарканд',
        long: 39.649189,
        lat: 66.935851,
        address: 'г. Самарканд, ул. Гагарина, 178',
        landmark: 'Трастбанк',
        work_time: 'с 09:00 до 21:00 (без выходных)',
        phone_number: '(+99898) 1880014, (+99871) 207-03-07',
        image: 'images/gz_samarkand.jpg',
    },
]

export default function Shops() {
    const [mapInfo, setMapInfo] = useState(false);
    const [mapState, setMapState] = useState({ center: [41.31, 69.31], zoom: 12 })
    const router = useRouter()
    const stateMapInfo = (e) => {
        const branch_name = e.originalEvent.target.properties._data.hintContent;
        const data = branches.find(branch => branch.name === branch_name);
        setMapInfo(data);
    }
    const goToMap = (e) => {
        const branch_name = e.target.name;
        const data = branches.find(branch => branch.name === branch_name);
        setMapInfo(data);
        setMapState({center: [data.long, data.lat]});
        // window.location.href.push('#map');
        router.push('/shops#map')
    }
    return (
        <>
            <SEO />
            <section className="section_container">
                <div className="branches_list">
                    {branches.map((branch, i) => (
                        <button key={i} name={branch.name} className="branch_card" onClick={(e) => goToMap(e)}>
                            <div className="name">
                                <h3>{branch.name}</h3>
                            </div>
                            <div className="address">
                                <p>{branch.address}</p>
                                <p>{branch.landmark}</p>
                            </div>
                            <div className="time">
                                <p>Часы работы:</p>
                                <p>{branch.work_time}</p>
                            </div>
                            <div className="location">
                                <FaMapMarkerAlt />
                            </div>
                        </button>
                    ))}
                </div>
            </section>
            <section className="map_block" id="map">
                <div className="branches_content">
                    <BranchMap mapState={mapState} branches={branches} openInfo={stateMapInfo} />
                    {mapInfo ? <BranchInfo data={mapInfo} closeInfo={() => setMapInfo(false)} /> : ''}
                </div>
            </section>
            <Footer />
        </>
    )
}