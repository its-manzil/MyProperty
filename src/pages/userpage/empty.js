import Navbar from "./Navbar";
import React from "react";

export default function Empty() {
    return (
        <>
            <Navbar />
            <div className="empty">
                <h1>This page is empty</h1>
            </div>
        </>
    );
}