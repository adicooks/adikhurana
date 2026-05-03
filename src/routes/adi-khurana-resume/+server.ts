import { redirect } from "@sveltejs/kit";
import ResumePDF from "$lib/assets/Adi_Khurana_Resume.pdf";

export function GET() {
  throw redirect(307, ResumePDF);
}
