import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { Pages, Roles, Routes } from "./constants/enums";

export default withAuth(
    async function middleware(req: NextRequest) {
        const pathname = req.nextUrl.pathname;
        const isAuth = await getToken({ req });
        const isAuthPages = pathname.startsWith(`/${Routes.AUTH}`);
        const AdminRoutes = [Routes.ADMIN];
        const isAdminRoute = AdminRoutes.some((route) => pathname.startsWith(`/${route}`));
        const EmployeeRoutes = [Routes.CHECKPOINT];
        const isEmployeeRoute = EmployeeRoutes.some((route) => pathname.startsWith(`/${route}`));
        const GuestRoutes = [Routes.GATE];
        const isGuestRoute = GuestRoutes.some((route) => pathname.startsWith(`/${route}`));
        const role = isAuth?.role;

        if (isAuth && (isAuthPages || isGuestRoute)) {
            return NextResponse.redirect(
                new URL(`/${Routes.HOME}`, req.url)
            )
        }

        if (role !== Roles.ADMIN && isAdminRoute) {
            if (isAuth) {
                return NextResponse.redirect(
                    new URL(`/${Routes.HOME}`, req.url)
                )
            } else {
                return NextResponse.redirect(
                    new URL(`/${Routes.AUTH}/${Pages.LOGIN}`, req.url)
                )
            }
        }

        if (role !== Roles.EMPLOYEE && isEmployeeRoute) {
            if (isAuth) {
                return NextResponse.redirect(
                    new URL(`/${Routes.HOME}`, req.url)
                )
            } else {
                return NextResponse.redirect(
                    new URL(`/${Routes.AUTH}/${Pages.LOGIN}`, req.url)
                )
            }
        }

    },
    {
        callbacks: {
            async authorized() {
                return true;
            }
        }
    }
)

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)|.well-known).*)",
    ],
};