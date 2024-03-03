import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";
import { env } from "~/env";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);

    // ?image_file=<image_file>
    const hasImageFile =
      searchParams.has("image_file") && searchParams.get("image_file") !== "";
    const image_file = hasImageFile
      ? `${env.NEXT_PUBLIC_SITE_URL}${env.NEXT_PUBLIC_IMAGE_SOURCE}/${searchParams.get("image_file")}`
      : `${env.NEXT_PUBLIC_SITE_URL}${env.NEXT_PUBLIC_OG_SOURCE}/og.jpeg`;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="Book"
              src={image_file}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    let errorMessage = "Failed to generate the image";
    if (e instanceof Error) {
      // Type guard
      errorMessage = e.message;
    }
    console.log(errorMessage);
    return new Response(errorMessage, {
      status: 500,
    });
  }
}
