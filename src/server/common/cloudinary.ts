// import cloudinary from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../env/server.mjs";

export interface CloudinarySearchResult {
  total_count: number;
  time: number;
  resources: Resource[];
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
}

interface PhotoById {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: "image" | "video";
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
  next_cursor: string;
  derived: {
    transformation: string;
    format: string;
    bytes: number;
    idd: string;
    url: string;
    secure_url: string;
  }[];
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
}

export interface Resource {
  asset_id: string;
  public_id: string;
  folder: string;
  filename: string;
  format: string;
  version: number;
  resource_type: "image" | "video";
  type: string;
  created_at: string;
  uploaded_at: string;
  bytes: number;
  backup_bytes: number;
  width: number;
  height: number;
  aspect_ratio: number;
  pixels: number;
  url: string;
  secure_url: string;
  status: string;
  access_mode: string;
  access_control: boolean | null;
  etag: string;
  created_by: string | null;
  uploaded_by: string | null;
  duration?: number;
  pages?: number;
}

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface GetImagesByFolderOptions {
  folder: string;
  maxResults?: number;
}

export const getImagesByFolder = async ({
  folder,
  maxResults = 30,
}: GetImagesByFolderOptions) => {
  const images = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by("public_id", "desc")
    .max_results(maxResults)
    .execute()
    .then((result) => result);

  return {
    ...images,
    rate_limit_reset_at: images.rate_limit_reset_at.toISOString(),
  } as CloudinarySearchResult;
};

export const getPhotoById = async (id: string) => {
  const image: PhotoById = await cloudinary.api.resource(id);

  console.log("[getPhotoById] image", image);

  return image;
};

// export const getAllImages = async () => {
//   cloudinary.api
//     .resources({ type: "upload", prefix: "sample" })
//     .then((result) => console.log(result));
// };
