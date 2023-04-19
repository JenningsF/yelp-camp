// Script for Mapbox cluster map displayed on campgrounds/index

mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
	container: "cluster-map",
	style: "mapbox://styles/mapbox/outdoors-v11",
	center: [-103.5917, 40.6699],
	zoom: 3,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on("load", () => {
	map.addSource("campgrounds", {
		type: "geojson",
		data: campgrounds,
		cluster: true,
		clusterMaxZoom: 14, // Max zoom to cluster points on
		clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
	});

	// Configures color, size, and count of cluster circles and their steps
	map.addLayer({
		id: "clusters",
		type: "circle",
		source: "campgrounds",
		filter: ["has", "point_count"],
		paint: {
			//   * Teal (#00bcd4), 15px circles when point count is less than 10
			//   * Blue (#2196f3), 20px circles when point count is between 10 and 30
			//   * Purple (#3f51b5), 25px circles when point count is greater than or equal to 30
			"circle-color": [
				"step",
				["get", "point_count"],
				"#00bcd4",
				10,
				"#2196f3",
				30,
				"#3f51b5",
			],
			"circle-radius": [
				"step",
				["get", "point_count"],
				15,
				10,
				20,
				30,
				25,
			],
		},
	});

	// Configures text displayed in each cluster
	map.addLayer({
		id: "cluster-count",
		type: "symbol",
		source: "campgrounds",
		filter: ["has", "point_count"],
		layout: {
			"text-field": ["get", "point_count_abbreviated"],
			"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
			"text-size": 12,
		},
	});

	// Configures unclustered dots for each campground
	map.addLayer({
		id: "unclustered-point",
		type: "circle",
		source: "campgrounds",
		filter: ["!", ["has", "point_count"]],
		paint: {
			"circle-color": "#11b4da",
			"circle-radius": 4,
			"circle-stroke-width": 1,
			"circle-stroke-color": "#fff",
		},
	});

	// Inspect a cluster on click
	map.on("click", "clusters", (e) => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ["clusters"],
		});
		const clusterId = features[0].properties.cluster_id;
		map.getSource("campgrounds").getClusterExpansionZoom(
			clusterId,
			(err, zoom) => {
				if (err) return;

				map.easeTo({
					center: features[0].geometry.coordinates,
					zoom: zoom,
				});
			}
		);
	});

	// Opens a popup when an unclustered point is clicked
	map.on("click", "unclustered-point", (e) => {
		const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();
		
		// Ensure that if the map is zoomed out such that
		// multiple copies of the feature are visible, the
		// popup appears over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(
                popUpMarkup
            )
			.addTo(map);
	});

	map.on("mouseenter", "clusters", () => {
		map.getCanvas().style.cursor = "pointer";
	});
	map.on("mouseleave", "clusters", () => {
		map.getCanvas().style.cursor = "";
	});

});
