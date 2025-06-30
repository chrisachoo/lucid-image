/**
 * Returns the dimensions (width and height) of an image file on the server.
 *
 * @param {string} imagePath - The absolute or relative path to the image file.
 * @returns {{ width: number, height: number, type?: string, orientation?: number }}
 *   An object containing the width, height, and optionally type/orientation of the image.
 *
 * @throws Will throw if the file cannot be read or is not a valid image.
 *
 * @example
 *   import { getImageSizeOnServer } from "./utils/get-image-size.node";
 *   const { width, height } = getImageSizeOnServer("./public/images/cat-1.jpg");
 *   // Use width and height as needed
 *
 * @note This function uses Node.js modules and should only be called in server-side code.
 */
import fs from "node:fs"
import imageSize from "image-size"

export function getImageSizeOnServer(
	imagePath: string
): { width: number, height: number, type?: string, orientation?: number } {
	const buffer = fs.readFileSync(imagePath)
	return imageSize(buffer)
}
