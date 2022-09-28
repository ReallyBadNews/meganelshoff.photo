import cloudinary from "cloudinary";
import { env } from "../../env/server.mjs";

export interface CloudinarySearchResult {
  total_count: number;
  time: number;
  resources: Resource[];
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

export const getCloudinaryImages = async (folder: string) => {
  cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  // const images = await cloudinary.v2.api.resources({
  //   type: "upload",
  //   prefix: folder, // add your folder
  // });

  const images = await cloudinary.v2.search
    .expression(
      `folder:${folder}` // add your folder
    )
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute()
    .then((result) => result);

  return {
    ...images,
    rate_limit_reset_at: images.rate_limit_reset_at.toISOString(),
  } as CloudinarySearchResult;
};
