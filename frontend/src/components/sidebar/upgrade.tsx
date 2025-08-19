"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "03b02167-191a-4c0d-b2b6-bdb564ca01b0",
        "d41cce00-ecb4-440f-b84b-aaa6d214323c",
        "b36a1e20-2ca2-4cbb-b992-c494e7a76c22",
      ],
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-2 cursor-pointer text-orange-400"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}
