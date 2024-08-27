import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="text-center">
      <h1 className="text-[3em]">404</h1>
      <p className="text-[1.5em]">Page Not Found</p>
      <Link href="/">
        <Button>Go back to Home</Button>
      </Link>
    </div>
  );
}
