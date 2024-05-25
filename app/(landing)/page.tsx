// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { LandingNavbar } from "@/components/landing-navbar";
import LandingHero from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";

const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            {/* <LandingContent /> */}
        </div>
        // <div>
        //     Landing page (Unprotected)
        //     <div>
        //         <Link href="/sign-in">
        //             <Button>
        //                 Login
        //             </Button>
        //         </Link>
        //         <Link href="/sign-up">
        //             <Button>
        //                 Register
        //             </Button>
        //         </Link>
        //     </div>
        // </div>
    );
}
export default LandingPage;