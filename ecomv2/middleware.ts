import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get("accessTokenEcon");

  if (request.nextUrl.pathname.includes("/auth/profil") && !cookies) {
    console.log("I SHOUD BE NOT THERE");
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (
    request.nextUrl.pathname === "/auth/profil/command" ||
    request.nextUrl.pathname === "/auth/profil/infos"
  ) {
    const newUrl = `http://${request.headers.get("host")}/auth/profil`;
    return NextResponse.rewrite(newUrl);
  }
}
