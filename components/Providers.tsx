"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <SettingsProvider>
          <ProductsProvider>
            <OrdersProvider>
              <CartProvider>
                <AuthProvider>{children}</AuthProvider>
              </CartProvider>
            </OrdersProvider>
          </ProductsProvider>
        </SettingsProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
