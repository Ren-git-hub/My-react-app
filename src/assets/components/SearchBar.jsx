import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";

const provinces = {
    Any: ["Any"],
    Ontario: ["Any", "Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor"],
    Quebec: ["Any", "Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Levis", "Trois-Rivières", "Terrebonne"],
    "British Columbia": ["Any", "Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Langley", "Saanich", "Delta"],
    Alberta: ["Any", "Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Leduc"],
    Manitoba: ["Any", "Winnipeg", "Brandon", "Steinbach", "Thompson", "Winkler", "Portage la Prairie", "Morden", "Selkirk", "Dauphin", "Flin Flon"],
    "Nova Scotia": ["Any", "Halifax", "Sydney", "Truro", "New Glasgow", "Glace Bay", "Bridgewater", "Amherst", "Kentville", "Dartmouth", "Berwick"],
};

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");
    const [province, setProvince] = useState("Any");
    const [city, setCity] = useState("Any");

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setProvince(selectedProvince);
        setCity("Any");
    };

    // Build location string and call onSearch callback
    const updateSearch = () => {
        let location = "";
        if (province !== "Any") {
            location = province;
            if (city !== "Any") {
                location += `, ${city}`;
            }
        }
        onSearch({ keyword: keyword.trim(), location });
    };

    // Trigger search automatically on any change
    useEffect(() => {
        updateSearch();
    }, [keyword, province, city]);

    return (
        <div className="container mt-4">
            <div
                className="p-4 rounded-4 shadow-sm"
                style={{ background: "linear-gradient(135deg, #fdfbfb, #ebedee)" }}
            >
                <form className="row g-3">
                    {/* Keyword */}
                    <div className="col-md-6">
                        <input
                            type="search"
                            className="form-control rounded-pill p-2"
                            placeholder="🔍 Enter keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>

                    {/* Province */}
                    <div className="col-md-3">
                        <div
                            className="d-flex align-items-center rounded-pill"
                            style={{ backgroundColor: "#e5e7eb", overflow: "hidden" }}
                        >
                            <div className="px-3 d-flex align-items-center justify-center">
                                <FaMapMarkerAlt className="text-dark" />
                            </div>
                            <select
                                className="form-select border-0 rounded-0 rounded-end px-3 py-2"
                                value={province}
                                onChange={handleProvinceChange}
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    color: "#111827",
                                    appearance: "none",
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                }}
                            >
                                {Object.keys(provinces).map((prov) => (
                                    <option key={prov} value={prov}>
                                        {prov}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* City */}
                    <div className="col-md-3">
                        <div
                            className="d-flex align-items-center rounded-pill"
                            style={{ backgroundColor: "#e5e7eb", overflow: "hidden" }}
                        >
                            <div
                                className="px-3 d-flex align-items-center justify-center"
                                style={{ backgroundColor: "#e5e7eb" }}
                            >
                                <FaCity className="text-dark" />
                            </div>
                            <select
                                className="form-select border-0 rounded-0 rounded-end px-3 py-2"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                disabled={province === "Any"}
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    color: "#111827",
                                    appearance: "none",
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                }}
                            >
                                {(province !== "Any" ? provinces[province] : ["Any"]).map((ct) => (
                                    <option key={ct} value={ct}>
                                        {ct}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SearchBar;
