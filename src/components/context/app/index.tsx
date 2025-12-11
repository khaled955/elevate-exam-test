//  this is providers for all providers in my app

import { ReactNode } from "react";
import NextAuthProvider from "./_components/next-auth.provider";
import ReactQueryProvider from "./_components/tanstack-query.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextAuthProvider>
  );
}
