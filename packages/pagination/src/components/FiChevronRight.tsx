import React from "react"

// lib
import { IconType } from "../lib/types"

const FiMoreHorizontal: IconType = ({ ...svgProps }) => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    {...svgProps}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default FiMoreHorizontal
