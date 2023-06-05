"use client";

import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import { useViewportWidth } from "@/hooks/useWindows";

type Props = {
	product: swell.Product & { categories: swell.Category[] };
};
