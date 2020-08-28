import React from "react";
import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  GeoObject,
} from "react-yandex-maps";

export default function BranchMap({ mapState, branches, openInfo }) {
  return (
    <div className="branch_map">
      <YMaps>
        <Map
          width="100%"
          height="100vh"
          state={mapState}
          instanceRef={(ref) => {
            ref && ref.behaviors.disable("scrollZoom");
          }}
        >
          <Clusterer
            options={{
              preset: "islands#invertedDarkBlueClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {branches.map((branch, i) => (
              <GeoObject
                key={i}
                onClick={openInfo}
                options={{ iconColor: "#f5363e" }}
                geometry={{
                  type: "Point",
                  coordinates: [branch.loc.long, branch.loc.lat],
                }}
                properties={{ hintContent: branch.name }}
                modules={["geoObject.addon.hint"]}
              />
            ))}
          </Clusterer>
          <ZoomControl
            options={{
              size: "auto",
              zoomDuration: 500,
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}
