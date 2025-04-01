import React from "react";

function SearchBar() {
    return (
        <div className="container mt-4">
            <div
                className="p-4 rounded-4 shadow-sm"
                style={{
                    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
                }}
            >
                <form className="row g-3">
                    <div className="col-md-4">
                        <input
                            type="search"
                            className="form-control rounded-pill p-2"
                            placeholder="🔍 Search Keyword"
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control rounded-pill p-2"
                            placeholder="📍 City"
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control rounded-pill p-2"
                            placeholder="🏢 Province"
                        />
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn w-100 text-white rounded-pill"
                            style={{
                                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                                padding: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;
