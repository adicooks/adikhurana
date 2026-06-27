import ResumePDF from "$lib/assets/Adi_Khurana_Resume.pdf";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch }) => {
  const pdf = await fetch(ResumePDF);

  return new Response(pdf.body, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": 'inline; filename="Adi_Khurana_Resume.pdf"'
    }
  });
};
