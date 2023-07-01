import React from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
const { TextArea } = Input;
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import {
  Carousel,
  Gif,
  Grid,
  Video,
  VideoOverlay
} from "@giphy/react-components";
import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import { createRoot } from "react-dom/client";
import ResizeObserver from "react-resize-observer";

function GIFModal({ onGifClick }) {
    const fetchGifs = (offset) =>
        giphyFetch.trending({ offset, limit: 10 });
    const [width, setWidth] = useState(window.innerWidth);
    return (
        <>
        <Grid
            onGifClick={onGifClick}
            fetchGifs={fetchGifs}
            width={width}
            columns={3}
            gutter={6}
        />
        <ResizeObserver
            onResize={({ width }) => {
            setWidth(width);
            }}
        />
        </>
    );
}

export default GIFModal;

